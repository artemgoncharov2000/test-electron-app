const { ipcRenderer } = require("electron")
const { contextBridge } = require("electron/renderer")

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

  contextBridge.exposeInMainWorld('electronAPI', {
    getImage: (callback) => ipcRenderer.on("get-image", callback)
  })