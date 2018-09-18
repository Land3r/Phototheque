import React from 'react';
import Loadable from 'react-loadable'

import { DefaultLayout } from '../layouts';
import {GalleryList} from '../views/MediaGallery'

// My Components

function Loading() {
  return <div>Chargement...</div>;
}

// const GalleryList = Loadable({
//   loader: () => import('../views/MediaGallery/GalleryList'),
//   loading: Loading
// });

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Accueil', component: GalleryList },
  { path: '/galleries', name: 'Galleries', component: GalleryList},
  { path: '/gallerie/:id', name: 'Gallerie', component: GalleryList}
];

export default routes;
