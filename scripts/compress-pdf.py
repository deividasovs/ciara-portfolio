#!/usr/bin/env python3
"""
Compress a PDF by recompressing every embedded raster image in place.
Iterates each image XObject explicitly so nothing can be silently dropped
(unlike ghostscript's pdfwrite). Images that fail to decode are left
untouched rather than removed.

Usage:
    python3 compress-pdf.py <url-or-path> [output-path]

If output-path is omitted:
    - URL input  -> saves as ./<basename-from-url>
    - File input -> overwrites the input file in place

The script bootstraps its own venv at scripts/.venv on first run.
"""

import os
import shutil
import subprocess
import sys


VENV_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".venv")
VENV_PYTHON = os.path.join(VENV_DIR, "bin", "python")
REQUIRED = ["pikepdf", "Pillow"]


def bootstrap() -> None:
    # The venv's python is a symlink back to the system interpreter, so comparing
    # sys.executable doesn't tell us anything. sys.prefix points at the venv root
    # only when actually running under it.
    if os.path.abspath(sys.prefix) == os.path.abspath(VENV_DIR):
        return
    if not os.path.isfile(VENV_PYTHON):
        print("setting up scripts/.venv...", file=sys.stderr)
        subprocess.check_call([sys.executable, "-m", "venv", VENV_DIR])
        subprocess.check_call(
            [VENV_PYTHON, "-m", "pip", "install", "--quiet", "--upgrade", "pip"]
        )
        subprocess.check_call([VENV_PYTHON, "-m", "pip", "install", "--quiet", *REQUIRED])
    os.execv(VENV_PYTHON, [VENV_PYTHON, os.path.abspath(__file__), *sys.argv[1:]])


bootstrap()

import io
import tempfile
import urllib.parse
import urllib.request
import zlib

import pikepdf
from PIL import Image


JPEG_QUALITY = 65
MAX_LONGEST_SIDE = 1200  # cap for downsampling oversized images
MAX_MASK_LONGEST_SIDE = 1200  # SMasks auto-scale to parent; same cap is safe
MIN_PIXELS_TO_RECOMPRESS = 60_000  # ~245x245; smaller images aren't worth touching


def is_url(s: str) -> bool:
    return urllib.parse.urlparse(s).scheme in ("http", "https")


def fetch(url: str, dest: str) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as r, open(dest, "wb") as f:
        shutil.copyfileobj(r, f)


def collect_images(pdf: pikepdf.Pdf) -> tuple[list, set]:
    """Return (image_streams, mask_objgens). Masks are tracked so we skip them."""
    images = []
    mask_objgens = set()
    image_subtype = pikepdf.Name("/Image")

    for obj in pdf.objects:
        if not isinstance(obj, pikepdf.Stream):
            continue
        try:
            if obj.get("/Subtype") != image_subtype:
                continue
        except Exception:
            continue

        images.append(obj)
        for key in ("/SMask", "/Mask"):
            try:
                if key in obj:
                    mask = obj[key]
                    if isinstance(mask, pikepdf.Stream):
                        mask_objgens.add(mask.objgen)
            except Exception:
                continue
    return images, mask_objgens


def recompress_one(obj: pikepdf.Stream) -> str:
    """Recompress a single image XObject in place. Returns a status tag."""
    try:
        pdf_image = pikepdf.PdfImage(obj)
        pil = pdf_image.as_pil_image()
    except Exception:
        return "skipped-undecodable"

    width, height = pil.size
    if width * height < MIN_PIXELS_TO_RECOMPRESS:
        return "skipped-small"

    longest = max(width, height)
    if longest > MAX_LONGEST_SIDE:
        scale = MAX_LONGEST_SIDE / longest
        pil = pil.resize((max(1, int(width * scale)), max(1, int(height * scale))), Image.LANCZOS)

    if pil.mode in ("RGBA", "LA"):
        bg = Image.new("RGB", pil.size, "white")
        bg.paste(pil, mask=pil.split()[-1])
        pil = bg
    elif pil.mode != "RGB":
        pil = pil.convert("RGB")

    buf = io.BytesIO()
    pil.save(buf, format="JPEG", quality=JPEG_QUALITY, optimize=True)
    new_data = buf.getvalue()

    obj.write(new_data, filter=pikepdf.Name("/DCTDecode"))
    obj.Width = pil.size[0]
    obj.Height = pil.size[1]
    obj.ColorSpace = pikepdf.Name("/DeviceRGB")
    obj.BitsPerComponent = 8
    for stale_key in ("/DecodeParms", "/Decode"):
        if stale_key in obj:
            del obj[stale_key]
    return "recompressed"


def recompress_mask(obj: pikepdf.Stream) -> str:
    """Recompress a soft mask (alpha) image. Stays grayscale, Flate-encoded."""
    try:
        pdf_image = pikepdf.PdfImage(obj)
        pil = pdf_image.as_pil_image()
    except Exception:
        return "skipped-undecodable"

    if pil.mode != "L":
        pil = pil.convert("L")

    longest = max(pil.size)
    if longest > MAX_MASK_LONGEST_SIDE:
        scale = MAX_MASK_LONGEST_SIDE / longest
        pil = pil.resize(
            (max(1, int(pil.size[0] * scale)), max(1, int(pil.size[1] * scale))),
            Image.LANCZOS,
        )

    raw = pil.tobytes()
    compressed = zlib.compress(raw, level=9)

    obj.write(compressed, filter=pikepdf.Name("/FlateDecode"))
    obj.Width = pil.size[0]
    obj.Height = pil.size[1]
    obj.ColorSpace = pikepdf.Name("/DeviceGray")
    obj.BitsPerComponent = 8
    for stale_key in ("/DecodeParms", "/Decode"):
        if stale_key in obj:
            del obj[stale_key]
    return "recompressed-mask"


def compress(src: str, dst: str) -> None:
    with pikepdf.open(src) as pdf:
        images, mask_objgens = collect_images(pdf)
        counts = {
            "recompressed": 0,
            "recompressed-mask": 0,
            "skipped-small": 0,
            "skipped-undecodable": 0,
        }
        for obj in images:
            if obj.objgen in mask_objgens:
                counts[recompress_mask(obj)] += 1
            else:
                counts[recompress_one(obj)] += 1

        pdf.save(
            dst,
            compress_streams=True,
            object_stream_mode=pikepdf.ObjectStreamMode.generate,
            recompress_flate=True,
        )

    summary = ", ".join(f"{k}={v}" for k, v in counts.items())
    print(f"images: {summary}", file=sys.stderr)


def main() -> None:
    if len(sys.argv) < 2:
        print(__doc__.strip(), file=sys.stderr)
        sys.exit(1)

    source = sys.argv[1]
    explicit_output = sys.argv[2] if len(sys.argv) > 2 else None

    with tempfile.TemporaryDirectory() as tmp:
        if is_url(source):
            input_path = os.path.join(tmp, "input.pdf")
            fetch(source, input_path)
            default_output = os.path.basename(urllib.parse.urlparse(source).path) or "compressed.pdf"
        else:
            if not os.path.isfile(source):
                print(f"file not found: {source}", file=sys.stderr)
                sys.exit(1)
            input_path = source
            default_output = source

        output_path = explicit_output or default_output
        tmp_output = os.path.join(tmp, "output.pdf")

        compress(input_path, tmp_output)

        before = os.path.getsize(input_path)
        after = os.path.getsize(tmp_output)
        shutil.move(tmp_output, output_path)

        pct = (1 - after / before) * 100 if before else 0
        print(f"{output_path}: {before/1024:.0f} KB -> {after/1024:.0f} KB ({pct:.0f}% smaller)")


if __name__ == "__main__":
    main()
