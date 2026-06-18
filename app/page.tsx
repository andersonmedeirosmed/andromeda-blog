import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { formatDate } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";

export default function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const top1 = posts[0];
  const top2 = posts.slice(1, 4);
  const rest = posts.slice(4);

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
            Tudo sobre <span className="text-gradient-andromeda">educação online</span>
            <br className="hidden sm:block" /> para escolas e professores
          </h1>
          <p className="text-purple-200/80 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Estratégias, tecnologia e tendências para quem quer criar, vender e escalar cursos online com qualidade.
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
              Criar escola grátis
            </a>
          </div>
        </div>
      </section>

      {/* Featured Section: top 4 articles */}
      {top1 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-5">Mais lidos</h2>
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Left: main featured */}
            <Link href={`/${top1.slug}`} className="group relative block rounded-2xl overflow-hidden min-h-[380px] shadow-lg">
              {top1.image ? (
                <>
                  <Image src={top1.image} alt={top1.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-900/50 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950 to-pink-900" />
              )}
              <div className="relative p-6 sm:p-8 flex flex-col justify-end h-full min-h-[380px]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium bg-pink-500/30 text-pink-200 px-3 py-1 rounded-full backdrop-blur-sm">{top1.category}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2 group-hover:text-pink-200 transition-colors">{top1.title}</h3>
                <p className="text-purple-200 text-sm leading-relaxed line-clamp-2 mb-3">{top1.description}</p>
                <div className="flex items-center gap-2 text-purple-300 text-xs">
                  <span>{top1.author}</span>
                  <span>·</span>
                  <span>{formatDate(top1.date)}</span>
                  <span>·</span>
                  <span>{top1.readingTime}</span>
                </div>
              </div>
            </Link>

            {/* Right: 2nd, 3rd, 4th */}
            <div className="flex flex-col gap-4">
              {top2.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${post.slug}`}
                  className="group flex gap-4 bg-white border border-purple-100 rounded-xl overflow-hidden hover:border-pink-300 hover:shadow-md transition-all"
                >
                  {post.image && (
                    <div className="relative w-32 sm:w-40 shrink-0 overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 py-3 pr-4">
                    <span className="text-[10px] font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">{post.category}</span>
                    <h4 className="text-sm font-semibold text-slate-900 leading-snug mt-1.5 mb-1 group-hover:text-purple-700 transition-colors line-clamp-2">{post.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-1.5">{post.description}</p>
                    <div className="flex items-center gap-2 text-slate-400 text-[10px]">
                      <span>{formatDate(post.date)}</span>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles grid */}
      <div id="artigos" className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 pt-6">
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
              Comece grátis, sem cartão de crédito. Configure em menos de 10 minutos.
            </p>
            <a
              href="https://www.andromedalms.com/criar-escola"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-xl hover:bg-purple-50 transition-colors shadow-lg shadow-purple-900/20 text-sm sm:text-base"
            >
              Criar escola grátis
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
