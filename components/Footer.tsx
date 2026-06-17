import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-purple-100 bg-gradient-to-b from-white to-purple-50/50 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
          <span className="text-sm text-slate-600">
            © {new Date().getFullYear()} Andromeda LMS
          </span>
        </div>

        <nav className="flex items-center gap-5 text-sm text-slate-500">
          <a
            href="https://www.andromedalms.com/andromeda"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 transition-colors"
          >
            Plataforma
          </a>
          <a
            href="https://www.andromedalms.com/criar-escola"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 transition-colors"
          >
            Criar escola
          </a>
          <Link href="/sitemap.xml" className="hover:text-pink-600 transition-colors">
            Sitemap
          </Link>
        </nav>
      </div>
    </footer>
  );
}
