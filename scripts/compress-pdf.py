#!/usr/bin/env python3
"""
Compress a PDF from a URL or local path so it's small enough to view inline on a website.
Overwrites the destination file.

Usage:
    python compress-pdf.py <url-or-path> [output-path]

If output-path is omitted:
    - URL input  -> saves as ./<basename-from-url>
    - File input -> overwrites the input file in place
"""

import os
import shutil
import subprocess
import sys
import tempfile
import urllib.parse
import urllib.request

GS_QUALITY = "/screen"  # 72dpi, smallest size, fine for on-screen web viewing
GS_BIN = "gs"


def is_url(s: str) -> bool:
    return urllib.parse.urlparse(s).scheme in ("http", "https")


def fetch(url: str, dest: str) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as r, open(dest, "wb") as f:
        shutil.copyfileobj(r, f)


def compress(src: str, dst: str) -> None:
    cmd = [
        GS_BIN,
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        f"-dPDFSETTINGS={GS_QUALITY}",
        "-dNOPAUSE",
        "-dQUIET",
        "-dBATCH",
        f"-sOutputFile={dst}",
        src,
    ]
    subprocess.run(cmd, check=True)


def main() -> None:
    if len(sys.argv) < 2:
        print(__doc__.strip(), file=sys.stderr)
        sys.exit(1)

    if shutil.which(GS_BIN) is None:
        print("ghostscript ('gs') not found on PATH. Install with: brew install ghostscript", file=sys.stderr)
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
