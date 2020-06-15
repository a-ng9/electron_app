const { ipcRenderer } = require('electron')
// const ipcRenderer = electron.ipcRenderer


document.getElementById('drag').ondragstart = (event) => {
    event.dataTransfer.effectAllowed = 'copy';
    event.preventDefault();
    ipcRenderer.send('ondragstart', '/Users/andrewng/Documents/GitHub/electron_app/assets/images/mountains.jpg');
}