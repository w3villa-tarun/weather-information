const weatherInfo = function () {
    const APPID = "92d54516e130d926f9bdee04d6910339";
    displayWeather = function (data) {
        $('#description').html(data.weather);
        $('#temp').html(data.temp);
        $('#feels-like').html(data.temp);
        $('#maxTemp').html(data.tempMax);
        $('#minTemp').html(data.tempMin);
        $('#humidity').html(data.humidity);
        $('#wind').html(data.wind);
        $('#county').html(data.country);
        $('#sunrise').html(data.sunrise);
        $('#sunset').html(data.sunset);
        $('#icon').attr('src', data.icon);
    }
    this.getWeather = function (city) {
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APPID}`;
        $.ajax({
            url: url,
            dataType: "json",
            success: function (data) {
                $("#city").removeClass("border-red");
                const weatherInfo = {
                    weather: data.weather[0].description,
                    humidity: data.main.humidity,
                    temp: Math.round(data.main.temp - 273.15) + "&deg,C",
                    tempMax: Math.round(data.main.temp_max - 273.15) + "&deg,C",
                    tempMin: Math.round(data.main.temp_min - 273.15) + "&deg,C",
                    icon: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                    city: data.name,
                    country: data.sys.country,
                    humidity: data.main.humidity + "%",
                    wind: data.wind.speed + "m/s",
                    sunrise: (new Date(data.sys.sunrise * 1000)).toLocaleTimeString(),
                    sunset: (new Date(data.sys.sunset * 1000)).toLocaleTimeString()
                }
                displayWeather(weatherInfo)
            },
            error: function () {
                $("#city").addClass("border-red");
                alert("Invalid city!, Correct input format <City name, state code and country code divided by comma>");
            }
        });
    };
}

$(document).ready(function () {
    const info = new weatherInfo();
    //default location "Noida"
    info.getWeather("Noida");
})

/**
 * method to get weather info from public api and display it.
 */
function loadWeatherInfo() {
    const city = $('#city').val()
    //instantiate weatherInfo
    const info = new weatherInfo();
    info.getWeather(city);
}