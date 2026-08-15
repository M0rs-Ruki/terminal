import Image from "next/image";

interface StickerProps {
  id: string;
  size?: number;
}

/** Fixed-box sticker render — same component in the picker and in comments, so no sticker ever renders larger than another. */
export default function Sticker({ id, size = 72 }: StickerProps) {
  return (
    <Image
      src={`/stickers/${id}`}
      alt={id}
      width={size}
      height={size}
      className="object-contain"
      style={{ width: size, height: size }}
    />
  );
}
