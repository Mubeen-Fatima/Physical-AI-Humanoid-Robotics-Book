import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'preface',
    {
      type: 'category',
      label: 'Part 1: Foundations',
      collapsed: false,
      items: [
        'foundations/chapter-01',
        'foundations/chapter-02',
        'foundations/chapter-03',
        'foundations/chapter-04',
      ],
    },
    {
      type: 'category',
      label: 'Part 2: ROS 2 Fundamentals',
      collapsed: true,
      items: [
        'ros2/chapter-05',
        'ros2/chapter-06',
        'ros2/chapter-07',
        'ros2/chapter-08',
        'ros2/chapter-09',
      ],
    },
    {
      type: 'category',
      label: 'Part 3: Simulation',
      collapsed: true,
      items: [
        'simulation/chapter-10',
        'simulation/chapter-11',
        'simulation/chapter-12',
        'simulation/chapter-13',
      ],
    },
    {
      type: 'category',
      label: 'Part 4: NVIDIA Isaac',
      collapsed: true,
      items: [
        'isaac/chapter-14',
        'isaac/chapter-15',
        'isaac/chapter-16',
        'isaac/chapter-17',
        'isaac/chapter-18',
      ],
    },
    {
      type: 'category',
      label: 'Part 5: Humanoid Development',
      collapsed: true,
      items: [
        'humanoid/chapter-19',
        'humanoid/chapter-20',
        'humanoid/chapter-21',
        'humanoid/chapter-22',
      ],
    },
    {
      type: 'category',
      label: 'Part 6: Vision-Language-Action Models',
      collapsed: true,
      items: [
        'vla/chapter-23',
        'vla/chapter-24',
        'vla/chapter-25',
      ],
    },
    {
      type: 'category',
      label: 'Part 7: Capstone Project',
      collapsed: true,
      items: [
        'capstone/chapter-26',
      ],
    },
  ],
};

export default sidebars;
