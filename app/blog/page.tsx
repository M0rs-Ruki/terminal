import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://www.anuppradhan.in";
const AUTHOR_NAME = "Anup Pradhan";
const BLOG_DESCRIPTION =
  "Notes, write-ups and tinkering by Anup Pradhan — backend, system design, AI calling, WebRTC/SIP, and the small experiments in between.";

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG_DESCRIPTION,
  keywords: [
    "Anup Pradhan Blog",
    "Software Developer Blog",
    "Backend Engineering Blog",
    "System Design Notes",
    "AI Calling Blog",
    "WebRTC Blog",
    "SIP Protocol Blog",
    "Developer Notes India",
  ],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Blog | Anup Pradhan",
    description: BLOG_DESCRIPTION,
    siteName: AUTHOR_NAME,
    locale: "en_IN",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Anup Pradhan — Blog",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AnupPradhan0",
    creator: "@AnupPradhan0",
    title: "Blog | Anup Pradhan",
    description: BLOG_DESCRIPTION,
    images: ["/images/logo.jpg"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog`,
    url: `${SITE_URL}/blog`,
    name: "Anup Pradhan — Blog",
    description: BLOG_DESCRIPTION,
    inLanguage: "en-IN",
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date || undefined,
      description: p.excerpt ?? p.title,
      keywords: p.tags?.join(", "),
      author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Script
        id="blog-index-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="blog-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
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
