import {Authenticated} from "../middleware";

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
    redirect: {name: 'ratings.profile.view'},
    component: () => import('@/layouts/profile'),
    meta: {title: 'Profile', middleware: [Authenticated]},
    children: [
      {
        name: 'ratings.profile.view',
        path: '',
        component: () => import('@/views/profile/View'),
        meta: {title: 'Profile View'}
      },
      {
        name: 'ratings.profile.edit',
        path: 'edit',
        component: () => import('@/views/profile/Edit'),
        meta: {title: 'Profile Edit'}
      },
      {
        name: 'ratings.profile.password',
        path: 'password',
        component: () => import('@/views/profile/PasswordChange'),
        meta: {title: 'Password Change'}
      },
      {
        name: 'ratings.profile.notifications',
        path: 'notifications',
        component: () => import('@/views/profile/Notifications'),
        meta: {title: 'Notifications'}
      }
    ]
  },
  // Avis
  {
    name: 'ratings.avis.list',
    path: 'avis',
    component: () => import('@/views/avis/List'),
    meta: {title: 'Players'}
  },
  {
    name: 'ratings.avis.gallery',
    path: 'avis/gallery',
    component: () => import('@/views/avis/Gallery'),
    meta: {title: 'Avis Gallery', middleware: [Authenticated]}
  },
  {
    name: 'ratings.avis.interviews',
    path: 'avis/interviews',
    component: () => import('@/views/avis/Interviews'),
    meta: {title: 'Avis Interviews', middleware: [Authenticated]}
  },
  {
    name: 'ratings.avis.view',
    path: 'avis/:id',
    props: true,
    component: () => import('@/views/avis/View'),
    meta: {title: 'Players'}
  },
  {
    name: 'ratings.avis.interview.view',
    path: 'avis/:id/interview',
    props: true,
    component: () => import('@/views/avis/InterviewView'),
    meta: {title: 'Interview View', middleware: [Authenticated]}
  },
  // Parties
  {
    name: 'ratings.parties.list',
    path: 'parties',
    component: () => import('@/views/parties/List'),
    meta: {title: 'Party list'}
  },
  {
    name: 'ratings.parties.gallery',
    path: 'parties/gallery',
    component: () => import('@/views/parties/Gallery'),
    meta: {title: 'Parties Gallery', middleware: [Authenticated]}
  },
  {
    name: 'ratings.parties.interviews',
    path: 'parties/interviews',
    component: () => import('@/views/parties/Interviews'),
    meta: {title: 'Parties Interviews', middleware: [Authenticated]}
  },
  {
    name: 'ratings.parties.view',
    path: 'parties/:id',
    component: () => import('@/views/parties/View'),
    meta: {title: 'Party View'},
    props: true
  },
  {
    name: 'ratings.parties.interview.view',
    path: 'parties/:id/interview',
    props: true,
    component: () => import('@/views/parties/InterviewView'),
    meta: {title: 'Interview View', middleware: [Authenticated]}
  },
  // Buttons
  {
    name: 'ratings.special.one',
    path: 'special-one',
    component: () => import('@/views/buttons/SpecialOne'),
    meta: {title: 'Special Page 1'}
  },
  {
    name: 'ratings.special.two',
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
    name: 'ratings.creeptimer',
    path: 'creeptimer',
    component: () => import('@/views/buttons/CreepTimer'),
    meta: {title: 'Creep Timer', middleware: [Authenticated]}
  },
  {
    name: 'ratings.peeptimer',
    path: 'peeptimer',
    component: () => import('@/views/buttons/PeepTimer'),
    meta: {title: 'Peep Timer', middleware: [Authenticated]}
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
    name: 'ratings.statistics',
    path: 'statistics',
    component: () => import('@/views/Statistics'),
    meta: {title: 'Statistics'}
  },
  {
    name: 'ratings.notfound',
    path: '404',
    component: () => import('@/views/NotFound'),
    meta: {title: 'Not Found'}
  }
]