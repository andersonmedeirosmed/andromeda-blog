import { getAllPosts, getAllCategories } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);
  const categories = getAllCategories();

  return (
    <>
      {/* Hero Section with floating dots */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        {/* Floating dots */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="dot-float absolute top-16 left-[10%] w-2 h-2 rounded-full bg-pink-400" />
          <div className="dot-float-slow absolute top-24 left-[25%] w-3 h-3 rounded-full bg-purple-400" />
          <div className="dot-float-reverse absolute top-12 left-[45%] w-1.5 h-1.5 rounded-full bg-pink-300" />
          <div className="dot-float absolute top-32 left-[60%] w-2.5 h-2.5 rounded-full bg-purple-300" />
          <div className="dot-float-slow absolute top-8 left-[75%] w-2 h-2 rounded-full bg-pink-500" />
          <div className="dot-float-reverse absolute top-28 left-[88%] w-1.5 h-1.5 rounded-full bg-purple-500" />
          <div className="dot-float absolute bottom-20 left-[15%] w-2 h-2 rounded-full bg-purple-400" />
          <div className="dot-float-slow absolute bottom-12 left-[40%] w-3 h-3 rounded-full bg-pink-400" />
          <div className="dot-float-reverse absolute bottom-24 left-[70%] w-2 h-2 rounded-full bg-purple-300" />
          <div className="dot-float absolute bottom-8 left-[90%] w-1.5 h-1.5 rounded-full bg-pink-300" />
          {/* Gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-purple-200 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            Blog Andromeda LMS
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Tudo sobre <span className="text-gradient-andromeda">educacao online</span>
            <br className="hidden sm:block" /> para escolas e professores
          </h1>
          <p className="text-purple-200/80 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Estrategias, tecnologia e tendencias para quem quer criar, vender e escalar cursos online com qualidade.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="#artigos"
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors text-sm"
            >
              Ver artigos
            </a>
            <a
              href="https://www.andromedalms.com/criar-escola"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-pink-500/20 text-sm"
            >
              Criar escola gratis
            </a>
          </div>
        </div>
      </section>

      {/* Featured article */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-10 mb-12">
        {featured && <ArticleCard post={featured} featured />}
      </div>

      {/* Articles grid */}
      <div id="artigos" className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        {rest.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-5">
              Artigos recentes
            </h2>
            <CategoryFilter posts={rest} categories={categories} />
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 relative overflow-hidden rounded-2xl">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="dot-float absolute top-6 left-[15%] w-2 h-2 rounded-full bg-white/30" />
            <div className="dot-float-slow absolute top-10 left-[50%] w-3 h-3 rounded-full bg-white/20" />
            <div className="dot-float-reverse absolute bottom-8 left-[75%] w-2 h-2 rounded-full bg-white/25" />
          </div>
          {/* Content */}
          <div className="relative p-8 sm:p-12 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Pronto para criar sua escola online?
            </h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto text-sm sm:text-base">
              Comece gratis, sem cartao de credito. Configure em menos de 10 minutos.
            </p>
            <a
              href="https://www.andromedalms.com/criar-escola"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-xl hover:bg-purple-50 transition-colors shadow-lg shadow-purple-900/20 text-sm sm:text-base"
            >
              Criar escola gratis
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
