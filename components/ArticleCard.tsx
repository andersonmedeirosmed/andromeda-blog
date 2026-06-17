import Link from "next/link";
import Image from "next/image";
import { Post, formatDate } from "@/lib/types";

interface ArticleCardProps {
  post: Post;
  featured?: boolean;
}

export default function ArticleCard({ post, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link href={`/${post.slug}`} className="group block relative rounded-2xl overflow-hidden min-h-[360px] shadow-2xl shadow-purple-900/20">
        {post.image ? (
          <>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-900/50 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 to-pink-900" />
        )}
        <div className="relative p-8 flex flex-col justify-end h-full min-h-[360px]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium bg-pink-500/30 text-pink-200 px-3 py-1 rounded-full backdrop-blur-sm">
              {post.category}
            </span>
            <span className="text-xs font-medium bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full backdrop-blur-sm">
              Destaque
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-pink-200 transition-colors">
            {post.title}
          </h2>
          <p className="text-purple-200 text-base leading-relaxed mb-5 line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center gap-3 text-purple-300 text-sm">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col bg-white border border-purple-100 rounded-xl overflow-hidden hover:border-pink-300 hover:shadow-lg hover:shadow-pink-500/10 transition-all"
    >
      {post.image && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        <h3 className="text-base font-semibold text-slate-900 leading-snug mb-2 group-hover:text-purple-700 transition-colors line-clamp-2">
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
      </div>
    </Link>
  );
}
