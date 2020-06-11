const { ipcRenderer,BrowserWindow } = require('electron')

let myNotify;

//Notification alert
function notifyButton() {
    //characteristics of the notification pop up
    myNotify = new Notification('Message from Bob!', {
        'body': 'Hello there! How are you doing?',
        icon: '../assets/images/icon/contact.png'
    });

    //signals the 'main.js' to add a notification badge
    console.log(ipcRenderer.sendSync('notifBadge'))
}


//Removes Notification badge
function rmvButton() {
    //signals the 'main.js' to remove notification badge
    console.log(ipcRenderer.sendSync('rmvBadge'))
}

