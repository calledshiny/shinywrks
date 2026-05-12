// One-off: record a short interaction clip of spotright_dummy.
// Prereqs: clone spotright_dummy, npm install there, run vite at
// http://127.0.0.1:5174, `npm install --no-save puppeteer` here, ffmpeg.
import puppeteer from 'puppeteer';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';

const BASE = 'http://127.0.0.1:5174';
const OUT_DIR = '/home/user/shinywrks/public/spotright';
const TMP_WEBM = '/tmp/spotright-interactions.webm';
const OUT_MP4 = `${OUT_DIR}/interactions.mp4`;
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

await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));

const recorder = await page.screencast({ path: TMP_WEBM });

await new Promise(r => setTimeout(r, 1000));
await clickButtonContaining('Bar Events');
await new Promise(r => setTimeout(r, 600));
await clickButtonContaining('Konzerte');
await new Promise(r => setTimeout(r, 800));
await clickButtonContaining('Was geht heute');
await new Promise(r => setTimeout(r, 2500));
await clickButtonContaining('Für dich');
await new Promise(r => setTimeout(r, 2000));
await clickButtonContaining('Meine Spots');
await new Promise(r => setTimeout(r, 2000));

await recorder.stop();
await browser.close();

const stat = await fs.stat(TMP_WEBM);
console.log(`webm captured: ${(stat.size / 1024).toFixed(0)} KB`);

// Convert WebM to H.264 MP4 for cross-browser playback (Safari needs it)
execFileSync('ffmpeg', ['-y', '-i', TMP_WEBM, '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', OUT_MP4], { stdio: 'inherit' });

const mp4Stat = await fs.stat(OUT_MP4);
console.log(`mp4 written: ${OUT_MP4}, ${(mp4Stat.size / 1024).toFixed(0)} KB`);
