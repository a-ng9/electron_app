
//const electron = require('electron');
//const { ipcRenderer } = electron;


const { ipcRenderer,BrowserWindow } = require('electron')

let myNotify;


function notifyButton() {
    //characteristics of the notification pop up
    myNotify = new Notification('Message from Bob!', {
        'body': 'Hello there! How are you doing?',
        icon: '../assets/images/icon/contact.png'
    });

    //signals the 'main.js' to add a notification badge
    console.log(ipcRenderer.sendSync('notifBadge'))
}

