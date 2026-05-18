import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";

const SITE_URL = "https://www.anuppradhan.in";
const AUTHOR_NAME = "Anup Pradhan";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const url = `${SITE_URL}/blog/${slug}`;
  const description = post.excerpt ?? post.title;

  return {
    title: post.title,
    description,
    keywords: post.tags,
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    publisher: AUTHOR_NAME,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description,
      siteName: AUTHOR_NAME,
      locale: "en_IN",
      publishedTime: post.date || undefined,
      modifiedTime: post.date || undefined,
      authors: [`${SITE_URL}`],
      tags: post.tags,
      images: [
        {
          url: "/images/logo.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@AnupPradhan0",
      creator: "@AnupPradhan0",
      title: post.title,
      description,
      images: ["/images/logo.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const compiled = await evaluate(post.content, {
    ...(runtime as unknown as Parameters<typeof evaluate>[1]),
    remarkPlugins: [remarkGfm],
  });

  const MDXContent = compiled.default;
  const components = getMDXComponents({});

  const url = `${SITE_URL}/blog/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? post.title,
    image: [`${SITE_URL}/images/logo.jpg`],
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    keywords: post.tags?.join(", "),
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Script
        id={`article-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id={`breadcrumb-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
      <article className="relative z-10 max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8 border border-green-800 bg-black/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 flex items-center justify-between">
          <span className="text-green-400 font-mono text-sm sm:text-base">
            {post.title.toLowerCase().replace(/\s+/g, "-")}.mdx
          </span>
          <Link
            href="/blog"
            className="text-xs sm:text-sm text-green-400/80 font-mono hover:text-green-300 transition-colors"
          >
            ← all posts
          </Link>
        </div>

        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl text-green-400 font-bold font-mono mb-2">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 font-mono">
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

        <div className="prose-blog">
          <MDXContent components={components} />
        </div>
      </article>
    </div>
  );
}
