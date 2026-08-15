import { prisma } from "@/lib/prisma";
import { assertKnownSlug } from "@/lib/blog";

export { UnknownPostError } from "@/lib/blog";

const DEDUPE_WINDOW_MS = 30 * 60 * 1000;

export interface ViewStats {
  total: number;
  lastViewedAt: string | null;
}

export interface RecordViewResult extends ViewStats {
  recorded: boolean;
}

export async function recordView(
  slug: string,
  visitorId: string
): Promise<RecordViewResult> {
  assertKnownSlug(slug);

  const recent = await prisma.blogView.findFirst({
    where: {
      postSlug: slug,
      visitorId,
      viewedAt: { gt: new Date(Date.now() - DEDUPE_WINDOW_MS) },
    },
  });

  let recorded = false;
  if (!recent) {
    await prisma.blogView.create({ data: { postSlug: slug, visitorId } });
    recorded = true;
  }

  const stats = await getViewStats(slug);
  return { ...stats, recorded };
}

export async function getViewStats(slug: string): Promise<ViewStats> {
  assertKnownSlug(slug);

  const [total, latest] = await Promise.all([
    prisma.blogView.count({ where: { postSlug: slug } }),
    prisma.blogView.findFirst({
      where: { postSlug: slug },
      orderBy: { viewedAt: "desc" },
      select: { viewedAt: true },
    }),
  ]);

  return {
    total,
    lastViewedAt: latest ? latest.viewedAt.toISOString() : null,
  };
}
