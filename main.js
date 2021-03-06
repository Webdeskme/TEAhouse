// Modules to control application life and create native browser window
const {app, screen, BrowserWindow, globalShortcut} = require('electron')
//const path = require('path')
const electron = require('electron')
const {shell} = require('electron');
//const { webContents } = require('electron')
const remote = require('@electron/remote/main');
remote.initialize() // Intitialize
//require('@electron/remote/main').enable(webContents);
//const { screen } = require('electron');
  //const size = screen.getPrimaryDisplay().workAreaSize;
//var screenElectron = electron.screen;
//var mainScreen = screenElectron.getPrimaryDisplay();
//var allScreens = screenElectron.getAllDisplays();
//var mainScreen = screenElectron.getPrimaryDisplay();
//var dimensions = mainScreen.size;

//var w = dimensions.width;
//var h =  dimensions.height;
// Outputs i.e : 1280x720


//console.log(mainScreen, allScreens);


//context Menu

const contextMenu = require('electron-context-menu');

contextMenu({
	prepend: (defaultActions, parameters, browserWindow) => [
		{
			label: 'Rainbow',
			// Only show it when right-clicking images
			visible: parameters.mediaType === 'image'
		},
		{
			label: 'Search DuckDuck for “{selection}”',
			// Only show it when right-clicking text
			visible: parameters.selectionText.trim().length > 0,
			click: () => {
				shell.openExternal(`https://duckduckgo.com/?q=${encodeURIComponent(parameters.selectionText)}`);
			}
		}
	]
});




function createWindow () {
  // Create the browser window.
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  //const screenSize = screen.getPrimaryDisplay().workAreaSize;
  var he = height - 2;
  const mainWindow = new BrowserWindow({
    type: "desktop",
    width: width,
  height: he,
  fullscreen: true,
  frame: false,
  autoHideMenuBar: true,
    "title": "main window",
    webPreferences: {
       enableRemoteModule: true, nodeIntegration: true, contextIsolation: false
    }
  })
   remote.enable(mainWindow.webContents);
  // and load the index.html of the app.
  mainWindow.maximize();
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  //const { screen } = require('electron');
  const { exec } = require('child_process');
  globalShortcut.register('Super+T', () => {
    exec('x-terminal-emulator');
  })
  globalShortcut.register('Super+B', () => {
    exec('min');
  })
  globalShortcut.register('Super+O', () => {
    exec('nimblenote');
  })
  globalShortcut.register('Super+I', () => {
    exec('pkill nimblenote');
  })
  globalShortcut.register('Alt+Control+Delete', () => {
    exec('gnome-system-monitor');
  })
  globalShortcut.register('Super+F', () => {
    exec('thunar');
  })
  globalShortcut.register('Super +L', () => {
    exec('i3lock -i teaos.png --tiling');
  })
  globalShortcut.register('Alt+Control+T', () => {
    const terminal = new BrowserWindow({
      width: 800,
    height: 400,
    frame: true,
      "title": "Terminal",
      webPreferences: {
         enableRemoteModule: true, nodeIntegration: true, contextIsolation: false
      }
    })
    // and load the index.html of the app.
    terminal.loadFile('Terminal/index.html')
  })
  const size = screen.getPrimaryDisplay().workAreaSize;
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
require('./mainmenu');
