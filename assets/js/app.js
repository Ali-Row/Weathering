$(document).ready(function(){

    // API call
    $('#search').one('click', function(e){

        let zip = $('#zipForm').val().trim();
        let queryUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=292e2030aa02770ca57caacfbf6ed982`

        if(!zip) {
            alert('Please type in the ZIP Code')
        }

        e.preventDefault();
        
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(res){

            let city = res.name;
            let country = res.sys.country;
            let temp = convertKelvin(res.main.temp);
            let humidity = res.main.humidity;
            let feelsLike = convertKelvin(res.main.feels_like);
            let windSpeed = res.wind.speed;
            let sky = res.weather[0].main;
            let forecast = $('#forecast');
            
            // console.log(res);
            forecast.append(`<h1> ${city}, ${country} </h1> <br>`);
            forecast.append(`<h4> Temperature: ${temp}°F </h4> <br>`);
            forecast.append(`<h4> Humidity: ${humidity}% </h4> <br>`);
            forecast.append(`<h4> Feels Like: ${feelsLike}°F </h4> <br>`);
            forecast.append(`<h4> Wind Speed: ${windSpeed} mph </h4> <br>`);
            forecast.append(`<h4> Conditions: ${sky} </h4>`); 

            $('#map').html(`
            <iframe
            width="500"
            height="400"
            frameborder="0" style="border:0; max-width: 400px;"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyClFZgU_nLZ7QpoqQC_IvIizDwaNpYsYsU
            &q=${zip}" allowfullscreen>
          </iframe>
          `)

            // Adds grey background and shadow to the forecast row upon clicking search
            $('#forcast-bg').addClass('forecast-bg');
            $('#forcast-bg').addClass('shadow');
        })

    })

    // Converts kelvin into fahrenheit and parses it into an integer
    let convertKelvin = (kelvin) => {
    return parseInt(((((kelvin) - 273.15) * 1.8) + 32))
    }

})