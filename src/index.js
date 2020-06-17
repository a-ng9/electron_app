const { ipcRenderer } = require('electron')


//Check online status
const alertOnlineStatus = () => {
   window.alert(navigator.onLine ? 'online' : 'offline')
}

ipcRenderer.on('asynchronous-reply', (event, status) => {
   // console.log(arg) // prints "pong"
   //status = arg;
   console.log(status)
   document.getElementById("wifi-status").innerHTML = status
})
ipcRenderer.send('wifi-status-message', navigator.onLine ? 'Online' : 'Offline')
window.addEventListener('offline', alertOnlineStatus)



//launching the browser window
document.getElementById('view').addEventListener('click', function () {
   ipcRenderer.send('invokeAction', 'Browser Window launched')
})



