const { ipcRenderer,BrowserWindow } = require('electron')

const form = document.querySelector('form');
const ul = document.querySelector('ul');

form.addEventListener('submit', submitNote);

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

function submitNote(e) {
    e.preventDefault();
    const notes = document.querySelector('#note').value;
    ipcRenderer.send('addNotes', notes);
}

//add notees
ipcRenderer.on('addNotes', function (e, notes) {
    const li = document.createElement('li');
    const textNotes = document.createTextNode(notes);
    li.appendChild(textNotes);
    ul.appendChild(li);
});


//clear all notes
ipcRenderer.on('clearNotes', function(){
    ul.innerHTML = '';
})