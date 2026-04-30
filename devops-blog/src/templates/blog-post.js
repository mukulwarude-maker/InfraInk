import * as React from 'react';
import { useEffect, useRef } from 'react';
import { graphql, Link } from 'gatsby';
import { gsap } from 'gsap';
import '../styles/global.css';
import Layout from '../components/layout';

const BlogPost = ({ data, pageContext }) => {
  const { markdownRemark } = data;
  const { frontmatter, html, timeToRead } = markdownRemark;
  const { previous, next } = pageContext;

  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        headerRef.current.querySelectorAll('[data-animate]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );

      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Layout>
      <article className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div data-animate className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-8 opacity-0">
            <Link to="/" className="hover:text-slate-300 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-slate-300 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-xs">{frontmatter.title}</span>
          </div>

          {/* Post header */}
          <header ref={headerRef} className="mb-12">
            {/* Category badge */}
            <div data-animate className="mb-4 opacity-0">
              <span
                className="terminal-badge border-current/20 text-sm"
                style={{
                  color: frontmatter.categoryColor || '#58a6ff',
                  borderColor: `${frontmatter.categoryColor || '#58a6ff'}33`,
                }}
              >
                {frontmatter.emoji} {frontmatter.category}
              </span>
            </div>

            {/* Title */}
            <h1
              data-animate
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-50 leading-tight mb-6 opacity-0"
            >
              {frontmatter.title}
            </h1>

            {/* Meta */}
            <div
              data-animate
              className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-mono mb-6 opacity-0"
            >
              <span>{frontmatter.date}</span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span>{frontmatter.readTime || `${timeToRead} min read`}</span>
              {frontmatter.author && (
                <>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span>by {frontmatter.author}</span>
                </>
              )}
            </div>

            {/* Tags */}
            {frontmatter.tags && (
              <div data-animate className="flex flex-wrap gap-2 opacity-0">
                {frontmatter.tags.map((tag) => (
                  <span key={tag} className="code-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="mt-8 h-px bg-slate-800" />
          </header>

          {/* Post body */}
          <div
            ref={contentRef}
            className="opacity-0 prose prose-invert prose-pre:p-0 prose-pre:bg-transparent max-w-none
              prose-headings:font-display prose-headings:text-slate-50 prose-headings:tracking-tight
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-neon-blue prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-100
              prose-code:text-neon-orange prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-blockquote:border-terminal-500 prose-blockquote:text-slate-400 prose-blockquote:bg-slate-800/40 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:rounded-r-lg
              prose-ul:text-slate-300 prose-ol:text-slate-300
              prose-hr:border-slate-800"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Post footer */}
          <div className="mt-16 pt-8 border-t border-slate-800">
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {previous && (
                <Link
                  to={previous.fields.slug}
                  className="group flex flex-col gap-1 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition-colors"
                >
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Previous
                  </span>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors line-clamp-2">
                    {previous.frontmatter.title}
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  to={next.fields.slug}
                  className={`group flex flex-col gap-1 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 transition-colors ${
                    !previous ? 'sm:col-start-2' : ''
                  }`}
                >
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1 justify-end">
                    Next
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors line-clamp-2 text-right">
                    {next.frontmatter.title}
                  </span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export const Head = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <>
      <title>{frontmatter.title} — DevOps Pulse</title>
      <meta name="description" content={frontmatter.excerpt || frontmatter.description} />
    </>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
        categoryColor
        emoji
        tags
        author
        readTime
        excerpt
      }
    }
  }
`;

export default BlogPost;
