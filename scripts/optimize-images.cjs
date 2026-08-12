/**
 * optimize-images.cjs
 *
 * Resizes and compresses image files in src/assets (and subfolders) in place,
 * keeping the exact same filename/extension/casing so existing imports keep working.
 *
 * Before touching anything, it copies untouched originals to `assets-originals-backup/`
 * at the project root (gitignored) so the operation is fully reversible.
 *
 * Usage:
 *   node scripts/optimize-images.cjs          # run the optimization
 *   node scripts/optimize-images.cjs --dry-run # just print what would happen
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ASSETS_DIR = path.join(__dirname, "..", "src", "assets");
const BACKUP_DIR = path.join(__dirname, "..", "assets-originals-backup");
const DRY_RUN = process.argv.includes("--dry-run");

// Max width for "large" images (hero/full-bleed backgrounds) vs "regular" photos.
const MAX_WIDTH_LARGE = 2000;
const MAX_WIDTH_REGULAR = 1600;
const LARGE_FILE_HINTS = ["hero-bg", "vcm-tallest-temple", "vcm-parks"];

const JPEG_QUALITY = 75;
const PNG_QUALITY = 80;

const SUPPORTED_EXT = new Set([".jpg", ".jpeg", ".png"]);
const SKIP_EXT = new Set([".heic", ".mp4", ".svg", ".webp"]); // left untouched (see summary)

/** @type {{file: string, before: number, after: number}[]} */
const results = [];
/** @type {string[]} */
const skipped = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

function backupOriginal(fullPath) {
  const relative = path.relative(ASSETS_DIR, fullPath);
  const backupPath = path.join(BACKUP_DIR, relative);
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(fullPath, backupPath);
  }
}

async function processFile(fullPath) {
  const ext = path.extname(fullPath).toLowerCase();
  const relative = path.relative(ASSETS_DIR, fullPath);

  if (!SUPPORTED_EXT.has(ext)) {
    if (SKIP_EXT.has(ext)) {
      skipped.push(relative);
    }
    return;
  }

  const before = fs.statSync(fullPath).size;
  const nameLower = path.basename(fullPath).toLowerCase();
  const isLarge = LARGE_FILE_HINTS.some((hint) => nameLower.includes(hint));
  const maxWidth = isLarge ? MAX_WIDTH_LARGE : MAX_WIDTH_REGULAR;

  if (DRY_RUN) {
    console.log(`[dry-run] would process ${relative} (${(before / 1024 / 1024).toFixed(2)} MB, maxWidth=${maxWidth})`);
    return;
  }

  backupOriginal(fullPath);

  const image = sharp(fullPath, { failOn: "none" });
  const metadata = await image.metadata();

  let pipeline = image.rotate(); // auto-orient based on EXIF, then strip it
  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  } else if (ext === ".png") {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true });
  }

  const buffer = await pipeline.toBuffer();

  // Safety net: only overwrite if the new file is actually smaller.
  if (buffer.length < before) {
    // Write to a temp file first, then rename over the original. Writing
    // directly to the same path sharp just read from can hit transient
    // file-lock errors on Windows.
    const tmpPath = `${fullPath}.tmp`;
    fs.writeFileSync(tmpPath, buffer);
    fs.renameSync(tmpPath, fullPath);
    results.push({ file: relative, before, after: buffer.length });
  } else {
    results.push({ file: relative, before, after: before });
  }
}

async function main() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`Assets dir not found: ${ASSETS_DIR}`);
    process.exit(1);
  }

  if (!DRY_RUN) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const files = [];
  (function collect(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) collect(fullPath);
      else files.push(fullPath);
    }
  })(ASSETS_DIR);

  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    await processFile(file);
  }

  console.log("\n=== Optimization summary ===");
  let totalBefore = 0;
  let totalAfter = 0;
  for (const r of results) {
    totalBefore += r.before;
    totalAfter += r.after;
    const beforeMB = (r.before / 1024 / 1024).toFixed(2);
    const afterMB = (r.after / 1024 / 1024).toFixed(2);
    const pct = r.before > 0 ? (100 - (r.after / r.before) * 100).toFixed(0) : 0;
    console.log(`${r.file}: ${beforeMB} MB -> ${afterMB} MB (-${pct}%)`);
  }

  if (skipped.length) {
    console.log("\nSkipped (unsupported format, left as-is):");
    skipped.forEach((f) => console.log(` - ${f}`));
  }

  console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)} MB -> ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  if (!DRY_RUN) {
    console.log(`Originals backed up to: ${BACKUP_DIR}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
