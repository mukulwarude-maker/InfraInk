import * as React from 'react';
import { Link } from 'gatsby';

const PostCard = ({ post, variant = 'default' }) => {
  const isLarge = variant === 'large';

  return (
    <article className={`post-card group ${isLarge ? 'col-span-full' : ''}`}>
      {/* Color accent bar */}
      <div
        className="h-0.5 w-full"
        style={{ background: post.categoryColor || '#58a6ff' }}
      />

      <div className={`p-6 ${isLarge ? 'sm:p-8' : ''}`}>
        {/* Category + meta row */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <span
            className="terminal-badge border-current/20 text-xs font-mono"
            style={{ color: post.categoryColor || '#58a6ff', borderColor: `${post.categoryColor}33` }}
          >
            <span className="mr-0.5">{post.emoji}</span>
            {post.category}
          </span>
          <div className="flex items-center gap-3 text-slate-500 text-xs font-mono">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-display font-semibold text-slate-100 group-hover:text-white transition-colors mb-3 leading-snug ${
            isLarge ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}
        >
          <Link to={post.slug} className="hover:underline decoration-slate-600">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p
          className={`text-slate-400 leading-relaxed mb-5 ${
            isLarge ? 'text-base' : 'text-sm line-clamp-3'
          }`}
        >
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="code-tag">
                #{tag}
              </span>
            ))}
          </div>
          <Link
            to={post.slug}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-neon-blue transition-colors group/link"
            aria-label={`Read ${post.title}`}
          >
            Read more
            <svg
              className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
