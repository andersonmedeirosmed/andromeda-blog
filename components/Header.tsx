import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-purple-100 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-pink-500/20">
            A
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-semibold text-slate-900 text-sm">Andromeda LMS</span>
            <span className="text-xs text-purple-500">Blog</span>
          </div>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-pink-600 transition-colors">
            Artigos
          </Link>
          <Link href="/categoria/educacao" className="hover:text-pink-600 transition-colors">
            Educação
          </Link>
          <Link href="/categoria/tecnologia" className="hover:text-pink-600 transition-colors">
            Tecnologia
          </Link>
          <Link href="/categoria/negocios" className="hover:text-pink-600 transition-colors">
            Negócios
          </Link>
        </nav>

        <a
          href="https://www.andromedalms.com/criar-escola"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30"
        >
          Criar escola grátis
        </a>
      </div>
    </header>
  );
}
