const { ipcRenderer } = require("electron")
const { contextBridge } = require("electron/renderer")

contextBridge.exposeInMainWorld('electronAPI', {
    sendImage: (data) => ipcRenderer.send("set-image", data)
  })