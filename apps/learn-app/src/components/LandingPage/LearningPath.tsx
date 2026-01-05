import React from 'react';
import styles from './styles.module.css';

interface PathStep {
  part: number;
  title: string;
  chapters: string;
  description: string;
}

const pathSteps: PathStep[] = [
  {
    part: 1,
    title: 'Foundations of Physical AI',
    chapters: 'Chapters 1-4',
    description: 'Understanding the transition from digital to embodied intelligence',
  },
  {
    part: 2,
    title: 'ROS 2 Fundamentals',
    chapters: 'Chapters 5-9',
    description: 'Master the Robot Operating System for distributed robotics',
  },
  {
    part: 3,
    title: 'Simulation',
    chapters: 'Chapters 10-13',
    description: 'Virtual environments with Gazebo and Unity',
  },
  {
    part: 4,
    title: 'NVIDIA Isaac Platform',
    chapters: 'Chapters 14-18',
    description: 'Advanced simulation, RL training, and behavior trees',
  },
  {
    part: 5,
    title: 'Humanoid Development',
    chapters: 'Chapters 19-22',
    description: 'Bipedal locomotion, balance, and manipulation',
  },
  {
    part: 6,
    title: 'Vision-Language-Action',
    chapters: 'Chapters 23-25',
    description: 'Multimodal models for robot learning',
  },
  {
    part: 7,
    title: 'Capstone Project',
    chapters: 'Chapter 26',
    description: 'Build an integrated humanoid assistant',
  },
];

export default function LearningPath(): JSX.Element {
  return (
    <section className={styles.learningPath}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Your Learning Journey</h2>
        <p className={styles.sectionSubtitle}>
          26 chapters organized into 7 progressive parts
        </p>
        <div className={styles.pathContainer}>
          {pathSteps.map((step, idx) => (
            <div key={idx} className={styles.pathStep}>
              <div className={styles.pathNumber}>Part {step.part}</div>
              <div className={styles.pathContent}>
                <h3 className={styles.pathTitle}>{step.title}</h3>
                <p className={styles.pathChapters}>{step.chapters}</p>
                <p className={styles.pathDescription}>{step.description}</p>
              </div>
              {idx < pathSteps.length - 1 && (
                <div className={styles.pathArrow}>↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
