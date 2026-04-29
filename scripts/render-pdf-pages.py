#!/usr/bin/env python3
"""
Render every page of a PDF to a JPG, sized for the web.

Usage:
    python3 render-pdf-pages.py <pdf-path> <output-dir>

Output filenames are page-001.jpg, page-002.jpg, ... (zero-padded width = 3).
"""

import os
import shutil
import subprocess
import sys


VENV_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".venv")
VENV_PYTHON = os.path.join(VENV_DIR, "bin", "python")
REQUIRED = ["pdf2image", "Pillow"]


def bootstrap() -> None:
    if os.path.abspath(sys.prefix) == os.path.abspath(VENV_DIR):
        return
    if not os.path.isfile(VENV_PYTHON):
        print("setting up scripts/.venv...", file=sys.stderr)
        subprocess.check_call([sys.executable, "-m", "venv", VENV_DIR])
        subprocess.check_call(
            [VENV_PYTHON, "-m", "pip", "install", "--quiet", "--upgrade", "pip"]
        )
    subprocess.check_call(
        [VENV_PYTHON, "-m", "pip", "install", "--quiet", *REQUIRED]
    )
    os.execv(VENV_PYTHON, [VENV_PYTHON, os.path.abspath(__file__), *sys.argv[1:]])


bootstrap()

from pdf2image import convert_from_path
from PIL import Image


JPEG_QUALITY = 80
LONG_EDGE_PX = 1800


def render(pdf_path: str, out_dir: str) -> None:
    if not shutil.which("pdftoppm"):
        print("pdftoppm not found; install poppler (brew install poppler)", file=sys.stderr)
        sys.exit(1)

    os.makedirs(out_dir, exist_ok=True)

    pages = convert_from_path(pdf_path, dpi=150)
    total = len(pages)

    for i, page in enumerate(pages, start=1):
        img = page.convert("RGB")
        w, h = img.size
        long_edge = max(w, h)
        if long_edge > LONG_EDGE_PX:
            scale = LONG_EDGE_PX / long_edge
            img = img.resize(
                (max(1, int(w * scale)), max(1, int(h * scale))),
                Image.LANCZOS,
            )

        name = f"page-{i:03d}.jpg"
        path = os.path.join(out_dir, name)
        img.save(path, format="JPEG", quality=JPEG_QUALITY, optimize=True)
        size_kb = os.path.getsize(path) / 1024
        print(f"  {name}: {img.size[0]}x{img.size[1]} ({size_kb:.0f} KB)")

    print(f"rendered {total} pages -> {out_dir}")


def main() -> None:
    if len(sys.argv) != 3:
        print(__doc__.strip(), file=sys.stderr)
        sys.exit(1)

    pdf_path = sys.argv[1]
    out_dir = sys.argv[2]

    if not os.path.isfile(pdf_path):
        print(f"file not found: {pdf_path}", file=sys.stderr)
        sys.exit(1)

    render(pdf_path, out_dir)


if __name__ == "__main__":
    main()
