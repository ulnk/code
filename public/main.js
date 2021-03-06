// require('@electron/remote/main').initialize();
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
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
        backgroundColor: '#1e1e1e',
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            // contextIsolation: false,
            // enableRemoteModule: true
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

    ipcMain.handle('folder-dialog', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] });
        if (canceled) return;
        return filePaths[0];
    });

    ipcMain.handle('file-dialog', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog();
        if (canceled) return;
        return filePaths[0];
    });

    ipcMain.handle('save-dialog', async () => {
        const { canceled, filePath } = await dialog.showSaveDialog();
        if (canceled) return;
        return filePath;
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