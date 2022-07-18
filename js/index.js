function editMemory() {
    qID = document.getElementById('qID').value;
    if(qID!=null)
    {
        window.location.replace('https://qrystals.github.io/edit.html?id='+qID);
    }
}