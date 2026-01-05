import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'From Digital Intelligence to Embodied Robots',
  favicon: 'img/favicon.ico',

  // Production URL (update for GitHub Pages)
  url: 'https://your-username.github.io',
  baseUrl: '/robotics_book/',

  // GitHub pages deployment config
  organizationName: 'your-github-username',
  projectName: 'robotics_book',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/your-username/robotics_book/tree/main/apps/learn-app/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/book-cover.png',
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Physical AI Robot Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Read',
        },
        {
          href: 'https://mubeenf.com',
          label: 'mubeenf.com',
          position: 'right',
        },
        {
          href: 'https://github.com/your-username/robotics_book',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Preface',
              to: '/docs/preface',
            },
            {
              label: 'Chapter 1',
              to: '/docs/01-foundations/chapter-01',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'mubeenf.com',
              href: 'https://mubeenf.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/your-username/robotics_book',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Panaversity. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash', 'yaml', 'cmake'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
