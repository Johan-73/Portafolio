// Generates a single-page-tall PDF from scripts/cv-template.html.
// Output: public/cv/johan-perez-cv-backend-llm.pdf
// Also writes a PNG preview to scripts/cv-preview.png for visual verification.

import { chromium } from "playwright";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { mkdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML_PATH = resolve(__dirname, "cv-template.html");
const PDF_PATH = resolve(__dirname, "../public/cv/johan-perez-cv-backend-llm.pdf");
const PREVIEW_PATH = resolve(__dirname, "cv-preview.png");

const A4_WIDTH_MM = 210;
// Wait for fonts + a tiny breathing buffer at the bottom so descenders don't kiss the page edge.
const BOTTOM_BUFFER_PX = 24;

async function main() {
  mkdirSync(dirname(PDF_PATH), { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  const page = await ctx.newPage();

  await page.goto(pathToFileURL(HTML_PATH).toString(), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  // Measure exact rendered height of the .page element.
  const heightPx = await page.evaluate(() => {
    const el = document.querySelector(".page");
    return el ? Math.ceil(el.getBoundingClientRect().height) : 0;
  });
  if (heightPx <= 0) throw new Error("Failed to measure .page height");

  const pageHeightPx = heightPx + BOTTOM_BUFFER_PX;
  console.log(`Measured .page height: ${heightPx}px → PDF height: ${pageHeightPx}px`);

  // Generate single-page PDF
  await page.pdf({
    path: PDF_PATH,
    width: `${A4_WIDTH_MM}mm`,
    height: `${pageHeightPx}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: false,
  });
  console.log(`✓ PDF saved: ${PDF_PATH}`);

  // Render a preview PNG of the SAME element for visual verification
  await page.setViewportSize({ width: 794, height: pageHeightPx });
  await page.screenshot({ path: PREVIEW_PATH, fullPage: true, scale: "css" });
  console.log(`✓ Preview PNG: ${PREVIEW_PATH}`);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
