const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('app', {
    close: () => {
        ipcRenderer.send('close');
    },
    restore: () => {
        ipcRenderer.send('restore');
    },
    minimise: () => {
        ipcRenderer.send('minimise');
    }
});