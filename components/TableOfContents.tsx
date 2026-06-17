"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/lib/types";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "0px 0px -60% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="rounded-xl border border-purple-100 bg-gradient-to-b from-purple-50/50 to-white p-4">
        <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-gradient-to-b from-pink-500 to-purple-500" />
          Indice
        </p>
        <ul className="space-y-0.5">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block text-[13px] leading-snug transition-all py-1.5 px-2 rounded-lg ${
                  level === 3 ? "pl-5" : ""
                } ${
                  active === id
                    ? "text-pink-600 font-medium bg-pink-50"
                    : "text-slate-500 hover:text-purple-700 hover:bg-purple-50/50"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
