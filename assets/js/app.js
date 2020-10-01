$(document).ready(() => {

    $('#weather').hide();

    $('#search').one('click', (e) => {
        e.preventDefault();
        let cityName = $('#city').val().trim();
        let stateName = $('#state').val().trim();
        searchWeather(cityName, stateName);
    })

    // API call
    let searchWeather = (city, state) => {
        // Hides the city and state search form
        let formWrapper = $('.form-wrapper');
        formWrapper.hide();

        let now = moment();
        let today = moment(now).format('dddd'); 
        let time = moment(now).format('LT');
        let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=292e2030aa02770ca57caacfbf6ed982`

        // if (!city || !state) alert('Please fill out all of the fields')

        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then((res) => {
            currentCity = res.name;
            currentState = state;
            let temp = convertKelvin(res.main.temp);
            let maxTemp = convertKelvin(res.main.temp_max);
            let minTemp = convertKelvin(res.main.temp_min);
            let humidity = res.main.humidity;
            let feelsLike = convertKelvin(res.main.feels_like);
            let windSpeed = res.wind.speed;
            let sky = res.weather[0].main;
            let weather = $('#weather');
     
            weather.append(`
            <div class="d-flex justify-content-around mt-5">
                <a href="index.html" class="mt-2 animated fadeIn delay-1s"><i class="fas fa-search"></i></a>
                <h1 class="city text-center animated fadeInDown delay-1s"> ${currentCity} </h1>
                <a href="index.html" id="save-search" class="mt-2 animated fadeIn delay-1s"><i class="fas fa-plus"></i></a>
            </div>
            `);
            weather.append(`<h6 class="text-center m-bot-60 time animated fadeInDown delay-1s"> ${today}, ${time} </h6>`);

            // Switch statement to dynamically render a different weather condition logo based on the API response
            switch(sky) {
                case 'Clouds':
                    weatherLogo = (`<h1 class="sky ml-5"><i class="weather-logo fas fa-cloud"></i> Cloudy</h1>`); 
                break;
                case 'Clear':
                    weatherLogo = (`<h1 class="sky ml-5"><i class="weather-logo fas fa-sun"></i> Clear</h1>`); 
                break;
                case 'Rain':
                    weatherLogo = (`<h1 class="sky ml-5"><i class="weather-logo fas fa-cloud-showers-heavy"></i> Rainy</h1>`); 
                break;
            }      
            weather.append(`
                <div class="d-flex justify-content-around animated fadeInDown">
                    <div class="text-center">
                        ${weatherLogo}
                        <h1 class="temp ml-5"> ${temp}° </h1>      
                    </div>
                            
                    <div class="mt-4 mr-5 animated fadeInDown">
                        <h3 class="max-temp"> ${maxTemp}°F </h3>
                        <hr class="w-100">
                        <h3 class="min-temp"> ${minTemp}°F </h3>
                    </div>
                </div>
            `)
            weather.append(`
                <div class="row mt-5 text-center">
                    <div class="col-xl-6">
                        <iframe
                            class="text-center animated fadeIn delay-2s"
                            frameborder="0" style="border:0;"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyClFZgU_nLZ7QpoqQC_IvIizDwaNpYsYsU
                            &q=${city},${state}" allowfullscreen>
                        </iframe>
                    </div>

                    <div class="col-xl-6 animated fadeIn delay-2s">
                        <div class="col-md-4 m-auto extra-info">
                            <i class="fas fa-tint m-3"></i>
                            <h4> Humidity </h4>
                            <h2>${humidity}%</h2>
                        </div>

                        <div class="col-md-4 m-auto extra-info">
                            <i class="fas fa-thermometer-quarter m-3"></i>
                            <h4> Feels Like </h4>
                            <h2>${feelsLike}°F</h2>
                        </div>

                        <div class="col-md-4 m-auto extra-info">
                            <i class="fas fa-wind m-3"></i>
                            <h4> Wind </h4>
                            <h2>${windSpeed} mph </h2>
                        </div>
                    </div>
                </div>
            `)   
          $('#weather').show();
        })
    }

    $(document).one('click', '#save-search', (e) => {
        e.preventDefault();
        let cityStateObject = {city: currentCity, state: currentState};
        save(cityStateObject);
    })

    let save = (data) => {
        let storageData = JSON.parse(localStorage.getItem('savedSearches')) || [];
        storageData.push(data);
        localStorage.setItem('savedSearches', JSON.stringify(storageData));
    }

    // Converts kelvin into fahrenheit and parses it into an integer
    let convertKelvin = (kelvin) => {
    return parseInt(((((kelvin) - 273.15) * 1.8) + 32));
    }
})