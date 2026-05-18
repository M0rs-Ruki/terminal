"use client";

import React, { useEffect, useRef, useState } from "react";

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
}

interface FullPost extends PostMeta {
  html: string;
}

type LoadState = "loading" | "ready" | "error";

function rankRecommendations(
  current: PostMeta,
  pool: PostMeta[],
  limit = 3
): PostMeta[] {
  const currentTags = new Set(current.tags ?? []);
  return pool
    .filter((p) => p.slug !== current.slug)
    .map((p) => {
      const overlap = (p.tags ?? []).reduce(
        (acc, t) => acc + (currentTags.has(t) ? 1 : 0),
        0
      );
      return { post: p, overlap };
    })
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return a.post.date < b.post.date ? 1 : -1;
    })
    .slice(0, limit)
    .map((x) => x.post);
}

function applyWordReveal(root: HTMLElement): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const parent = (n as Text).parentElement;
    if (!parent) continue;
    // Skip text inside <code>/<pre> so code blocks don't fragment
    if (parent.closest("code, pre")) continue;
    if (n.textContent && n.textContent.trim()) textNodes.push(n as Text);
  }

  let totalWords = 0;
  const splitCache: string[][] = textNodes.map((tn) => {
    const parts = (tn.textContent || "").split(/(\s+)/);
    totalWords += parts.filter((p) => p && !/^\s+$/.test(p)).length;
    return parts;
  });

  // Aim for ~3s total reveal, clamp per-word delay between 6ms and 28ms
  const perWordMs = Math.min(28, Math.max(6, 3000 / Math.max(1, totalWords)));

  let wordIdx = 0;
  textNodes.forEach((tn, i) => {
    const parts = splitCache[i];
    const frag = document.createDocumentFragment();
    parts.forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
      } else {
        const span = document.createElement("span");
        span.className = "blog-word";
        span.style.setProperty("--d", `${Math.round(wordIdx * perWordMs)}ms`);
        span.textContent = part;
        frag.appendChild(span);
        wordIdx++;
      }
    });
    tn.parentNode?.replaceChild(frag, tn);
  });
}

interface RecommendationsProps {
  items: PostMeta[];
  onSelect: (slug: string) => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({ items, onSelect }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(id);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-label="Recommended posts"
      className={`mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-green-800/40 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-green-400 font-mono text-sm">$ ls ./read-next/</span>
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {items.map((p) => (
          <li key={p.slug}>
            <button
              type="button"
              onClick={() => onSelect(p.slug)}
              className="w-full h-full text-left border border-green-800/40 bg-gradient-to-br from-green-900/10 to-black/40 hover:border-green-400/60 transition-colors rounded-lg p-3 cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm text-green-400 font-semibold font-mono group-hover:text-green-300 transition-colors break-words">
                  {p.title}
                </h4>
                {p.date && (
                  <time
                    dateTime={p.date}
                    className="shrink-0 text-[11px] text-gray-500 font-mono"
                  >
                    {p.date}
                  </time>
                )}
              </div>
              {p.excerpt && (
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                  {p.excerpt}
                </p>
              )}
              {p.tags && p.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 bg-green-900/30 border border-green-800/50 rounded-full text-green-400 text-[10px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [listState, setListState] = useState<LoadState>("loading");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [post, setPost] = useState<FullPost | null>(null);
  const [postState, setPostState] = useState<LoadState>("ready");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const articleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { posts: PostMeta[] } = await res.json();
        if (!cancelled) {
          setPosts(data.posts);
          setListState("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err instanceof Error ? err.message : String(err));
          setListState("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedSlug) {
      setPost(null);
      return;
    }
    let cancelled = false;
    setPostState("loading");
    (async () => {
      try {
        const res = await fetch(`/api/blog/${selectedSlug}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: FullPost = await res.json();
        if (!cancelled) {
          setPost(data);
          setPostState("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err instanceof Error ? err.message : String(err));
          setPostState("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedSlug]);

  useEffect(() => {
    if (postState !== "ready" || !post || !contentRef.current) return;
    applyWordReveal(contentRef.current);
    articleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [postState, post]);

  useEffect(() => {
    if (!selectedSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const target = e.target as HTMLElement | null;
      // Don't hijack Esc when typing in a multi-line editor / contenteditable
      if (
        target &&
        (target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      setSelectedSlug(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedSlug]);

  if (selectedSlug) {
    return (
      <div className="terminal-blog" ref={articleRef}>
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <button
            type="button"
            onClick={() => setSelectedSlug(null)}
            title="Press Esc to go back"
            className="text-xs sm:text-sm text-green-400/80 font-mono hover:text-green-300 transition-colors cursor-pointer py-1"
          >
            ← back to posts{" "}
            <kbd className="hidden sm:inline ml-1 px-1.5 py-0.5 text-[10px] border border-green-800/60 rounded bg-black/40 text-green-400/70">
              Esc
            </kbd>
          </button>
          {post && (
            <span className="text-xs sm:text-sm text-gray-500 font-mono truncate min-w-0">
              {post.slug}.mdx
            </span>
          )}
        </div>

        {postState === "loading" && (
          <p className="text-green-400/70 font-mono text-sm">Loading post…</p>
        )}
        {postState === "error" && (
          <p className="text-red-400 font-mono text-sm break-words">
            Failed to load post: {errorMsg}
          </p>
        )}
        {postState === "ready" && post && (
          <article className="space-y-3">
            <header className="border-b border-green-800/40 pb-3">
              <h2 className="text-base sm:text-lg text-green-400 font-bold font-mono break-words">
                {post.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 font-mono mt-2">
                {post.date && <time dateTime={post.date}>{post.date}</time>}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-green-900/30 border border-green-800/50 rounded-full text-green-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            <div
              ref={contentRef}
              className="terminal-blog-content text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <Recommendations
              items={rankRecommendations(post, posts)}
              onSelect={(slug) => setSelectedSlug(slug)}
            />
          </article>
        )}
      </div>
    );
  }

  return (
    <div className="terminal-blog">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-green-400 font-mono text-sm">BLOG.log</span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>

      {listState === "loading" && (
        <p className="text-green-400/70 font-mono text-sm">Loading posts…</p>
      )}
      {listState === "error" && (
        <p className="text-red-400 font-mono text-sm break-words">
          Failed to load posts: {errorMsg}
        </p>
      )}
      {listState === "ready" && posts.length === 0 && (
        <p className="text-gray-400 text-sm font-mono">No posts yet.</p>
      )}
      {listState === "ready" && posts.length > 0 && (
        <ul className="space-y-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => setSelectedSlug(p.slug)}
                className="w-full text-left border border-green-800/40 bg-gradient-to-br from-green-900/10 to-black/40 hover:border-green-400/60 transition-colors rounded-lg p-3 sm:p-4 cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 mb-1">
                  <h3 className="text-sm sm:text-base text-green-400 font-semibold font-mono group-hover:text-green-300 transition-colors break-words">
                    {p.title}
                  </h3>
                  {p.date && (
                    <time
                      dateTime={p.date}
                      className="shrink-0 text-xs text-gray-500 font-mono"
                    >
                      {p.date}
                    </time>
                  )}
                </div>
                {p.excerpt && (
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {p.excerpt}
                  </p>
                )}
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-green-900/30 border border-green-800/50 rounded-full text-green-400 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blog;
