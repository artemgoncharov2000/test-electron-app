const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const { shell } = require('electron');

const menuItems = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'About'
            }
        ]
    },
    {
        label: 'File',
        submenu: [
            {
                label: "New Window",
                click: async () => {
                    const win2 = new BrowserWindow({
                        height: 500,
                        width: 800,
                        webPreferences: {
                            preload: path.join(__dirname, "cameraPreload.js")
                        }
                    })
                    
                    win2.loadURL('https://github.com')
                    // win2.loadUrl('https://google.com')
                    // win2.loadFile('index2.html')

                }
            },
            {
                label: "Open camera",
                click: async () => {
                    const win2 = new BrowserWindow({
                        height: 300,
                        width: 400,
                        webPreferences: {
                            preload: path.join(__dirname, "cameraPreload.js")
                        }
                    })

                    win2.webContents.openDevTools();
                    win2.loadFile('camera.html')
                    // win2.loadURL('https://github.com')
                    // win2.loadUrl('https://google.com')
                    // win2.loadFile('index2.html')

                }
            },
            {
                label: 'Learn more',
                click: async () => {
                    
                    await shell.openExternal('https://electronjs.org')
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Exit',
                click: () => app.quit()
            },
            {
                role: "close"
            }
        ]
    },
]

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu)

const createWindow = () => {
    const win = new BrowserWindow({
        height: 500,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.webContents.openDevTools();
    win.loadFile('index.html');

    ipcMain.on("set-image", (event, data) => {
        win.webContents.send('get-image', data)
    })
}



app.on('window-all-closed', () =>{
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.whenReady().then(() => {
    createWindow();

    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})