import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname } from "node:path";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const jobs = [
  ["public/images/articles/Dubai-PropertyBlog4.jpg", "public/images/optimized/dubai-property-hero.webp", 1200, 60],
  ["public/images/brand/CPM-primary-logo-header.png", "public/images/optimized/cordova-logo-header.webp", 300, 88],
  ["public/images/brand/CPM-primary-logo-footer.png", "public/images/optimized/cordova-logo-footer.webp", 300, 88],
  ["public/images/pages/cris4.jpg", "public/images/optimized/cris4.webp", 1000, 80],
  ["public/images/pages/joy1.jpg", "public/images/optimized/joy1.webp", 1000, 80],
  ["public/images/pages/rose1.jpg", "public/images/optimized/rose1.webp", 1000, 80],
  ["public/images/pages/car.jpg", "public/images/optimized/car.webp", 1000, 80],
  ["public/images/pages/mame.jpg", "public/images/optimized/mame.webp", 1000, 80],
  ["public/images/pages/will.jpg", "public/images/optimized/will.webp", 1000, 80],
  ["public/images/pages/1.jpg", "public/images/optimized/property-1.webp", 1600, 80],
  ["public/images/pages/2.png", "public/images/optimized/property-2.webp", 1600, 80],
  ["public/images/pages/3.png", "public/images/optimized/property-3.webp", 1600, 80],
  ["public/images/pages/4.png", "public/images/optimized/property-4.webp", 1600, 80],
  ["public/images/articles/2150225265.jpg", "public/images/optimized/article-document-calendar.webp", 1600, 80],
  ["public/images/articles/modern-cozy-living-room-wooden-wall-texture-background-interior-design-3d-rendering-scaled.jpg", "public/images/optimized/modern-living-room.webp", 1600, 80]
];

for (const [input, output, maxWidth, quality] of jobs) {
  const source = await readFile(input);
  const image = await loadImage(source);
  const scale = Math.min(1, maxWidth / image.width);
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = createCanvas(width, height);
  canvas.getContext("2d").drawImage(image, 0, 0, width, height);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, canvas.encodeSync("webp", quality));
  process.stdout.write(`${input} -> ${output} (${width}x${height}, ${extname(output).slice(1)})\n`);
}

await import("./generate-favicons.mjs");
