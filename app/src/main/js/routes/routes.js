import DefaultLayout from '../layouts/DefaultLayout'
import { GalleryList } from '../views/MediaGallery';
import MediaGallery from '../containers/media_gallery/media_gallery'
import Settings from '../views/Settings/Settings';
import Exit from '../views/exit';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {
    path: '/', exact: true, name: 'Accueil', component: DefaultLayout,
  },
  { path: '/galleries/:id', name: 'Gallerie', component: MediaGallery },
  { path: '/galleries', name: 'Galleries', component: GalleryList },
  { path: '/settings', name: 'Paramètres', component: Settings },
  { path: '/exit', name: 'Exit', component: Exit },
];

export default routes;
