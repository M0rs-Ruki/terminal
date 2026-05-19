import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import BlogTerminalPage from "@/components/BlogTerminalPage";
import BlogSeoArticle from "@/components/BlogSeoArticle";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { renderPostHtml } from "@/lib/render-post";

const SITE_URL = "https://www.anuppradhan.in";
const AUTHOR_NAME = "Anup Pradhan";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
      authors: [SITE_URL],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      site: "@AnupPradhan0",
      creator: "@AnupPradhan0",
      title: post.title,
      description,
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

  const html = await renderPostHtml(post.content);
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

  const initialPost = {
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags,
    html,
  };

  return (
    <>
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
      <BlogSeoArticle
        title={post.title}
        date={post.date}
        excerpt={post.excerpt}
        html={html}
      />
      <BlogTerminalPage slug={slug} initialPost={initialPost} />
    </>
  );
}
