export default [
  {
    name: 'admin.dashboard',
    path: 'dashboard',
    component: () => import('../../../../../vwratings-admin/src/views/Dashboard'),
    meta: {title: 'Admin'}
  },
  {
    name: 'admin.users',
    path: 'users',
    component: () => import('../../../../../vwratings-admin/src/views/Users'),
    meta: {title: 'Users'}
  },
  {
    name: 'admin.avis',
    path: 'avis',
    component: () => import('../../../../../vwratings-admin/src/views/Avis'),
    meta: {title: 'Avis'}
  },
  {
    name: 'admin.comments',
    path: 'avis/comments',
    component: () => import('../../../../../vwratings-admin/src/views/AvisComments'),
    meta: {title: 'Avis Comments'}
  },
  {
    name: 'admin.ratings',
    path: 'avis/ratings',
    component: () => import('../../../../../vwratings-admin/src/views/AvisRatings'),
    meta: {title: 'Avis Ratings'}
  },
  {
    name: 'admin.messages',
    path: 'messages',
    component: () => import('../../../../../vwratings-admin/src/views/Messages'),
    meta: {title: 'Messages'}
  },
  {
    name: 'admin.parties',
    path: 'parties',
    component: () => import('../../../../../vwratings-admin/src/views/Parties'),
    meta: {title: 'Parties'}
  },
  {
    name: 'admin.parties.comments',
    path: 'parties/comments',
    component: () => import('../../../../../vwratings-admin/src/views/PartiesComments'),
    meta: {title: 'PartiesComments'}
  },
  {
    name: 'admin.parties.ratings',
    path: 'parties/ratings',
    component: () => import('../../../../../vwratings-admin/src/views/PartiesRatings'),
    meta: {title: 'Parties Ratings'}
  },
  {
    name: 'admin.ads_campaigns',
    path: 'campaigns',
    component: () => import('../../../../../vwratings-admin/src/views/AdsCampaigns'),
    meta: {title: 'Ads Campagins'}
  }
]
