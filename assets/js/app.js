$(document).ready(function(){


   $('#cityForm').on('click', function(e){
        let city = $('#cityForm').val().trim();

        e.preventDefault();

        console.log(city);

   })
})