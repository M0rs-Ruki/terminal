import fs from "node:fs";
import path from "node:path";

export interface StickerMeta {
  id: string;
  url: string;
}

const STICKERS_DIR = path.join(process.cwd(), "public", "stickers");
const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|svg)$/i;

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
