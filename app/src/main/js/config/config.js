import path from 'path'
const {app} = require('electron').remote

const config = {
  PRODUCT_NAME: 'Phototheque',
  APP_PATH: app.getAppPath(),
  USER_PATH: app.getPath('userData'),
  DB_PATH: path.join(app.getPath('userData'), 'databases'),
};

export { config };