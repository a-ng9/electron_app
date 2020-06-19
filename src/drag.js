const { ipcRenderer } = require('electron');
var fs = require('fs');
// var path = require('path');


document.getElementById('drag').ondragstart = (event) => {
    event.dataTransfer.effectAllowed = 'copy';
    event.preventDefault();
    ipcRenderer.send('ondragstart', '/Users/andrewng/Documents/GitHub/electron_app/assets/images/mountains.jpg');
}

//upload drop
document.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
});
document.addEventListener('drop', (event) => {

    for (const f of event.dataTransfer.files) {
        // Using the path attribute to get absolute file path 
        console.log('File Path of dragged files: ', f.path);
        
        fs.readFile(f.path,'utf-8', function read(err, data) {
            if (err) {
                alert("An error ocurred reading the file :" + err.message);
                return;
            }else{
                console.log(data)
                document.getElementById('output').value = data
            }
        });
        
    }
});