import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const SITE_URL = "https://www.anuppradhan.in";
const AUTHOR = "Anup Pradhan";
const EMAIL = "anuppradhan929@gmail.com";

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string): string {
  if (!dateStr) return new Date().toUTCString();
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

export async function GET() {
  const posts = getAllPosts();
  const latest = posts[0]?.date ? toRfc822(posts[0].date) : new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      const description = p.excerpt ?? p.title;
      const categories = (p.tags ?? [])
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(p.date)}</pubDate>
      <description>${escapeXml(description)}</description>
      <dc:creator>${escapeXml(AUTHOR)}</dc:creator>
${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(AUTHOR)} — Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes, write-ups and tinkering by ${escapeXml(AUTHOR)} — backend, system design, AI calling, WebRTC/SIP.</description>
    <language>en-IN</language>
    <copyright>Copyright ${new Date().getFullYear()} ${escapeXml(AUTHOR)}</copyright>
    <managingEditor>${EMAIL} (${escapeXml(AUTHOR)})</managingEditor>
    <webMaster>${EMAIL} (${escapeXml(AUTHOR)})</webMaster>
    <lastBuildDate>${latest}</lastBuildDate>
    <generator>Next.js — anuppradhan.in</generator>
${items}
  </channel>
</rss>
`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
