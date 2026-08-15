import fs from "node:fs";
import path from "node:path";

export interface StickerMeta {
  id: string;
  url: string;
}

const STICKERS_DIR = path.join(process.cwd(), "public", "stickers");
// No SVG: next/image blocks SVGs by default (they can carry scripts) and
// stickers are raster art anyway (PNG/GIF/WebP cover transparent + animated).
const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp)$/i;

export function listStickers(): StickerMeta[] {
  if (!fs.existsSync(STICKERS_DIR)) return [];
  return fs
    .readdirSync(STICKERS_DIR)
    .filter((f) => IMAGE_EXT_RE.test(f))
    .sort()
    .map((f) => ({ id: f, url: `/stickers/${f}` }));
}

export function isKnownSticker(id: string, knownIds: string[]): boolean {
  return knownIds.includes(id);
}
