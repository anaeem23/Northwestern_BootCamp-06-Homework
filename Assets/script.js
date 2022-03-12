

weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=50332c7d87d04bc3530b2e5889d6c590";

weatherURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=London&units=imperial&appid=50332c7d87d04bc3530b2e5889d6c590";






function getWeather() {
    fetch(weatherURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
        })
}

getWeather()

function getWeather2() {
    fetch(weatherURL2)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
        })
}

getWeather2()