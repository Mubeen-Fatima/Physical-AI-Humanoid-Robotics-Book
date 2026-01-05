import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Hero(): JSX.Element {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Physical AI & Humanoid Robotics
            </h1>
            <p className={styles.heroTagline}>
              From Digital Intelligence to Embodied Robots
            </p>
            <p className={styles.heroDescription}>
              Master the complete journey from traditional AI to embodied physical AI.
              Learn ROS 2, NVIDIA Isaac, simulation, and build real humanoid robots
              through 26 comprehensive chapters.
            </p>
            <div className={styles.heroButtons}>
              <Link
                className="button button--primary button--lg"
                to="/robotics_book/docs/preface">
                📖 Start Reading
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="https://mubeenf.com"
                target="_blank"
                rel="noopener noreferrer">
                🌐 mubeenf.com
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroSpotlight}>
              <img
                src="/robotics_book/img/hero-robot.svg"
                alt="Humanoid Robot - Physical AI & Robotics"
                className={styles.bookCover}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
