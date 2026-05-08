import { getAllPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug).slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
          Educação médica online
        </h1>
        <p className="text-slate-500 text-lg max-w-xl">
          Estratégias, ferramentas e cases para professores e instituições de saúde que querem criar sua escola online.
        </p>
      </div>

      {featured && (
        <div className="mb-10">
          <ArticleCard post={featured} featured />
        </div>
      )}

      {rest.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Artigos recentes
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-14 bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
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
