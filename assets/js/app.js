$(document).ready(function(){

    // API call
    $('#search').one('click', function(e){

        let now = moment();

        let today = moment(now).format('dddd'); 
        let time = moment(now).format('LT')

        // Hides the city and state search form
        let formWrapper = $('.form-wrapper')
        formWrapper.hide()

        let city = $('#city').val().trim();
        let state = $('#state').val().trim();

        let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=292e2030aa02770ca57caacfbf6ed982`

        e.preventDefault();

        if (!city || !state) {
            alert('Please fill out all of the fields')
        } 

        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(res){

            let currentCity = res.name;
            let country = res.sys.country;
            let temp = convertKelvin(res.main.temp);
            let maxTemp = convertKelvin(res.main.temp_max);
            let minTemp = convertKelvin(res.main.temp_min);
            let humidity = res.main.humidity;
            let feelsLike = convertKelvin(res.main.feels_like);
            let windSpeed = res.wind.speed;
            let sky = res.weather[0].main;
            let weather = $('#weather');

       
            
            // console.log(res);
            weather.append(`
            <div class="d-flex justify-content-around">
                <a href="index.html"><i class="fas fa-search"></i></a>
                <h1 class="city text-center"> ${currentCity} </h1>
                <a href="index.html"><i class="fas fa-plus"></i></a>
            </div>
            `);
            weather.append(`<h6 class="text-center m-bot-60 time"> ${today}, ${time} </h6>`);

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
                <div class="d-flex justify-content-around">
                    <div>
                        ${weatherLogo}
                        <h1 class="temp ml-5"> ${temp}° </h1>      
                    </div>
                            
                    <div class="mt-4">
                        <h3 class="max-temp"> ${maxTemp}°F </h3>
                        <hr class="w-100">
                        <h3 class="min-temp"> ${minTemp}°F </h3>
                    </div>
                </div>
            `);

            // weather.append(`<h4> Humidity: ${humidity}% </h4>`);
            // weather.append(`<h4> Feels Like: ${feelsLike}°F </h4> <br>`);
            // weather.append(`<h4> Wind Speed: ${windSpeed} mph </h4> <br>`);
        //     weather.append(`
        //     <iframe
        //     width="500"
        //     height="400"
        //     frameborder="0" style="border:0; max-width: 400px;"
        //     src="https://www.google.com/maps/embed/v1/place?key=AIzaSyClFZgU_nLZ7QpoqQC_IvIizDwaNpYsYsU
        //     &q=${city},${state}" allowfullscreen>
        //   </iframe>
        //   `)  
          
          $('#weather').show();

        })
    })

    // Converts kelvin into fahrenheit and parses it into an integer
    let convertKelvin = (kelvin) => {
    return parseInt(((((kelvin) - 273.15) * 1.8) + 32));
    }

    $('#weather').hide();

})