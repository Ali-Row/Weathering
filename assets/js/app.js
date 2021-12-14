$("#weather").hide();
$("#savedSearchDiv").show();

// Calls the searchWeather function when the search button is clicked
$("#search").one("click", (e) => {
  e.preventDefault();
  let cityName = $("#city").val().trim();
  let stateName = $("#state").val().trim();
  searchWeather(cityName, stateName);
});

// Saves to local storage when called
let save = (data) => {
  let storageData = JSON.parse(localStorage.getItem("savedSearches")) || [];
  storageData.push(data);
  localStorage.setItem("savedSearches", JSON.stringify(storageData));
};

// Shows the saved city divs on the homepage by default
renderButtonsFromStorage();
