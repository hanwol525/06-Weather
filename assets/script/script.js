// TO DO:
// city search bar with local storage history
// way to display conditions for a city
// --city name
// --the date
// --icon representation of weather conditions
// --temperature
// --humidity
// --wind speed
// css fw that's not bootstrap - X
// 5-day forecast with:
// --date
// --icon representation of weather conditions
// --temperature
// --the wind speed
// --humidity
// way to click on a city from the search history and get directed to that city's conditions

console.log("why");


// start of things for searchbar/function
var searchBar = document.getElementById("searchBar");
var submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function(){
    var searchVal = searchBar.value;
    localStorage.setItem('last-city', JSON.stringify(searchVal));
})