const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const DEV = !app.isPackaged;

const createWindow = () => {
    const browserWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        frame: false,
        icon: __dirname + '/favicon.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    
    browserWindow.loadURL( DEV ?
        'http://localhost:3000' :
        `file://${path.join(__dirname, '../build/index.html')}`
    );

    ipcMain.on('close', () => {
        browserWindow.close();
    });

    ipcMain.on('restore', () => {
        browserWindow.isMaximized() ? browserWindow.restore() : browserWindow.maximize();
    });

    ipcMain.on('minimise', () => {
        browserWindow.minimize();
    });
}

app.whenReady().then(createWindow);

// MacOS
app.on('window-all-closed', () => {
    if (process.platform === 'darwin') return;
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length !== 0) return;
    createWindow();
});