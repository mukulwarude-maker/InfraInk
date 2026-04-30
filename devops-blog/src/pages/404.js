import * as React from 'react';
import { Link } from 'gatsby';
import '../styles/global.css';
import Layout from '../components/layout';

const NotFoundPage = () => {
  return (
    <Layout pageTitle="404 — Page Not Found">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="font-mono text-8xl font-bold text-slate-800 mb-4">404</div>
          <div className="font-mono text-neon-green text-sm mb-6">
            <span className="text-slate-500">$ </span>
            ls -la /page/not/found
            <br />
            <span className="text-neon-orange">Error: No such file or directory</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-slate-100 mb-3">
            Page not found
          </h1>
          <p className="text-slate-400 text-sm mb-8">
            The page you're looking for has been moved, renamed, or doesn't exist.
          </p>
          <Link to="/" className="btn-primary justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export const Head = () => <title>404 — DevOps Pulse</title>;

export default NotFoundPage;
