import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/__docusaurus/debug',
    component: ComponentCreator('/docs/__docusaurus/debug', 'e58'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/config',
    component: ComponentCreator('/docs/__docusaurus/debug/config', '2ce'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/content',
    component: ComponentCreator('/docs/__docusaurus/debug/content', '11b'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/docs/__docusaurus/debug/globalData', 'f13'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/docs/__docusaurus/debug/metadata', 'bff'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/registry',
    component: ComponentCreator('/docs/__docusaurus/debug/registry', '830'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/routes',
    component: ComponentCreator('/docs/__docusaurus/debug/routes', '13e'),
    exact: true
  },
  {
    path: '/docs/',
    component: ComponentCreator('/docs/', 'd18'),
    routes: [
      {
        path: '/docs/next',
        component: ComponentCreator('/docs/next', '86e'),
        routes: [
          {
            path: '/docs/next',
            component: ComponentCreator('/docs/next', '732'),
            routes: [
              {
                path: '/docs/next/',
                component: ComponentCreator('/docs/next/', 'cd6'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/extractors/gradcracker',
                component: ComponentCreator('/docs/next/extractors/gradcracker', '65d'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/extractors/jobspy',
                component: ComponentCreator('/docs/next/extractors/jobspy', 'db9'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/extractors/manual',
                component: ComponentCreator('/docs/next/extractors/manual', '5fd'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/extractors/overview',
                component: ComponentCreator('/docs/next/extractors/overview', '0d7'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/extractors/ukvisajobs',
                component: ComponentCreator('/docs/next/extractors/ukvisajobs', '8b3'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/features/ghostwriter',
                component: ComponentCreator('/docs/next/features/ghostwriter', '0cf'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/features/orchestrator',
                component: ComponentCreator('/docs/next/features/orchestrator', '299'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/features/post-application-tracking',
                component: ComponentCreator('/docs/next/features/post-application-tracking', 'f32'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/getting-started/self-hosting',
                component: ComponentCreator('/docs/next/getting-started/self-hosting', '6cb'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/reference/documentation-style-guide',
                component: ComponentCreator('/docs/next/reference/documentation-style-guide', '32c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/reference/faq',
                component: ComponentCreator('/docs/next/reference/faq', '3d6'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/next/troubleshooting/common-problems',
                component: ComponentCreator('/docs/next/troubleshooting/common-problems', 'e34'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      },
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', '2b9'),
        routes: [
          {
            path: '/docs/',
            component: ComponentCreator('/docs/', '25b'),
            routes: [
              {
                path: '/docs/extractors/gradcracker',
                component: ComponentCreator('/docs/extractors/gradcracker', 'de4'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/extractors/jobspy',
                component: ComponentCreator('/docs/extractors/jobspy', '3b4'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/extractors/manual',
                component: ComponentCreator('/docs/extractors/manual', '77c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/extractors/overview',
                component: ComponentCreator('/docs/extractors/overview', 'b46'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/extractors/ukvisajobs',
                component: ComponentCreator('/docs/extractors/ukvisajobs', '3ff'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/features/ghostwriter',
                component: ComponentCreator('/docs/features/ghostwriter', '6a0'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/features/orchestrator',
                component: ComponentCreator('/docs/features/orchestrator', '19c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/features/post-application-tracking',
                component: ComponentCreator('/docs/features/post-application-tracking', '385'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/getting-started/self-hosting',
                component: ComponentCreator('/docs/getting-started/self-hosting', 'e3c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/reference/documentation-style-guide',
                component: ComponentCreator('/docs/reference/documentation-style-guide', '68e'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/reference/faq',
                component: ComponentCreator('/docs/reference/faq', 'd50'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/troubleshooting/common-problems',
                component: ComponentCreator('/docs/troubleshooting/common-problems', 'b1f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', 'cb8'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
