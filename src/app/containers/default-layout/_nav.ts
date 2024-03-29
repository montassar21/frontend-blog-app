import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: 'dashboards',
    iconComponent: { name: 'cil-speedometer' },
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'someAnchor' },
  //   iconComponent: { name: 'cil-pencil' }
  // },

  {
    name: 'See new posts',
    url: 'posts',
    iconComponent: { name: 'cil-drop' },
  },
  //  {
  //   name:'Suppliers',
  //   url:'suppliers',
  //   iconComponent: { name: 'cilUserFollow' },

  // },
  //   {
  //   name:'Deliverers',
  //   url:'deliverers',
  //   iconComponent: { name: 'cilPeople' },

  // },
  {
    name: 'Your Posts',
    url: 'posts',
    iconComponent: { name: 'cil-file' },
    children: [
      {
        name: 'Manage Posts',
        url: 'manage-posts',
      },
    ],
  },
];
