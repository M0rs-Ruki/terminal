"use client";

import Link from "next/link";
import { formatBlogPostLabel } from "@/lib/blog-search";

export interface BlogCardPost {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
}

export function formatPostDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const NEW_POST_DAYS = 30;

/** Badge on recency, not on "is it the last item" — a post shouldn't still
 *  say NEW two years from now just because nothing was written after it. */
function isNewPost(date: string): boolean {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return false;
  const ageDays = (Date.now() - parsed.getTime()) / 86_400_000;
  return ageDays >= 0 && ageDays <= NEW_POST_DAYS;
}

interface BlogCardProps {
  post: BlogCardPost;
  /** Renders as a <Link> when set; otherwise a <button onClick>. */
  href?: string;
  onClick?: () => void;
  /** Suffix the title with "(blog)" — used when the card appears next to non-blog output. */
  showBlogLabel?: boolean;
}

/** The one fixed blog card design/layout — used by the post list, read-next
 *  recommendations, and inline terminal search results alike. */
export default function BlogCard({
  post,
  href,
  onClick,
  showBlogLabel = false,
}: BlogCardProps) {
  const className =
    "flex h-full flex-col text-left border border-green-800/40 bg-gradient-to-br from-green-900/10 to-black/40 hover:border-green-400/60 transition-colors rounded-lg p-3 sm:p-4 cursor-pointer group";

  const content = (
    <>
      <div className="flex flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-1">
        <h3 className="text-sm sm:text-base text-green-400 font-semibold font-mono group-hover:text-green-300 transition-colors break-words flex-1 leading-snug">
          {showBlogLabel ? formatBlogPostLabel(post.title) : post.title}
          {post.date && isNewPost(post.date) && (
            <span className="ml-2 align-middle px-1.5 py-0.5 bg-green-400/20 border border-green-400/60 rounded text-green-300 text-[10px] font-mono uppercase tracking-wider">
              new
            </span>
          )}
        </h3>
        {post.date && (
          <time
            dateTime={post.date}
            className="shrink-0 text-xs text-gray-500 font-mono whitespace-nowrap"
          >
            {formatPostDate(post.date)}
          </time>
        )}
      </div>
      {post.excerpt && (
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-green-900/30 border border-green-800/50 rounded-full text-green-400 text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <p className="mt-auto pt-3 text-green-400/80 font-mono text-xs group-hover:text-green-300">
        → read post
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
