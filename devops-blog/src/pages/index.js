import * as React from 'react';
import '../styles/global.css';
import Layout from '../components/layout';
import Hero from '../components/hero';
import FeaturedPosts from '../components/featured-posts';
import Categories from '../components/categories';
import RecentPosts from '../components/recent-posts';
import Newsletter from '../components/newsletter';

const IndexPage = () => {
  return (
    <Layout pageTitle="DevOps Pulse — Real-World DevOps Engineering">
      <Hero />
      <FeaturedPosts />
      <Categories />
      <RecentPosts />
      <Newsletter />
    </Layout>
  );
};

export const Head = () => (
  <>
    <title>DevOps Pulse — Real-World DevOps Engineering</title>
    <meta
      name="description"
      content="Deep-dive articles on Kubernetes, CI/CD pipelines, Terraform, Docker, AWS, and modern platform engineering."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content="DevOps Pulse — Real-World DevOps Engineering" />
    <meta
      property="og:description"
      content="Practical DevOps tutorials and articles for engineers."
    />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  </>
);

export default IndexPage;
