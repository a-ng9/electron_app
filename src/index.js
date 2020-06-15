const { ipcRenderer} = require('electron')

document.getElementById('view').addEventListener('click', function () {
   ipcRenderer.send('invokeAction','Browser Window launched')
})



