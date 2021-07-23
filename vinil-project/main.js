'use strict';

const { app, BrowserWindow } = require('electron');
const path = require('path');

//---------------funções----------------------//

//criando janela
function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '/src/main/preload/controler.js')
        }
    })
    win.webContents.openDevTools();
    win.loadFile(__dirname + '/src/resourses/html/index.html');
}//end createWindow

//------------chamada de funções--------------------//

//esperando a permisão para criar a janela
app.whenReady().then(() => {
    createWindow()
});

//fechamento do app
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});


  