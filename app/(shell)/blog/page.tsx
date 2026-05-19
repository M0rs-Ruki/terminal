import type { Metadata } from "next";
import Script from "next/script";
import BlogTerminalPage from "@/components/BlogTerminalPage";
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
    <>
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
      <nav className="sr-only" aria-label="Blog posts">
        <h1>Blog</h1>
        <ul>
          {posts.map((p) => (
            <li key={p.slug}>
              <a href={`${SITE_URL}/blog/${p.slug}`}>{p.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      <BlogTerminalPage slug={null} />
    </>
  );
}
