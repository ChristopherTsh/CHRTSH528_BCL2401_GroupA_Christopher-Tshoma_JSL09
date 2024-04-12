// Fetch a random landscape image from Unsplash API and set it as the background
try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data = await res.json()
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("author").textContent = `By: ${data.user.name}`
} catch (err) {
    // If fetching image fails, set a default background and author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
    document.getElementById("author").textContent = `By:Dodi Achmad`
}
// Fetch Dogecoin data from CoinGecko API and display it
try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    if (!res.ok) {
        throw Error("Something went wrong")
    ; // Display Dogecoin logo and name
}
    const data = await res.json()
    document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `
    const para = document.getElementById("crypto").querySelectorAll("p")
    if(para.length === 0){ 
        document.getElementById("crypto").innerHTML += `
        <p>🎯: R${data.market_data.current_price.zar}</p>
        <p>👆: R${data.market_data.high_24h.zar}</p>
        <p>👇: R${data.market_data.low_24h.zar}</p>
        `
    } else {
        // If paragraph elements exist, update their content

        para[0].textContent = `🎯: R${data.market_data.current_price.zar}`;
        para[1].textContent = `👆: R${data.market_data.high_24h.zar}`;
        para[2].textContent = `R${data.market_data.low_24h.zar}`;
    }

   
} catch (err) {
    console.error(err)
}
// Function to get and display current time every second
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
// Update the current time every second
setInterval(getCurrentTime, 1000)
// Fetch current weather data based on user's geolocation
navigator.geolocation.getCurrentPosition(async position => {
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        if (!res.ok) {
            throw Error("Weather data not available")
        }
        const data = await res.json()
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        // Display weather information
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
            
        `
    } catch (err) {
        console.error(err)
    }
});
