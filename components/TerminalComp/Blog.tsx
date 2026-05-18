"use client";

import React, { useEffect, useState } from "react";

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

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [listState, setListState] = useState<LoadState>("loading");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [post, setPost] = useState<FullPost | null>(null);
  const [postState, setPostState] = useState<LoadState>("ready");
  const [errorMsg, setErrorMsg] = useState<string>("");

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

  if (selectedSlug) {
    return (
      <div className="terminal-blog">
        <div className="mb-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSelectedSlug(null)}
            className="text-xs sm:text-sm text-green-400/80 font-mono hover:text-green-300 transition-colors cursor-pointer"
          >
            ← back to posts
          </button>
          {post && (
            <span className="text-xs sm:text-sm text-gray-500 font-mono truncate">
              {post.slug}.mdx
            </span>
          )}
        </div>

        {postState === "loading" && (
          <p className="text-green-400/70 font-mono text-sm">Loading post…</p>
        )}
        {postState === "error" && (
          <p className="text-red-400 font-mono text-sm">
            Failed to load post: {errorMsg}
          </p>
        )}
        {postState === "ready" && post && (
          <article className="space-y-3">
            <header className="border-b border-green-800/40 pb-3">
              <h2 className="text-lg sm:text-xl text-green-400 font-bold font-mono">
                {post.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 font-mono mt-1">
                {post.date && <time dateTime={post.date}>{post.date}</time>}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
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
              className="terminal-blog-content text-sm sm:text-base text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
        )}
      </div>
    );
  }

  return (
    <div className="terminal-blog">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-green-400 font-mono text-sm sm:text-base">
          BLOG.log
        </span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>

      {listState === "loading" && (
        <p className="text-green-400/70 font-mono text-sm">Loading posts…</p>
      )}
      {listState === "error" && (
        <p className="text-red-400 font-mono text-sm">
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
                <div className="flex items-center justify-between gap-3 mb-1">
                  <h3 className="text-base sm:text-lg text-green-400 font-semibold font-mono group-hover:text-green-300 transition-colors">
                    {p.title}
                  </h3>
                  {p.date && (
                    <time
                      dateTime={p.date}
                      className="shrink-0 text-xs sm:text-sm text-gray-500 font-mono"
                    >
                      {p.date}
                    </time>
                  )}
                </div>
                {p.excerpt && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {p.excerpt}
                  </p>
                )}
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
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
