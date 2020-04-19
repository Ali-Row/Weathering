$(document).ready(function(){

    // API call
   $('#search').on('click', function(e){

        let zip = $('#zipForm').val().trim();
        let queryUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=292e2030aa02770ca57caacfbf6ed982`

        e.preventDefault();

        // console.log(city);

        $.ajax({
            url: queryUrl,
            method: 'GET'
        })
        .then(function(response){
            let city = response.name;
            let country = response.sys.country;
            let temp = convertKelvin(response.main.temp);
            let humidity = response.main.humidity;
            let feelsLike = convertKelvin(response.main.feels_like);
            let windSpeed = response.wind.speed;
            let sky = response.weather[0].main;
            
            console.log(response);

            console.log(`City: ${city}, ${country}`);
            console.log(`Temperature: ${temp}°F`);
            console.log(`Humidity: ${humidity}%`);
            console.log(`Feels Like: ${feelsLike}°F`);
            console.log(`Wind Speed: ${windSpeed} mph`);
            console.log(`Conditions: ${sky}`);


            
        })

        let convertKelvin = (kelvin) => {
            return parseInt(((((kelvin) - 273.15) * 1.8) + 32))
        }

    

   })
})