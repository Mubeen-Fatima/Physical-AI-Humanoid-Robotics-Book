import React from 'react';
import styles from './styles.module.css';

interface ComparisonRow {
  aspect: string;
  digitalAI: string;
  physicalAI: string;
}

const comparisons: ComparisonRow[] = [
  {
    aspect: 'Environment',
    digitalAI: 'Virtual (cloud, servers)',
    physicalAI: 'Real world (physical space)',
  },
  {
    aspect: 'Interaction',
    digitalAI: 'Text, images, audio',
    physicalAI: 'Sensors, actuators, manipulation',
  },
  {
    aspect: 'Learning',
    digitalAI: 'Supervised, unsupervised',
    physicalAI: 'Embodied, reinforcement learning',
  },
  {
    aspect: 'Constraints',
    digitalAI: 'Compute, data availability',
    physicalAI: 'Physics, safety, real-time',
  },
  {
    aspect: 'Output',
    digitalAI: 'Predictions, text, images',
    physicalAI: 'Physical actions, movements',
  },
  {
    aspect: 'Examples',
    digitalAI: 'ChatGPT, DALL-E, AlphaGo',
    physicalAI: 'Humanoid robots, autonomous vehicles',
  },
];

export default function ComparisonTable(): JSX.Element {
  return (
    <section className={styles.comparison}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Digital AI vs Physical AI</h2>
        <p className={styles.sectionSubtitle}>
          Understand the paradigm shift from virtual to embodied intelligence
        </p>
        <div className={styles.tableWrapper}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Aspect</th>
                <th>💻 Digital AI</th>
                <th>🤖 Physical AI</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx}>
                  <td className={styles.aspectCell}>{row.aspect}</td>
                  <td>{row.digitalAI}</td>
                  <td className={styles.highlightCell}>{row.physicalAI}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
