var $ = require( "jquery" );
window.$ = $;
require('bootstrap');
var fs = require('fs-extra');
//const { webContents } = require('electron')
const homedir = require('os').homedir();
const { BrowserWindow } = require('@electron/remote');
//const { BrowserWindow } = require("@electron/remote/main").enable(webContents)
console.log(homedir + '/Apps/Tea/');
fs.readdir(homedir + '/Apps/Tea/', (err, list) => {
  if(!err){
  list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
  list.forEach(myApps);
function myApps(item) {
  $("#apps").append('<tr><td><a class="dropdown-item" href="#" id="' + item + '">' + item + '</a></td></tr>');
  $("#" + item).click(function(){
    //window.open('homedir + '/Apps/' + item + '/index.html', '_blank', 'top=500,left=200,frame=true, enableRemoteModule: true, nodeIntegration: true, contextIsolation: false');
    createBrowserappWindow(homedir + '/Apps/Tea/' + item + '/index.html');
    //console.log('test');
  });
  function createBrowserappWindow(url1) {
  //const remote = require('@electron/remote');
  //const BrowserWindow = remote.BrowserWindow;
let win2 = new BrowserWindow({
    width: 400,
    height: 300,
    minWidth: 400,
    minHeight: 300,
    webPreferences: { enableRemoteModule: true, nodeIntegration: true, contextIsolation: false }
  });
  //win2.setAlwaysOnTop(true);
  //win2.enable(webContents);
  win2.loadFile(url1);
}
}
}
});
fs.readdir(homedir + '/Apps/Node/', (err, list) => {
  if(!err){
  list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
  list.forEach(myApps);
function myApps(item) {
  var sid = item.replace(/\s/g, '');
  $("#apps").append('<tr><td><a class="dropdown-item" href="#" id="' + sid + '" title="' + item + '">' + item + '</a></td></tr>');
  $("#" + sid).click(function(){
    exec('npm --prefix ' + homedir + '/Apps/Node/ test');
  });
}
}
});
