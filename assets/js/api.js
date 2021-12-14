// API call
const searchWeather = (city, state) => {
    if (!city || !state) return alert("Please fill out all of the fields");
    let formWrapper = $(".form-wrapper");
    let savedSearchDiv = $("#savedSearchDiv");
    let now = moment();
    let today = moment(now).format("dddd");
    let time = moment(now).format("LT");
    queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&units=imperial&appid=713c348493c88760b9f54828487c650d`;
    // Hiding homepage elements
    formWrapper.hide();
    savedSearchDiv.hide();
    // API call
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then((res) => {
      renderWeather(res, city, state, today, time);
    });
};