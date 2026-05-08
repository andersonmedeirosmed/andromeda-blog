import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ categoria: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ categoria: c.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const label = categoria.charAt(0).toUpperCase() + categoria.slice(1);
  return {
    title: `${label} — Artigos`,
    description: `Artigos sobre ${label} no blog da Andromeda LMS.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;
  const posts = getPostsByCategory(categoria);

  if (posts.length === 0) notFound();

  const label = categoria.charAt(0).toUpperCase() + categoria.slice(1);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <p className="text-sm text-blue-600 font-medium mb-1">Categoria</p>
        <h1 className="text-3xl font-bold text-slate-900">{label}</h1>
        <p className="text-slate-500 mt-2">{posts.length} artigo{posts.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
