import React from 'react';
import styles from './styles.module.css';

interface ValueCard {
  title: string;
  icon: string;
  description: string;
  highlights: string[];
}

const cards: ValueCard[] = [
  {
    title: 'ROS 2 Fundamentals',
    icon: '🔧',
    description: 'Master the Robot Operating System 2',
    highlights: [
      'Nodes, Topics, Services, Actions',
      'Message passing and communication',
      'Real-world robot control',
    ],
  },
  {
    title: 'Simulation Mastery',
    icon: '🌐',
    description: 'Virtual environments for safe development',
    highlights: [
      'Gazebo & Unity integration',
      'Physics-based simulation',
      'Test before deploying to hardware',
    ],
  },
  {
    title: 'NVIDIA Isaac AI',
    icon: '🚀',
    description: 'Advanced robotics simulation and AI',
    highlights: [
      'Isaac Sim photorealistic rendering',
      'Isaac Gym for RL training',
      'Isaac Cortex behavior trees',
    ],
  },
  {
    title: 'Humanoid Robots',
    icon: '🦾',
    description: 'Build bipedal robots from scratch',
    highlights: [
      'Bipedal locomotion and balance',
      'Manipulation and grasping',
      'Vision-Language-Action models',
    ],
  },
];

export default function ValueCards(): JSX.Element {
  return (
    <section className={styles.valueCards}>
      <div className="container">
        <h2 className={styles.sectionTitle}>What You'll Learn</h2>
        <div className={styles.cardsGrid}>
          {cards.map((card, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardIcon}>{card.icon}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              <ul className={styles.cardHighlights}>
                {card.highlights.map((highlight, i) => (
                  <li key={i}>✓ {highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
