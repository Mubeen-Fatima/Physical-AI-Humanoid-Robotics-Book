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
        // 'ros2/chapter-06',
        // 'ros2/chapter-07',
        // 'ros2/chapter-08',
        // 'ros2/chapter-09',
      ],
    },
    // Uncomment as chapters are added:
    // {
    //   type: 'category',
    //   label: 'Part 3: Simulation',
    //   collapsed: true,
    //   items: [
    //     '03-simulation/chapter-10',
    //     '03-simulation/chapter-11',
    //     '03-simulation/chapter-12',
    //     '03-simulation/chapter-13',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Part 4: NVIDIA Isaac',
    //   collapsed: true,
    //   items: [
    //     '04-isaac/chapter-14',
    //     '04-isaac/chapter-15',
    //     '04-isaac/chapter-16',
    //     '04-isaac/chapter-17',
    //     '04-isaac/chapter-18',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Part 5: Humanoid Development',
    //   collapsed: true,
    //   items: [
    //     '05-humanoid/chapter-19',
    //     '05-humanoid/chapter-20',
    //     '05-humanoid/chapter-21',
    //     '05-humanoid/chapter-22',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Part 6: Vision-Language-Action Models',
    //   collapsed: true,
    //   items: [
    //     '06-vla/chapter-23',
    //     '06-vla/chapter-24',
    //     '06-vla/chapter-25',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Part 7: Capstone Project',
    //   collapsed: true,
    //   items: [
    //     '07-capstone/chapter-26',
    //   ],
    // },
  ],
};

export default sidebars;
