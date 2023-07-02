// Fetch weather data for past week from API
fetch('http://localhost:5000/my_api.php/past_week')
    .then(response => response.json())
    .then(response => {
        let weatherData = response.weatherData;
        let display_HTML = '';

        // Loop through the weather data for each day of the week
        for (let i = 0; i < weatherData.length; i++) {
            let date = new Date(weatherData[i].timestamp);
            let dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            let temperature = Math.round(weatherData[i].temperature - 273) + '°';
            let weatherDescription = weatherData[i].weather_description;
            let humidity = weatherData[i].humidity + '%';
            let pressure = weatherData[i].pressure + ' hpa';
            let windSpeed = weatherData[i].wind_speed + ' km/hr';
            let windDeg = weatherData[i].wind_deg + '°';

            // Build HTML content for each day of the week
            display_HTML += `
                <div class="container">
                    <h1 class="title">Weather in ${response.city}</h1>
                    <h2 class="title_2">${dayOfWeek}</h2>
                    <div class="day_1">
                        <div class="temp">Temperature: ${temperature}</div><br>
                        <div class="main">
                            <div class="Weather-condition">${weatherDescription}</div>
                            <div class="humidity">Humidity: ${humidity}</div>
                            <div class="pressure">Pressure: ${pressure}</div>
                            <div class="wind_desc">
                                <div class="wind_speed">Wind-Speed: ${windSpeed}</div>
                                <div class="wind_direction">Wind-Direction: ${windDeg}</div>
                            </div>
                        </div>
                    </div> 
                </div>
            `;
        }

        // Copy the HTML content for all days of the week to the DOM
        document.getElementById("hacks").innerHTML = display_HTML;

        // Save new data to browser, with new timestamp
        localStorage.myWeather = response.currentWeather.weather_description;
        localStorage.myTemperature = Math.round(response.currentWeather.temperature - 273) + '°';
        localStorage.mycity = response.city;
        localStorage.mypressure = response.currentWeather.pressure + ' hpa';
        localStorage.myHumidity = response.currentWeather.humidity + '%';
        localStorage.mywind_Deg = response.currentWeather.wind_deg + '°';
        localStorage.myWind = response.currentWeather.wind_speed + ' km/hr';
        localStorage.when = Date.now(); // milliseconds since January 1 1970
    })
    .catch(err => {
        // Display errors in console
        console.log(err);
    });
