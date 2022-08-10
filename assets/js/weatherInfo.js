const weatherInfo = function () {
    this.finalData = {};
    displayWeather = function (data) {
        console.log(data)
    }
    this.getWeather = function (city) {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=92d54516e130d926f9bdee04d6910339";
        $.ajax({
            url: url,
            dataType: "json",
            success: function (data) {
                var weather = data.weather[0].description;
                var temp = data.main.temp - 273.15;
                var temp = Math.round(temp);
                var temp = temp + "&deg;C";
                var icon = data.weather[0].icon;
                var icon = "http://openweathermap.org/img/w/" + icon + ".png";
                var city = data.name;
                var country = data.sys.country;
                var humidity = data.main.humidity;
                var humidity = humidity + "%";
                var wind = data.wind.speed;
                var wind = wind + "m/s";
                var sunrise = data.sys.sunrise;
                var sunrise = new Date(sunrise * 1000);
                var sunrise = sunrise.toLocaleTimeString();
                var sunset = data.sys.sunset;
                var sunset = new Date(sunset * 1000);
                var sunset = sunset.toLocaleTimeString();
                var weatherInfo = {
                    weather: weather,
                    temp: temp,
                    icon: icon,
                    city: city,
                    country: country,
                    humidity: humidity,
                    wind: wind,
                    sunrise: sunrise,
                    sunset: sunset
                };
                displayWeather(weatherInfo)
            }
        });
    };
}


const info = new weatherInfo();
info.getWeather("Noida");