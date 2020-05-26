import path from 'path'
const {app} = require('electron').remote

const config = {
  PRODUCT_NAME: 'Phototheque',
  APP_PATH: app.getAppPath(),
  USER_PATH: app.getPath('userData'),
  DB_PATH: path.join(app.getPath('userData'), 'databases'),
  ALLOWED_EXT: ['bmp', 'jpg', 'jpeg', 'dds', 'gif', 'png', 'tga', 'thm', 'tif', 'tiff', 'yuv', '3g2',
  '3gp', 'asf', 'avi', 'flv', 'm4v', 'mov', 'mp4', 'mpg', 'rm', 'swf', 'vob', 'wmv'],
  EXIF_EXT : ['jpg', 'jpeg', 'tif', 'tiff'],
  DEFAULT_GALLERY: {
    name: 'Non catégorisé',
    description: 'Cette gallerie regroupe toutes les photos qui n\'appartiennent pas encore à d\'autres galleries',
    medias: [],
    image: null
  }
};
export { config };