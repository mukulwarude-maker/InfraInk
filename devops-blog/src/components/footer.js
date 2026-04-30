import * as React from 'react';

const footerLinks = {
  Topics: [
    { label: 'Kubernetes', href: '/category/kubernetes' },
    { label: 'Docker', href: '/category/docker' },
    { label: 'CI/CD', href: '/category/ci-cd' },
    { label: 'Terraform', href: '/category/terraform' },
    { label: 'AWS', href: '/category/aws' },
    { label: 'Monitoring', href: '/category/monitoring' },
  ],
  Resources: [
    { label: 'All Posts', href: '/blog' },
    { label: 'Newsletter', href: '/#newsletter' },
    { label: 'Tags', href: '/tags' },
    { label: 'RSS Feed', href: '/rss.xml' },
  ],
  Connect: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Twitter / X', href: 'https://x.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-terminal-600 flex items-center justify-center border border-terminal-500/50">
                <span className="text-white font-mono font-bold text-sm">{'>'}</span>
              </div>
              <span className="text-slate-50 font-display font-semibold text-base">
                DevOps Pulse
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Real-world DevOps articles for engineers who want to ship better infrastructure.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-600">
              <span className="glow-dot w-1.5 h-1.5" />
              New post every Tuesday
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 font-mono">
            © {currentYear} DevOps Pulse. Built with Gatsby + Tailwind CSS + GSAP.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/privacy"
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/rss.xml"
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-neon-orange transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.64a2.18 2.18 0 012.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 012.18-2.18M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 006.18 7.27V4.44M4 10.1A9.9 9.9 0 0113.9 20H11.1A7.09 7.09 0 004 12.9V10.1z" />
              </svg>
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
