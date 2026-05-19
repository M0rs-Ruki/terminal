/** Crawlable article HTML for /blog/[slug] — complements the terminal UI. */
interface BlogSeoArticleProps {
  title: string;
  date?: string;
  excerpt?: string;
  html: string;
}

export default function BlogSeoArticle({
  title,
  date,
  excerpt,
  html,
}: BlogSeoArticleProps) {
  return (
    <article
      className="sr-only"
      aria-hidden="true"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <h1 itemProp="headline">{title}</h1>
      {date && <time itemProp="datePublished" dateTime={date}>{date}</time>}
      {excerpt && <p itemProp="description">{excerpt}</p>}
      <div itemProp="articleBody" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
