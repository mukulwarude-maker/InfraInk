import * as React from 'react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TerminalLine = ({ children, delay = 0 }) => (
  <div
    className="font-mono text-sm text-slate-400 opacity-0"
    style={{ '--delay': `${delay}s` }}
    data-terminal-line
  >
    <span className="text-neon-green mr-2">$</span>
    {children}
  </div>
);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const terminalRef = useRef(null);
  const badgeRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Badge entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );

      // Title word-by-word stagger
      tl.fromTo(
        titleRef.current.querySelectorAll('.word'),
        { opacity: 0, y: 40, skewY: 3 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.2'
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 16, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.4)',
        },
        '-=0.2'
      );

      // Stats
      tl.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.2'
      );

      // Terminal lines
      const lines = terminalRef.current.querySelectorAll('[data-terminal-line]');
      tl.fromTo(
        lines,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.15,
          ease: 'power2.out',
        },
        '-=0.5'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ['Real-World', 'DevOps', 'Engineering,', 'Written', 'Honestly.'];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" aria-hidden="true" />

      {/* Radial gradient bloom */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(88,166,255,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(188,140,255,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            {/* Badge */}
            <div ref={badgeRef} className="mb-6 opacity-0">
              <span className="terminal-badge border-neon-blue/30 text-neon-blue bg-neon-blue/5">
                <span className="glow-dot" />
                DevOps & Platform Engineering
              </span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-6"
            >
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  className={`word inline-block mr-[0.25em] opacity-0 ${
                    word.includes('DevOps') || word.includes('Engineering')
                      ? 'text-gradient'
                      : 'text-slate-50'
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg opacity-0"
            >
              Deep-dive articles on Kubernetes, CI/CD pipelines, Terraform, Docker, AWS, and
              modern platform engineering — with working code examples you can actually use.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-3 mb-12">
              <a href="#featured" className="btn-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Read the Blog
              </a>
              <a href="#newsletter" className="btn-secondary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Subscribe Free
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-8">
              {[
                { value: '60+', label: 'Articles' },
                { value: '4.2k', label: 'Subscribers' },
                { value: '12', label: 'Categories' },
              ].map((stat) => (
                <div key={stat.label} className="opacity-0">
                  <div className="text-2xl font-display font-bold text-slate-50">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — terminal widget */}
          <div
            ref={terminalRef}
            className="hidden lg:block bg-slate-800/60 rounded-2xl border border-slate-700/60 overflow-hidden backdrop-blur-sm shadow-card"
          >
            {/* Terminal titlebar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/60 bg-slate-800/80">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-slate-500 font-mono text-xs">bash — devops-pulse</span>
            </div>

            {/* Terminal body */}
            <div className="p-6 space-y-3">
              <TerminalLine delay={0}>kubectl get pods -n production</TerminalLine>
              <div className="font-mono text-xs text-slate-500 pl-4 space-y-1" data-terminal-line>
                <div>NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; READY &nbsp; STATUS &nbsp;&nbsp;&nbsp; RESTARTS</div>
                <div className="text-neon-green">api-deployment-7d6f8b &nbsp;&nbsp; 3/3 &nbsp;&nbsp;&nbsp; Running &nbsp;&nbsp; 0</div>
                <div className="text-neon-green">web-deployment-9c4e2a &nbsp;&nbsp; 2/2 &nbsp;&nbsp;&nbsp; Running &nbsp;&nbsp; 0</div>
                <div className="text-neon-green">worker-6f8d9b-x7k2m &nbsp;&nbsp;&nbsp; 1/1 &nbsp;&nbsp;&nbsp; Running &nbsp;&nbsp; 0</div>
              </div>
              <TerminalLine delay={0.6}>terraform plan -out=tfplan</TerminalLine>
              <div className="font-mono text-xs text-slate-500 pl-4" data-terminal-line>
                <span className="text-neon-green">Plan:</span> 3 to add, 1 to change, 0 to destroy.
              </div>
              <TerminalLine delay={1.0}>docker build -t api:latest --no-cache .</TerminalLine>
              <div className="font-mono text-xs text-slate-500 pl-4" data-terminal-line>
                <span className="text-neon-green">✓</span> Successfully built{' '}
                <span className="text-neon-blue">a3f7c9e1b2d4</span>
              </div>
              <TerminalLine delay={1.4}>
                <span className="text-neon-purple">gh workflow run deploy.yml</span>
              </TerminalLine>
              <div className="font-mono text-xs text-slate-500 pl-4 flex items-center gap-2" data-terminal-line>
                <span className="glow-dot w-1.5 h-1.5 flex-shrink-0" />
                <span className="text-slate-400">Pipeline running...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <svg
          className="w-4 h-4 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
