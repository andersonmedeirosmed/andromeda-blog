import { getAllPosts, getAllTags } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag} — Artigos`,
    description: `Artigos com a tag "${tag}" no blog da Andromeda LMS.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;

  const posts = getAllPosts().filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );

  if (posts.length === 0) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-slate-600">#{tag}</span>
      </nav>

      <div className="mb-10">
        <p className="text-sm text-blue-600 font-medium mb-1">Tag</p>
        <h1 className="text-3xl font-bold text-slate-900">#{tag}</h1>
        <p className="text-slate-500 mt-2">
          {posts.length} artigo{posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
