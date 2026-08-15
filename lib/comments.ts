import { prisma } from "@/lib/prisma";
import { assertKnownSlug } from "@/lib/blog";
import { listStickers, isKnownSticker } from "@/lib/stickers";
import type { Comment } from "@prisma/client";

export { UnknownPostError } from "@/lib/blog";

const MAX_AUTHOR_NAME_LEN = 40;
const MAX_BODY_LEN = 2000;
const DEFAULT_LIST_LIMIT = 20;
const MAX_LIST_LIMIT = 50;
const RATE_LIMIT_MAX_PER_HOUR = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// Given to commenters who don't type a name — friendlier than a flat "Anonymous".
const FALLBACK_NAMES = [
  "Mystery Guest",
  "Silent Ninja",
  "Curious Fox",
  "Secret Agent",
  "Wandering Owl",
  "Nameless Wanderer",
  "Undercover Panda",
];

function randomFallbackName(): string {
  return FALLBACK_NAMES[Math.floor(Math.random() * FALLBACK_NAMES.length)];
}

export class CommentValidationError extends Error {}
export class CommentRateLimitError extends Error {}

export interface CreateCommentInput {
  authorName?: string;
  body?: string;
  stickerId?: string;
}

export interface CommentDTO {
  id: number;
  authorName: string;
  body: string | null;
  stickerId: string | null;
  createdAt: string;
}

export interface ListCommentsResult {
  comments: CommentDTO[];
  nextCursor: number | null;
  total: number;
}

function toDTO(row: Comment): CommentDTO {
  return {
    id: row.id,
    authorName: row.authorName,
    body: row.body,
    stickerId: row.stickerId,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function createComment(
  slug: string,
  input: CreateCommentInput,
  visitorId: string
): Promise<CommentDTO> {
  assertKnownSlug(slug);

  const authorName =
    (input.authorName ?? "").trim().slice(0, MAX_AUTHOR_NAME_LEN) ||
    randomFallbackName();
  const body = (input.body ?? "").trim().slice(0, MAX_BODY_LEN) || null;
  const stickerId = input.stickerId?.trim() || null;

  if (stickerId) {
    const knownIds = listStickers().map((s) => s.id);
    if (!isKnownSticker(stickerId, knownIds)) {
      throw new CommentValidationError(`Unknown sticker: ${stickerId}`);
    }
  }

  if (!body && !stickerId) {
    throw new CommentValidationError(
      "Comment must include text or a sticker"
    );
  }

  const recentCount = await prisma.comment.count({
    where: {
      visitorId,
      postSlug: slug,
      createdAt: { gt: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) },
    },
  });
  if (recentCount >= RATE_LIMIT_MAX_PER_HOUR) {
    throw new CommentRateLimitError("Too many comments, try again later");
  }

  const row = await prisma.comment.create({
    data: { postSlug: slug, authorName, body, stickerId, visitorId },
  });
  return toDTO(row);
}

export async function listComments(
  slug: string,
  opts: { cursor?: number; limit?: number } = {}
): Promise<ListCommentsResult> {
  assertKnownSlug(slug);

  const limit = Math.min(
    MAX_LIST_LIMIT,
    Math.max(1, opts.limit ?? DEFAULT_LIST_LIMIT)
  );

  const [rows, total] = await Promise.all([
    prisma.comment.findMany({
      where: { postSlug: slug },
      orderBy: { id: "desc" },
      take: limit + 1,
      ...(opts.cursor
        ? { cursor: { id: opts.cursor }, skip: 1 }
        : {}),
    }),
    prisma.comment.count({ where: { postSlug: slug } }),
  ]);

  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;

  return {
    comments: page.map(toDTO),
    nextCursor: hasMore ? page[page.length - 1].id : null,
    total,
  };
}
