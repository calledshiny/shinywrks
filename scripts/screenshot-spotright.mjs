// One-off: regenerate spotright UI screenshots into public/spotright/.
// Prereq: clone spotright repo, `npm install --no-save puppeteer` here,
// and run the spotright vite dev server at http://127.0.0.1:5173 with
// VITE_SITE_PASSWORD=TimJustin plus dummy Supabase env vars.
import puppeteer from 'puppeteer';
import sharp from 'sharp';
import fs from 'fs/promises';

const BASE = 'http://127.0.0.1:5173';
const PASSWORD = 'TimJustin';
const OUT = '/home/user/shinywrks/public/spotright';
const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

const shots = [
  { path: '/', file: 'screen-landing.webp', wait: 1200 },
  { path: '/events', file: 'screen-discovery.webp', wait: 2000 },
  { path: '/for-you', file: 'screen-search.webp', wait: 1500 },
  { path: '/saved', file: 'screen-saved.webp', wait: 1500 },
];

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();
await page.setViewport(VIEWPORT);
page.on('pageerror', e => console.log('pageerror:', e.message));
page.on('requestfailed', r => {
  const u = r.url();
  if (!u.includes('supabase') && !u.includes('localhost:8000') && !u.startsWith('chrome-extension')) {
    console.log('reqfail:', u, r.failure()?.errorText);
  }
});

await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await new Promise(r => setTimeout(r, 600));

// Fill password gate
await page.waitForSelector('input[type="password"]', { timeout: 5000 });
await page.type('input[type="password"]', PASSWORD);
await page.click('button[type="submit"]');
await new Promise(r => setTimeout(r, 1200));

for (const s of shots) {
  await page.goto(BASE + s.path, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, s.wait));
  const buf = await page.screenshot({ type: 'png', fullPage: false });
  const tmpFile = `/tmp/spotright-${s.file.replace('.webp', '.png')}`;
  await fs.writeFile(tmpFile, buf);
  await sharp(buf).webp({ quality: 88 }).toFile(`${OUT}/${s.file}`);
  console.log(`saved ${s.file}`);
}

await browser.close();
console.log('done');
