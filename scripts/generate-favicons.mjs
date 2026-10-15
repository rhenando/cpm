import { readFile, writeFile } from "node:fs/promises";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const logo = await loadImage(await readFile("public/images/brand/cordova-favicon-source.jpeg"));

function makeIcon(size) {
  const canvas = createCanvas(size, size);
  const context = canvas.getContext("2d");
  context.drawImage(logo, 0, 0, size, size);
  return canvas.encodeSync("png");
}

const size = 96;
const iconPng = makeIcon(size);
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(size, 6);
header.writeUInt8(size, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(iconPng.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("src/app/favicon.ico", Buffer.concat([header, iconPng]));
await writeFile("public/apple-touch-icon.png", makeIcon(180));
process.stdout.write("Generated favicon.ico (96x96) and apple-touch-icon.png (180x180)\n");
