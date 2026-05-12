// One-off: regenerate spotright UI screenshots into public/spotright/.
// Targets the spotright_dummy variant (no backend, mock event data).
// Navigation is via in-page view state. We click a category pill, fire
// the landing CTA, then tab the bottom nav through the remaining views.
// Prereqs: clone spotright_dummy, npm install there, run vite at
// http://127.0.0.1:5174, and `npm install --no-save puppeteer` here.
import puppeteer from 'puppeteer';
import sharp from 'sharp';

const BASE = 'http://127.0.0.1:5174';
const OUT = '/home/user/shinywrks/public/spotright';
const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const page = await browser.newPage();
await page.setViewport(VIEWPORT);
page.on('pageerror', e => console.log('pageerror:', e.message));

async function clickButtonContaining(text) {
  return await page.evaluate((t) => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => (b.textContent || '').includes(t));
    if (btn) { btn.click(); return true; }
    return false;
  }, text);
}

async function shot(name, wait = 1200) {
  await new Promise(r => setTimeout(r, wait));
  const buf = await page.screenshot({ type: 'png', fullPage: false });
  await sharp(buf).webp({ quality: 88 }).toFile(`${OUT}/${name}.webp`);
  console.log(`saved ${name}`);
}

await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));

await shot('screen-landing', 400);

await clickButtonContaining('Bar Events');
await new Promise(r => setTimeout(r, 500));
const ctaClicked = await clickButtonContaining('Was geht heute');
console.log('cta click:', ctaClicked);
await new Promise(r => setTimeout(r, 2000));

await shot('screen-discovery', 500);

console.log('für dich click:', await clickButtonContaining('Für dich'));
await shot('screen-search', 1500);

console.log('meine spots click:', await clickButtonContaining('Meine Spots'));
await shot('screen-saved', 1500);

await browser.close();
console.log('done');
