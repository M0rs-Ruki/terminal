import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export async function renderPostHtml(markdown: string): Promise<string> {
  return String(
    await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(markdown)
  );
}
