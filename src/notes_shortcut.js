const { ipcRenderer } = require('electron')

const form = document.querySelector('form');
const ul = document.querySelector('ul');

form.addEventListener('submit', submitNote);


function submitNote(e) {
    e.preventDefault();
    const notes = document.querySelector('#note').value;
    ipcRenderer.send('addNotes', notes);
}

//add notes to the main window
//THUS WILL NOT APEAR ON THE SMALL WINDOW
ipcRenderer.on('addNotes', function (e, notes) {
    const li = document.createElement('li');
    const textNotes = document.createTextNode(notes);
    li.appendChild(textNotes);
    ul.appendChild(li);
});