import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/** Open all links from blog HTML in a new tab. */
export function withBlogLinkTargets(html: string): string {
  return html.replace(
    /<a\s+(?![^>]*\btarget=)/gi,
    '<a target="_blank" rel="noopener noreferrer" '
  );
}

export async function renderPostHtml(markdown: string): Promise<string> {
  const raw = String(
    await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(markdown)
  );
  return withBlogLinkTargets(raw);
}
