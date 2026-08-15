import { NextRequest, NextResponse } from "next/server";
import {
  createComment,
  listComments,
  CommentValidationError,
  CommentRateLimitError,
  UnknownPostError,
} from "@/lib/comments";
import { ensureVisitorId, attachVisitorCookie } from "@/lib/visitor";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const cursorParam = searchParams.get("cursor");
  const limitParam = searchParams.get("limit");

  try {
    const result = await listComments(slug, {
      cursor: cursorParam ? Number(cursorParam) || undefined : undefined,
      limit: limitParam ? Number(limitParam) || undefined : undefined,
    });
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof UnknownPostError) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to load comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const { id: visitorId } = ensureVisitorId(request);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { authorName, body: text, stickerId } = body as Record<
    string,
    unknown
  >;

  try {
    const comment = await createComment(
      slug,
      {
        authorName: typeof authorName === "string" ? authorName : undefined,
        body: typeof text === "string" ? text : undefined,
        stickerId: typeof stickerId === "string" ? stickerId : undefined,
      },
      visitorId
    );
    const res = NextResponse.json(comment, { status: 201 });
    attachVisitorCookie(res, visitorId);
    return res;
  } catch (err) {
    if (err instanceof UnknownPostError) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (err instanceof CommentValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    if (err instanceof CommentRateLimitError) {
      return NextResponse.json({ error: err.message }, { status: 429 });
    }
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
