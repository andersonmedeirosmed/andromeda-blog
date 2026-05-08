import Link from "next/link";
import { Post, formatDate } from "@/lib/posts";

interface ArticleCardProps {
  post: Post;
  featured?: boolean;
}

export default function ArticleCard({ post, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link
        href={`/${post.slug}`}
        className="group block bg-gradient-to-br from-blue-950 to-blue-800 rounded-2xl p-8 text-white hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-blue-300 text-xs">Destaque</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-3 group-hover:text-blue-200 transition-colors">
          {post.title}
        </h2>
        <p className="text-blue-200 text-base leading-relaxed mb-6 line-clamp-3">
          {post.description}
        </p>
        <div className="flex items-center gap-3 text-blue-300 text-sm">
          <span>{post.author}</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all"
    >
      <div className="mb-3">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          {post.category}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
        {post.description}
      </p>
      <div className="flex items-center gap-2 text-slate-400 text-xs mt-auto">
        <span>{formatDate(post.date)}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
    </Link>
  );
}
