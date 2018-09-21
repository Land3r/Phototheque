const electron = require('electron');
const merge = require('deepmerge')
const path = require('path');
const url = require('url');

const { app, BrowserWindow, globalShortcut} = electron;
const package = require('../../package.json')
const appFolder = app.getPath('appData')

const electronConfig = require('./electron-config.json')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

/** This function will create the mainWindow */
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow(merge.all(
    [
      electronConfig,
      {
        icon: path.join(__dirname, './res/images/appIcon.png'),
        title: 'Phototheque'
      }
    ]));
  // Open the DevTools.
  mainWindow.webContents.openDevTools();


  app.setPath('userData', path.join(appFolder, package.build.productName))

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // If dev environment
  if (process.env.NODE_ENV == 'development') {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer') // eslint-disable-line
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));

    installExtension(REDUX_DEVTOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  // Emitted when the window is ready to show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  if(globalShortcut.register('CommandOrControl+f5', () => {
    mainWindow.reload()
  })) {
    console.log('Shortcut CTRL+F5 registered.')
  }
  else {
    console.log('Shortcut CTRL+F5 not registered (an error occured).')
  }

  createWindow()
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});
