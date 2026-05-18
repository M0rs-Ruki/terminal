import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes, write-ups and tinkering by Anup Pradhan — backend, system design, AI calling, and the small experiments in between.",
  alternates: { canonical: "https://www.anuppradhan.in/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8 border border-green-800 bg-black/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 flex items-center justify-between">
          <span className="text-green-400 font-mono text-sm sm:text-base">
            BLOG.log
          </span>
          <Link
            href="/"
            className="text-xs sm:text-sm text-green-400/80 font-mono hover:text-green-300 transition-colors"
          >
            ← back to terminal
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl text-green-400 font-bold font-mono mb-6">
          Blog
        </h1>

        {posts.length === 0 ? (
          <p className="text-gray-400 text-sm sm:text-base font-mono">
            No posts yet. Check back soon.
          </p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="border border-green-800/40 bg-gradient-to-br from-green-900/10 to-black/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 hover:border-green-400/60 transition-colors"
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h2 className="text-base sm:text-lg text-green-400 font-semibold font-mono group-hover:text-green-300 transition-colors">
                      {post.title}
                    </h2>
                    {post.date && (
                      <time
                        dateTime={post.date}
                        className="shrink-0 text-xs sm:text-sm text-gray-500 font-mono"
                      >
                        {post.date}
                      </time>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-green-900/30 border border-green-800/50 rounded-full text-green-400 text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
