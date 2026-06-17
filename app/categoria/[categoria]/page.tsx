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
    <>
      {/* Category Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="dot-float absolute top-10 left-[15%] w-2 h-2 rounded-full bg-pink-400" />
          <div className="dot-float-slow absolute top-16 left-[40%] w-2.5 h-2.5 rounded-full bg-purple-400" />
          <div className="dot-float-reverse absolute top-8 left-[70%] w-2 h-2 rounded-full bg-pink-300" />
          <div className="dot-float absolute top-20 left-[85%] w-1.5 h-1.5 rounded-full bg-purple-500" />
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-purple-200 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            Categoria
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{label}</h1>
          <p className="text-purple-200/70 text-sm">
            {posts.length} artigo{posts.length !== 1 ? "s" : ""} publicado{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 -mt-6 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
