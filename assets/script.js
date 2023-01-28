const popup = document.querySelector(".popup");
wifiIcon = document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .title"),
popupDesc = document.querySelector(".desc"),
reconnectBtn = document.querySelector(".reconnect");


let isOnline = true, intervalId, timer = 10;

const checkConnection = async () => {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
        //console.log(response)
    }catch (error){
        isOnline = false;
    }
    timer = 10;
    clearInterval(intervalId);
    //console.log(isOnline);
    handlePopup(isOnline);
}
const handlePopup = (status) => {
    if(status) {
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Connection Restored...";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet.";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"), 2000);
    }
    popup.classList.add("show");
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Connection Lost.";
    popupDesc.innerHTML = "Your network is unavailable, we will attempt to reconnect you in <b>10</b> seconds";
    popup.className = "popup show";

    intervalId = setInterval(() => {
        timer--;
        if(timer === 0) checkConnection();
        popup.querySelector(".desc b").innerText = timer;
    }, 1000);
}



setInterval(() => isOnline && checkConnection(), 3000);

reconnectBtn.addEventListner("click", checkConnection);