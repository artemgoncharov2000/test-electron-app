const imageTag = document.getElementById('image')

window.electronAPI.getImage((event, data) => {
    console.log(data);
    imageTag.src = data;
})