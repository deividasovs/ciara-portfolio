#!/usr/bin/env node
// Resize and compress all images under public/assets/images in place.
// Max dimension: 1028px. Aspect ratio preserved.
//
// Usage:
//   node scripts/compress-images.js              # processes public/assets/images
//   node scripts/compress-images.js <dir>        # processes a custom directory
//   DRY_RUN=1 node scripts/compress-images.js    # shows what would change
//
// Requires: sharp  (install with `npm i -D sharp`)

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('Missing dependency "sharp". Install it with:');
  console.error('  npm i -D sharp');
  process.exit(1);
}

const MAX_DIMENSION = 1028;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 82;
const WEBP_QUALITY = 82;

const DRY_RUN = process.env.DRY_RUN === '1';
const ROOT = path.resolve(
  process.argv[2] || path.join(__dirname, '..', 'public', 'assets', 'images')
);

const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (EXTS.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const input = await fs.promises.readFile(file);
  const beforeSize = input.length;

  const image = sharp(input, { failOn: 'none' }).rotate(); // respect EXIF orientation
  const meta = await image.metadata();
  const { width = 0, height = 0 } = meta;

  const needsResize = width > MAX_DIMENSION || height > MAX_DIMENSION;
  if (needsResize) {
    image.resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    image.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  } else if (ext === '.png') {
    image.png({ quality: PNG_QUALITY, compressionLevel: 9 });
  } else if (ext === '.webp') {
    image.webp({ quality: WEBP_QUALITY });
  }

  const output = await image.toBuffer();
  const afterSize = output.length;
  const saved = beforeSize - afterSize;
  const pct = beforeSize ? ((saved / beforeSize) * 100).toFixed(1) : '0.0';

  const rel = path.relative(process.cwd(), file);
  const dim = needsResize ? `resize ${width}x${height} -> max ${MAX_DIMENSION}` : 'no resize';

  if (afterSize >= beforeSize) {
    console.log(`skip   ${rel}  (${dim}, would grow ${fmtBytes(beforeSize)} -> ${fmtBytes(afterSize)})`);
    return { processed: false, saved: 0 };
  }

  if (!DRY_RUN) await fs.promises.writeFile(file, output);
  console.log(
    `${DRY_RUN ? 'dry    ' : 'wrote  '}${rel}  (${dim}, ${fmtBytes(beforeSize)} -> ${fmtBytes(afterSize)}, -${pct}%)`
  );
  return { processed: true, saved };
}

(async () => {
  if (!fs.existsSync(ROOT)) {
    console.error(`Directory not found: ${ROOT}`);
    process.exit(1);
  }

  const files = walk(ROOT);
  console.log(`Found ${files.length} image(s) under ${ROOT}${DRY_RUN ? '  [DRY RUN]' : ''}\n`);

  let totalSaved = 0;
  let changed = 0;
  for (const file of files) {
    try {
      const res = await processFile(file);
      if (res.processed) {
        changed++;
        totalSaved += res.saved;
      }
    } catch (err) {
      console.error(`error  ${path.relative(process.cwd(), file)}: ${err.message}`);
    }
  }

  console.log(
    `\nDone. ${changed}/${files.length} file(s) ${DRY_RUN ? 'would be ' : ''}rewritten. Saved ${fmtBytes(totalSaved)}.`
  );
})();
