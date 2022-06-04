const { ipcRenderer, contextBridge} = require('electron');

const fs = require('fs');
const path = require('path');

const formatSize = size => {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        ' ' +
        ['B', 'kB', 'MB', 'GB', 'TB'][i]
    );
}

contextBridge.exposeInMainWorld('app', {
    close: () => {
        ipcRenderer.send('close');
    },
    restore: () => {
        ipcRenderer.send('restore');
    },
    minimise: () => {
        ipcRenderer.send('minimise');
    },
    folderDialog: () => {
        return ipcRenderer.invoke('folder-dialog');
    },
    fileDialog: () => {
        return ipcRenderer.invoke('file-dialog');
    },
    saveDialog: () => {
        return ipcRenderer.invoke('save-dialog');
    },
    readFile: (filePath) => {
        return fs.readFileSync(filePath, 'utf8');
    },
    saveFile: (filePath, content) => {
        return fs.writeFileSync(filePath, content, 'utf8');
    },
    username: require('os').userInfo().username,
    dir: path.join(__dirname, '../'),
    getFiles: (newPath) => {
        const currentPath = newPath || path.join(__dirname, '../')
        return fs.readdirSync(currentPath).map((file) => {
            const fileStats = fs.statSync(path.join(currentPath, file));
            const isFile = fileStats.size > 0;
            return {
                name: file,
                isFile,
                size: isFile ? formatSize(fileStats.size) : '',
                isDirectory: !isFile,
                path: path.join(currentPath, file)
            }
        }).sort((firstFile, secondFile) => {
            if (firstFile.isDirectory === secondFile.isDirectory) return firstFile.name.localeCompare(secondFile.name)
            return firstFile.isDirectory ? -1 : 1
        });
    }
});