import React, { useState } from 'react';
import styles from './Book3D.module.css';

interface Book3DProps {
  coverImage: string;
  title: string;
  alt: string;
}

export default function Book3D({ coverImage, title, alt }: Book3DProps): JSX.Element {
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
    <div className={styles.booksSection}>
      <h2 className={styles.booksHeading}>Featured Textbook</h2>

      <div
        className={styles.bookWrapper}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={styles.book}
          style={{
            '--rotate-x': `${rotation.x}deg`,
            '--rotate-y': `${rotation.y}deg`,
          } as React.CSSProperties}
        >
          {/* Front Cover */}
          <div className={styles.cover}>
            <img
              src={coverImage}
              alt={alt}
              className={styles.coverImg}
            />
            <div className={styles.sheen}></div>
            <div className={styles.spineShadow}></div>
          </div>

          {/* Back Cover */}
          <div className={styles.back}></div>

          {/* Spine (left edge) */}
          <div className={styles.left}></div>

          {/* Right edge */}
          <div className={styles.right}></div>

          {/* Top edge */}
          <div className={styles.top}></div>

          {/* Bottom edge */}
          <div className={styles.bottom}></div>
        </div>
      </div>

      <p className={styles.bookTitle}>{title}</p>
    </div>
  );
}
