$("#weather").hide();
$("#savedSearchDiv").show();

// Calls the searchWeather function when the search button is clicked
$("#search").one("click", (e) => {
  e.preventDefault();
  let cityName = $("#city").val().trim();
  let stateName = $("#state").val().trim();
  searchWeather(cityName, stateName);
});

const uuidv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

// Saves to local storage when called
const save = (data) => {
  let storageData = JSON.parse(localStorage.getItem("savedSearches")) || [];
  storageData.push(data);
  localStorage.setItem("savedSearches", JSON.stringify(storageData));
};

const deleteSavedCity = (id) => {
  let cities = JSON.parse(localStorage.getItem("savedSearches")) || [];
  cities = cities.filter(city => city.id !== id);
  localStorage.setItem("savedSearches", JSON.stringify(cities));
};

// Shows the saved city divs on the homepage by default
renderButtonsFromStorage();
