import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Newsletter = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
      );

      tl.fromTo(
        formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');

      gsap.fromTo(
        formRef.current.querySelector('[data-success]'),
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }
      );
    }, 1200);
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="relative py-24 border-b border-slate-800 overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(88, 166, 255, 0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div ref={contentRef} className="opacity-0">
          <div className="section-label justify-center mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Newsletter
          </div>

          <h2 className="section-title mb-4">
            DevOps delivered to your inbox
          </h2>

          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg mx-auto">
            One email a week. Deep-dive articles, practical tutorials, and curated tools for
            DevOps and platform engineers. No spam, unsubscribe anytime.
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex -space-x-2">
              {['K', 'A', 'R', 'S'].map((initial, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-300"
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 font-mono">
              Join <span className="text-slate-300">4,200+</span> subscribers
            </p>
          </div>
        </div>

        {/* Form */}
        <div ref={formRef} className="opacity-0">
          {status === 'success' ? (
            <div
              data-success
              className="flex flex-col items-center gap-3 py-6"
            >
              <div className="w-12 h-12 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-slate-200 font-medium">You're subscribed!</p>
              <p className="text-sm text-slate-500">Check your inbox for a confirmation email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-terminal-500 focus:ring-1 focus:ring-terminal-500/50 transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary justify-center sm:justify-start whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe Free
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
          <p className="text-xs text-slate-600 font-mono mt-3">
            No spam · Unsubscribe anytime · Privacy respected
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
