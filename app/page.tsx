import { getAllPosts, getAllCategories } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);
  const categories = getAllCategories();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Featured / hero */}
      {featured && (
        <div className="mb-12">
          <ArticleCard post={featured} featured />
        </div>
      )}

      {/* Articles with filter */}
      {rest.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-5">
            Artigos recentes
          </h2>
          <CategoryFilter posts={rest} categories={categories} />
        </section>
      )}

      {/* CTA */}
      <div className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Pronto para criar sua escola médica?
        </h2>
        <p className="text-slate-500 mb-5 max-w-md mx-auto">
          7 dias grátis, sem cartão de crédito. Configure em menos de 10 minutos.
        </p>
        <a
          href="https://www.andromedalms.com/criar-escola"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Criar escola grátis
        </a>
      </div>
    </div>
  );
}
