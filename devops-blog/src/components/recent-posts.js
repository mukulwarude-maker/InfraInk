import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PostCard from './post-card';
import { recentPosts } from '../data/posts';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const POSTS_PER_PAGE = 6;

const RecentPosts = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      const cards = gridRef.current.querySelectorAll('.post-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const visiblePosts = recentPosts.slice(0, visibleCount);

  return (
    <section id="recent" ref={sectionRef} className="relative py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="section-label">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Latest
            </div>
            <h2 className="section-title">Recent Posts</h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="glow-dot" />
            Updated weekly
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10"
        >
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load more */}
        {visibleCount < recentPosts.length && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
              className="btn-secondary gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Load more posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentPosts;
