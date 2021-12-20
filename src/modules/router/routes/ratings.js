import { Authenticated } from "../middleware";

export default [
  {
    name: 'ratings.home',
    path: '',
    component: () => import('@/views/Home'),
    meta: {title: 'Home'}
  },
  {
    name: 'ratings.profile',
    path: 'profile',
    component: () => import('@/views/Profile'),
    meta: {title: 'Profile', middleware: [Authenticated]}
  },
  {
    name: 'ratings.avis.list',
    path: 'avis',
    component: () => import('@/views/avis/List'),
    meta: {title: 'Player list'}
  },
  {
    name: 'ratings.avis.view',
    path: 'avis/:id',
    props: true,
    component: () => import('@/views/avis/View'),
    meta: {title: 'Player View'}
  },
  {
    name: 'ratings.parties.list',
    path: 'parties',
    component: () => import('@/views/parties/List'),
    meta: {title: 'Party list'}
  },
  {
    name: 'ratings.special.one',
    path: 'special-one',
    component: () => import('@/views/buttons/SpecialOne'),
    meta: {title: 'Special Page 1'}
  },
  {
    name: 'ratings.special.one',
    path: 'special-two',
    component: () => import('@/views/buttons/SpecialTwo'),
    meta: {title: 'Special Page 2'}
  },
  {
    name: 'ratings.peepscreeps',
    path: 'peepscreeps',
    component: () => import('@/views/buttons/PeepsCreeps'),
    meta: {title: 'Peeps & Creeps'}
  },
  {
    name: 'ratings.claim',
    path: 'claim',
    component: () => import('@/views/buttons/Claim'),
    meta: {title: 'Claim Name'}
  },
  {
    name: 'ratings.info',
    path: 'info',
    component: () => import('@/views/buttons/Info'),
    meta: {title: 'Info'}
  },
  {
    name: 'ratings.contact',
    path: 'contact',
    component: () => import('@/views/buttons/Contact'),
    meta: {title: 'Message Us'}
  },
  {
    name: 'ratings.buttons',
    path: 'buttons',
    component: () => import('@/views/buttons/Buttons'),
    meta: {title: 'Buttons'}
  },
  {
    name: 'ratings.parties.view',
    path: 'parties/:id',
    component: () => import('@/views/parties/View'),
    meta: {title: 'Party View'},
    props: true
  },
  {
    name: 'ratings.parties.gallery',
    path: 'gallery/parties',
    component: () => import('@/views/parties/Gallery'),
    meta: {title: 'Parties Gallery'}
  },
  {
    name: 'ratings.avis.gallery',
    path: 'gallery/avis',
    component: () => import('@/views/avis/Gallery'),
    meta: {title: 'Avis Gallery'}
  },
  {
    name: 'ratings.notfound',
    path: '404',
    component: () => import('@/views/NotFound'),
    meta: {title: 'Not Found'}
  }
]