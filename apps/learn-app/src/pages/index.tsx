import React from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/LandingPage/Hero';
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
        <ValueCards />
        <ComparisonTable />
        <LearningPath />
        <HardwareTiers />
        {/* ChatSection is now sticky and rendered via Root.tsx */}
      </main>
    </Layout>
  );
}
