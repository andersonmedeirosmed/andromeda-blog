import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  formatDate,
  extractHeadings,
} from "@/lib/posts";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import TableOfContents from "@/components/TableOfContents";

const SITE_URL = "https://blog.andromedalms.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.image
            ? `${SITE_URL}${post.image}`
            : `${SITE_URL}/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeHighlight],
      },
    },
  });

  const headings = extractHeadings(post.content);
  const related = getPostsByCategory(post.category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);
  const url = `${SITE_URL}/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/og-image.png`,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Andromeda LMS",
      url: "https://www.andromedalms.com",
    },
    url,
    mainEntityOfPage: url,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: post.category,
        item: `${SITE_URL}/categoria/${post.category.toLowerCase()}`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Cover image */}
      {post.image && (
        <div className="relative w-full h-72 sm:h-96 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <Link
            href={`/categoria/${post.category.toLowerCase()}`}
            className="hover:text-blue-600 transition-colors capitalize"
          >
            {post.category}
          </Link>
        </nav>

        <div className="flex gap-12">
          {/* TOC — left sidebar */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-56 shrink-0">
              <TableOfContents headings={headings} />
            </aside>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Article header */}
            <header className="mb-10">
              <div className="mb-4">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed mb-6">
                {post.description}
              </p>
              <div className="flex items-center gap-3 text-sm text-slate-400 pb-8 border-b border-slate-200">
                <span className="font-medium text-slate-600">{post.author}</span>
                <span>·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </header>

            {/* Article content */}
            <article
              className="prose prose-slate prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-slate-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900
                prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-slate-900 prose-pre:rounded-xl
                prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-500
                prose-ul:text-slate-600 prose-ol:text-slate-600
                prose-li:my-1
                prose-img:rounded-xl prose-img:shadow-md
                prose-table:text-sm"
            >
              {content}
            </article>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-200">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag.toLowerCase()}`}
                    className="text-xs text-slate-500 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 px-3 py-1.5 rounded-full transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-br from-blue-950 to-blue-800 rounded-2xl p-8 text-white text-center">
              <h2 className="text-xl font-bold mb-2">
                Crie sua escola médica online
              </h2>
              <p className="text-blue-200 mb-5 text-sm">
                7 dias grátis. Sem cartão de crédito. Sua marca, seus alunos.
              </p>
              <a
                href="https://www.andromedalms.com/criar-escola"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Começar agora grátis
              </a>
            </div>

            {/* More from same category */}
            {related.length > 0 && (
              <section className="mt-14 pt-10 border-t border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Mais em{" "}
                    <span className="text-blue-600">{post.category}</span>
                  </h2>
                  <Link
                    href={`/categoria/${post.category.toLowerCase()}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Ver todos →
                  </Link>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {related.map((p) => (
                    <ArticleCard key={p.slug} post={p} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
