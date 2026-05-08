import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-semibold text-slate-900 text-sm">Andromeda LMS</span>
            <span className="text-xs text-slate-500">Blog</span>
          </div>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Artigos
          </Link>
          <Link href="/categoria/cursos" className="hover:text-blue-600 transition-colors">
            Cursos
          </Link>
          <Link href="/categoria/tecnologia" className="hover:text-blue-600 transition-colors">
            Tecnologia
          </Link>
        </nav>

        <a
          href="https://www.andromedalms.com/criar-escola"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Criar escola grátis
        </a>
      </div>
    </header>
  );
}
