/*
 * shinywrks PDF Renderer — HTML → A4 PDF via Puppeteer
 *
 * Setup (einmalig im Arbeitsordner):
 *   npm init -y
 *   npm install puppeteer --silent
 *
 * Ausführen:
 *   node render-pdf.mjs <input.html> [output.pdf]
 *
 * Default: liest cv-a4.html, schreibt cv-a4.pdf im gleichen Verzeichnis.
 *
 * Wichtig:
 * - printBackground: true → rendert paper-warm, dot-grid, noise overlay
 * - preferCSSPageSize: true → nutzt @page size A4 aus dem HTML
 * - 1500ms wait → Google Fonts geladen vor Render
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const input = process.argv[2] || 'cv-a4.html';
const output = process.argv[3] || input.replace(/\.html?$/, '.pdf');

const htmlPath = path.resolve(__dirname, input);
const pdfPath = path.resolve(__dirname, output);

if (!existsSync(htmlPath)) {
  console.error(`Input not found: ${htmlPath}`);
  process.exit(1);
}

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500));
await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  preferCSSPageSize: true,
});
await browser.close();

console.log(`PDF written to ${pdfPath}`);
