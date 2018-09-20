import { DefaultLayout } from '../layouts';
import {GalleryList, MediaGallery} from '../views/MediaGallery'
import Exit from '../views/exit'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Accueil', component: DefaultLayout },
  { path: '/galleries/:id', name: 'Gallerie', component: MediaGallery},
  { path: '/galleries', name: 'Galleries', component: GalleryList},
  { path: '/exit', name: 'Exit', component: Exit}
];

export default routes;
