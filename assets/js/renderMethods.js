const renderWeather = (res, city, state, today, time) => {
    // Globally scoped vars
    currentCity = res.name;
    temp = res.main.temp.toFixed(0);
    maxTemp = res.main.temp_max.toFixed(0);
    minTemp = res.main.temp_min.toFixed(0);
    // Block scoped vars
    let humidity = res.main.humidity;
    let feelsLike = res.main.feels_like.toFixed(0);
    let windSpeed = res.wind.speed;
    let sky = res.weather[0].main;
    let weather = $("#weather");

    weather.append(`
          <div class="d-flex justify-content-around top-menu mt-5">
              <a href="index.html" class="mt-2 animated fadeIn delay-1s"><i class="fas fa-search"></i></a>
              <h1 class="city text-center animated fadeInDown delay-1s"> ${currentCity} </h1>
              <a href="#" id="save-search" class="mt-2 animated fadeIn delay-1s"><i class="plus-icon animated fas fa-plus"></i></a>
          </div>
          `);
    weather.append(
      `<h6 class="text-center m-bot-60 time animated fadeInDown delay-1s"> ${today}, ${time} </h6>`
    );

    let weatherRow = $(".weather-row");
    // Switch statement to dynamically render a different weather condition logo/colour based on the API response
    switch (sky) {
      case "Clouds":
        weatherLogo = `<h1 class="sky ml-5"><i class="weather-logo fas fa-cloud-sun"></i> Clouds</h1>`;
        weatherRow.addClass("cloudy-gradient-bg-top");
        break;
      case "Clear":
        weatherLogo = `<h1 class="sky ml-5"><i class="weather-logo fas fa-sun"></i> Clear</h1>`;
        weatherRow.addClass("sunny-gradient-bg-top");
        break;
      case "Rain":
        weatherLogo = `<h1 class="sky ml-5"><i class="weather-logo fas fa-cloud-showers-heavy"></i> Rain</h1>`;
        weatherRow.addClass("rainy-gradient-bg-top");
        break;
      case "Smoke":
        weatherLogo = `<h1 class="sky ml-5"><i class="weather-logo fas fa-smog"></i></i> Fog</h1>`;
        weatherRow.addClass("cloudy-gradient-bg-top");
        break;
      case "Haze":
        weatherLogo = `<h1 class="sky ml-5"><i class="weather-logo fas fa-braille"></i></i> Haze</h1>`;
        weatherRow.addClass("haze-gradient-bg-top");
        break;
      case "Mist":
        weatherLogo = `<h1 class="sky ml-5"><i class="weather-logo fas fa-stream"></i></i> Mist</h1>`;
        weatherRow.addClass("mist-gradient-bg-top");
        break;
      default:
        weatherLogo = `<h1 class="sky ml-5"></h1>`;
        weatherRow.addClass("purple-gradient-bg-top");
    }
    weather.append(`
              <div class="d-flex justify-content-around animated fadeInDown">
                  <div class="text-center">
                      ${weatherLogo}
                      <h1 class="temp ml-5"> ${temp}° </h1>      
                  </div>
                          
                  <div class="mt-4 mr-5 animated fadeInDown max-min-temp">
                      <h3 class="max-temp"> ${maxTemp}°F </h3>
                      <hr class="w-100">
                      <h3 class="min-temp"> ${minTemp}°F </h3>
                  </div>
              </div>
          `);
    weather.append(`
              <div class="row mt-5 text-center">
                  <div class="col-xl-6">
                      <iframe class="text-center animated fadeIn delay-2s" frameborder="0" style="border:0;"
                          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyClFZgU_nLZ7QpoqQC_IvIizDwaNpYsYsU
                          &q=${city},${state}" allowfullscreen>
                      </iframe>
                  </div>

                  <div class="col-xl-6 animated fadeIn delay-2s">
                     <div class="row mx-auto extra-info">
                        <div class="col-xl-4 info-box p-3">
                            <i class="fas fa-tint m-3"></i>
                            <h4 class="info-text"> Humidity </h4>
                            <h2>${humidity}%</h2>
                        </div>

                        <div class="col-xl-4 info-box p-3">
                            <i class="fas fa-thermometer-quarter m-3"></i>
                            <h4 class="info-text"> Feels Like </h4>
                            <h2>${feelsLike}°F</h2>
                        </div>

                        <div class="col-xl-4 info-box p-3">
                            <i class="fas fa-wind m-3"></i>
                            <h4 class="info-text"> Wind </h4>
                            <h2>${windSpeed} mph </h2>
                        </div>
                     </div>

                     <div class="row mx-auto extra-info mt-2">
                        <div class="col-xl-12 info-box p-5">
                            <h4 class="info-text">Built by Alistair Rowden</h4>
                        </div>
                     </div>
                  </div>
              </div>
          `);
    $("#weather").show();
  }

let renderButtonsFromStorage = () => {
let savedCitiesAndStates = JSON.parse(localStorage.getItem("savedSearches")) || [];
savedCitiesAndStates.forEach((data, i) => {
    let buttonQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${data.city},${data.state}&units=imperial&appid=713c348493c88760b9f54828487c650d`;
    $.ajax({
    url: buttonQueryURL,
    method: "GET",
    }).then((response) => {
    let sky = response.weather[0].main;
    let displaySavedSearches = $("#savedSearchDiv");
    let tempInF = $("<h1>");
    let cityAndState = $("<h3>");
    cityAndState.text(data.city + ", " + data.state);
    tempInF.text(response.main.temp.toFixed(0) + "°");
    cityAndState.addClass("time animated fadeInUp delay-1s city-state");
    tempInF.addClass("time animated tile-temp fadeInUp delay-1s");
    let div = $("<div>");
    div.addClass("col-md-6 savedCityButton text-center mt-1 mx-auto rounded-lg shadow-lg p-3 time animated fadeIn");

    // Switch statement to dynamically render a different weather condition logo based on the API response
    switch (sky) {
        case "Clouds":
        div.addClass("cloudy-gradient-bg");
        break;
        case "Clear":
        div.addClass("sunny-gradient-bg");
        break;
        case "Rain":
        div.addClass("rainy-gradient-bg");
        break;
        case "Smoke":
        div.addClass("cloudy-gradient-bg");
        break;
        case "Haze":
        div.addClass("haze-gradient-bg");
        break;
        case "Mist":
        div.addClass("mist-gradient-bg");
        break;
        default:
        div.addClass("purple-gradient-bg");
    }
    div.append(cityAndState, tempInF);
    displaySavedSearches.append(div);
    });
});
};