import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface HardwareTier {
  name: string;
  price: string;
  specs: {
    cpu: string;
    ram: string;
    gpu: string;
  };
  recommended: string;
  link: string;
}

const tiers: HardwareTier[] = [
  {
    name: 'Economy Tier',
    price: '~$700',
    specs: {
      cpu: 'Intel i5 / AMD Ryzen 5',
      ram: '16GB DDR4',
      gpu: 'Integrated / GTX 1650',
    },
    recommended: 'For basic simulation and learning',
    link: 'https://pcpartpicker.com/guide/TydnTW/entry-level-amd-gaming-build',
  },
  {
    name: 'Standard Tier',
    price: '~$2000',
    specs: {
      cpu: 'Intel i7 / AMD Ryzen 7',
      ram: '32GB DDR4/DDR5',
      gpu: 'RTX 3060 Ti / RTX 4060',
    },
    recommended: 'Ideal for Isaac Sim and RL training',
    link: 'https://pcpartpicker.com/guide/',
  },
  {
    name: 'Cloud Tier',
    price: 'Pay-as-you-go',
    specs: {
      cpu: 'Variable (AWS, GCP, Azure)',
      ram: 'Variable (16-64GB)',
      gpu: 'A100, V100, T4 instances',
    },
    recommended: 'For on-demand GPU access',
    link: 'https://cloud.google.com/compute/docs/gpus',
  },
];

export default function HardwareTiers(): JSX.Element {
  return (
    <section className={styles.hardwareTiers}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Hardware Options</h2>
        <p className={styles.sectionSubtitle}>
          Choose the setup that fits your budget and needs
        </p>
        <div className={styles.tiersGrid}>
          {tiers.map((tier, idx) => (
            <div key={idx} className={styles.tierCard}>
              <h3 className={styles.tierName}>{tier.name}</h3>
              <div className={styles.tierPrice}>{tier.price}</div>
              <div className={styles.tierSpecs}>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>CPU:</span>
                  <span>{tier.specs.cpu}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>RAM:</span>
                  <span>{tier.specs.ram}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>GPU:</span>
                  <span>{tier.specs.gpu}</span>
                </div>
              </div>
              <p className={styles.tierRecommended}>{tier.recommended}</p>
              <Link
                className="button button--outline button--primary button--sm"
                to={tier.link}
                target="_blank"
                rel="noopener noreferrer">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
        <p className={styles.tierNote}>
          💡 <strong>Note:</strong> You can start learning with any tier. Most simulations run on Economy hardware.
        </p>
      </div>
    </section>
  );
}
