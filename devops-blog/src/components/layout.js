import * as React from 'react';
import { Link } from 'gatsby';
import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children, pageTitle }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
