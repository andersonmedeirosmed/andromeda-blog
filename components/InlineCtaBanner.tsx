export default function InlineCtaBanner() {
  return (
    <div className="not-prose my-10 relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="dot-float absolute top-4 left-[12%] w-2 h-2 rounded-full bg-white/20" />
        <div className="dot-float-slow absolute top-6 left-[45%] w-2.5 h-2.5 rounded-full bg-white/15" />
        <div className="dot-float-reverse absolute bottom-4 left-[70%] w-2 h-2 rounded-full bg-white/20" />
        <div className="dot-float absolute bottom-6 left-[30%] w-1.5 h-1.5 rounded-full bg-white/25" />
      </div>
      <div className="relative px-6 py-6 sm:px-8 sm:py-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="flex-1 text-center sm:text-left">
          <p className="text-white font-bold text-base sm:text-lg leading-snug">
            Crie sua escola online com a Andromeda LMS
          </p>
          <p className="text-white/70 text-sm mt-1">
            Gratis para comecar. Sua marca, seus alunos, suas regras.
          </p>
        </div>
        <a
          href="https://www.andromedalms.com/criar-escola"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-white text-purple-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-purple-50 transition-colors shadow-lg shadow-purple-900/20 text-sm whitespace-nowrap"
        >
          Comecar gratis
        </a>
      </div>
    </div>
  );
}
