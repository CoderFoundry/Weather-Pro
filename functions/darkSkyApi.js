function fetchDarkSkyData(apiKey, latitude, longitude) {

    //to avoid the cors issue you need to run through a proxy or make the call server side.
    var DsProxyLink = `https://cors-anywhere.herokuapp.com/`;
    var DsApiLink = `${DsProxyLink}https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;

    fetch(DsApiLink)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            var resultsHTML = "";
            var tableHTML = "";
            var summary = data.currently.summary;
            var temperature = data.currently.temperature;
            var icon = data.currently.icon;
            var precipProbability = data.currently.precipProbability;
            var humidity = data.currently.humidity;
            var windSpeed = data.currently.windSpeed
            var ts = new Date(data.currently.time * 1000);
            var forecastDate = `${days[ts.getDay()]} ${months[ts.getMonth()]} ${ts.getDate()}`


            //Set values for the current conditions
            // document.getElementById("location").innerHTML = name;
            document.getElementById("dayTime").innerHTML = forecastDate;
            document.getElementById("summary").innerHTML = summary;
            document.getElementById("currentTemp").innerHTML = `${Math.round(temperature)}&deg`;
            document.getElementById("weatherIcon").src = getICON(icon);
            document.getElementById('icon').innerHTML = icon;
            document.getElementById("perciptation").innerHTML = `Precipitation ${precipProbability*100}%`;
            document.getElementById("humidty").innerHTML = `Humidity ${Math.round(humidity*100)}%`;
            document.getElementById("wind").innerHTML = `Winds ${Math.round(windSpeed)} mph`;

            //render the forcasts tabs
            document.getElementById("dailyForecast").innerHTML = renderWeeklyForecast(data.daily);
            document.getElementById("weeklyForecast").innerHTML = renderDailyForecast(data.hourly);
        })
        .catch(err => {
            // Do something for an error here
            throw (`Sorry, An Error occured.  ${err}`);
        })
}