if (require('electron-squirrel-startup')) {
    return;
}
const path = require('path');
const electron = require('electron');

const {app, BrowserWindow} = electron;

global.desktopPath = app.getPath('desktop');

let win;

function createWindow() {
    const dummy = win = new BrowserWindow({
        frame: false,
        useContentSize: true
    });
    dummy.loadURL(`file://${__dirname}/app/start.html`);

    win = new BrowserWindow({
        minWidth: 1200,
        minHeight: 800,
        center: true,
        title: 'Stimulus',
        icon: path.join(__dirname, 'resources', 'favicon.ico'),
        show: false
    });

    win.setMenu(null);
    win.loadURL(`file://${__dirname}/app/login.html`);

    setTimeout(() => {
        win.maximize();
        dummy.close();
    }, 4000);

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
