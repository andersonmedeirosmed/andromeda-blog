"use client";

import { useState } from "react";
import ArticleCard from "./ArticleCard";
import { Post } from "@/lib/types";

interface Props {
  posts: Post[];
  categories: string[];
}

export default function CategoryFilter({ posts, categories }: Props) {
  const [active, setActive] = useState("Todos");

  const filtered =
    active === "Todos" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="flex gap-2 flex-wrap mb-6">
        {["Todos", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === cat
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-400 text-sm">Nenhum artigo nesta categoria.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
