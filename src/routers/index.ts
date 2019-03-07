import asyncComponent from '@/components/asyncComponent';
// import redirectComponent from '@/components/redirectComponent';

export default [
  {
    component: asyncComponent(() => import('../containers/nns/soldpage')),
    path: '/nnssold',
  },
  {
    component: asyncComponent(() => import('../containers/nns/listpage')),
    path: '/nnsselling',
  },
  {
    component: asyncComponent(() => import('../containers/nns/beingpage')),
    path: '/nnsbeing',
  },
  {
    component: asyncComponent(() => import('../containers/nns/rankpage')),
    path: '/nnsrank',
  },
  {
    component: asyncComponent(() => import('../containers/nns/nnsinfo')),
    path: '/nnsinfo/:domain',
  },
  {
    component: asyncComponent(() => import('../containers/nns')),
    path: '/nns',
  },
  {
    component: asyncComponent(() => import('../containers/asset/nep5info')),
    path: '/nep5/:nep5id',
  },
  {
    component: asyncComponent(() => import('../containers/asset/assetinfo')),
    path: '/asset/:assetid',
  },
  {
    component: asyncComponent(() => import('../containers/asset')),
    path: '/assets',
  },
  {
    component: asyncComponent(() => import('../containers/address/addressinfo')),
    path: '/address/:address',
  },
  {
    component: asyncComponent(() => import('../containers/address')),
    path: '/addresses',
  },
  {
    component: asyncComponent(() => import('../containers/transaction/traninfo')),
    path: '/transaction/:txid',
  },
  {
    component: asyncComponent(() => import('../containers/transaction')),
    path: '/transactions',
  },
  {
    component: asyncComponent(() => import('../containers/block/blockinfo')),
    path: '/block/:index',
  },
  {
    component: asyncComponent(() => import('../containers/block')),
    path: '/blocks',
  },
  {
    component: asyncComponent(() => import('../containers/notfound')),
    path: '/:any',
  },
  {
    component: asyncComponent(() => import('../containers/home')),
    exact: true,
    path: '/',
  },
];

