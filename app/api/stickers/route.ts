import { NextResponse } from "next/server";
import { listStickers } from "@/lib/stickers";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ stickers: listStickers() });
}
