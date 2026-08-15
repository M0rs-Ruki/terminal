import { NextRequest, NextResponse } from "next/server";
import { recordView, getViewStats, UnknownPostError } from "@/lib/views";
import { ensureVisitorId, attachVisitorCookie } from "@/lib/visitor";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  try {
    const stats = await getViewStats(slug);
    return NextResponse.json(stats);
  } catch (err) {
    if (err instanceof UnknownPostError) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to load view stats" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const { id: visitorId } = ensureVisitorId(request);

  try {
    const result = await recordView(slug, visitorId);
    const res = NextResponse.json(result);
    attachVisitorCookie(res, visitorId);
    return res;
  } catch (err) {
    if (err instanceof UnknownPostError) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to record view" },
      { status: 500 }
    );
  }
}
