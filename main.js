//const electron = require('electron')

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
} = require('electron')

let mainWin;
let addWin;

function createWindow() {
    // Create the browser window.
    mainWin = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    //Quit all windows when closed
    mainWin.on('closed', function () {
        app.quit();
    })


    // and load the index.html of the app.
    mainWin.loadFile('src/index.html')

    // Open the DevTools.
    //mainWin.webContents.openDevTools()

    //Menu (Usually File, Edit etc...)
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    //Initialising the mainMenu
    Menu.setApplicationMenu(mainMenu);
}

//checks for MacOS
const isMac = process.platform === 'darwin';
//create menu template
const mainMenuTemplate = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },//
            { role: 'services' },
            { type: 'separator' },//
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },//
            { role: 'quit' }
        ]
    }] : []),
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' },
            {
                label: 'Add Item',
                click() { createAddWindow() }
            },
            { label: 'Clear Items' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },//
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },//
            { role: 'togglefullscreen' }
        ]
    },
];


//Catch item:add from addIndex.html
ipcMain.on('item:add', function (e, item) {
    // console.log(item);
    mainWin.webContents.send('item:add', item);
    addWin.close();
})


//Handle create add window
function createAddWindow() {
    addWin = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add shopping list item',
        webPreferences: {
            nodeIntegration: true
        }
    })
    addWin.loadFile('src/addIndex.html')
}






// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})