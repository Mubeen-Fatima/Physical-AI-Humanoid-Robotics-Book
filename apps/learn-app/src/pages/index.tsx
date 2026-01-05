import React from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/LandingPage/Hero';
import Book3D from '@site/src/components/LandingPage/Book3D';
import ValueCards from '@site/src/components/LandingPage/ValueCards';
import ComparisonTable from '@site/src/components/LandingPage/ComparisonTable';
import LearningPath from '@site/src/components/LandingPage/LearningPath';
import HardwareTiers from '@site/src/components/LandingPage/HardwareTiers';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="From Digital Intelligence to Embodied Robots - Master ROS 2, NVIDIA Isaac, and build humanoid robots">
      <main>
        <Hero />
        <Book3D
          coverImage="/robotics_book/img/book-cover-page.svg"
          title="Physical AI & Humanoid Robotics"
          alt="Physical AI & Humanoid Robotics Book Cover"
        />
        <ValueCards />
        <ComparisonTable />
        <LearningPath />
        <HardwareTiers />
      </main>
    </Layout>
  );
}
