import { readdir, stat } from 'node:fs/promises';
import { resolve, extname, join } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(process.cwd(), 'public');
const MAX_SIDE = 2400;
const QUALITY = 92;
const EXTS = new Set(['.png', '.jpg', '.jpeg']);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (EXTS.has(extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const files = await walk(ROOT);
let totalIn = 0, totalOut = 0;

for (const file of files) {
  const inStat = await stat(file);
  totalIn += inStat.size;
  const out = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const img = sharp(file);
  const meta = await img.metadata();
  const longest = Math.max(meta.width || 0, meta.height || 0);
  const pipeline = longest > MAX_SIDE
    ? img.resize({ width: meta.width >= meta.height ? MAX_SIDE : null, height: meta.height > meta.width ? MAX_SIDE : null, withoutEnlargement: true })
    : img;
  await pipeline.webp({ quality: QUALITY, effort: 6 }).toFile(out);
  const outStat = await stat(out);
  totalOut += outStat.size;
  const pct = ((1 - outStat.size / inStat.size) * 100).toFixed(0);
  console.log(`${file.replace(ROOT + '/', '')}  ${(inStat.size/1024/1024).toFixed(1)}MB → ${(outStat.size/1024).toFixed(0)}KB  -${pct}%`);
}

console.log(`\nTotal: ${(totalIn/1024/1024).toFixed(1)}MB → ${(totalOut/1024/1024).toFixed(1)}MB  (-${((1-totalOut/totalIn)*100).toFixed(0)}%)`);
