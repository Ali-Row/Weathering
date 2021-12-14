// Invokes the save function and does an animation of the plus icon
$(document).one("click", "#save-search", (e) => {
    e.preventDefault();
    let plusIcon = $(".plus-icon");
    let currentCity = $("#city").val().trim();
    let currentState = $("#state").val().trim();
    plusIcon.toggleClass("fa-plus fa-save");
    plusIcon.addClass("fadeIn");
    timeout = setTimeout(() => {
      plusIcon.toggleClass("fadeIn fadeInDown");
      plusIcon.toggleClass("fa-plus fa-save");
    }, 3000);

    let cityStateObject = { city: currentCity, state: currentState, id: uuidv4() };
    save(cityStateObject);
});

// When you click on the saved city divs stored on the homepage it runs the API call again with that city/state.
$(document).on("click", ".savedCityButton", function () {
    let cityStateArr = $(this).children(".city-state").text().split(", ");
    let cityName = cityStateArr[0];
    let stateName = cityStateArr[1];
    searchWeather(cityName, stateName);
});

$(document).on("click", ".delete-saved-weather", function (e) {
    e.stopPropagation();
    let cityId = $(this).attr("id");
    deleteSavedCity(cityId);
    renderButtonsFromStorage();
})