import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import bookStyles from './Book3D.module.css';

export default function Hero(): JSX.Element {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

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
            <div
              className={bookStyles.bookWrapper}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ margin: 0 }}
            >
              <div
                className={bookStyles.book}
                style={{
                  '--rotate-x': `${rotation.x}deg`,
                  '--rotate-y': `${rotation.y}deg`,
                } as React.CSSProperties}
              >
                {/* Front Cover */}
                <div className={bookStyles.cover}>
                  <img
                    src="/robotics_book/img/book-cover-page.svg"
                    alt="Physical AI & Humanoid Robotics Book Cover"
                    className={bookStyles.coverImg}
                  />
                  <div className={bookStyles.sheen}></div>
                  <div className={bookStyles.spineShadow}></div>
                </div>

                {/* Back Cover */}
                <div className={bookStyles.back}></div>

                {/* Spine (left edge) */}
                <div className={bookStyles.left}></div>

                {/* Right edge */}
                <div className={bookStyles.right}></div>

                {/* Top edge */}
                <div className={bookStyles.top}></div>

                {/* Bottom edge */}
                <div className={bookStyles.bottom}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
