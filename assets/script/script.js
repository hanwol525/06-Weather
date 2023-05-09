// TO DO:
// city search bar with local storage history
// -- probably need a few search criteria: city (req), state, country?
// way to display conditions for a city
// --city name with a way to turn it into coords (ISO 3166 country codes)
// --the date (day.js)
// --icon representation of weather conditions
// --temperature
// --humidity
// --wind speed
// css fw that's not bootstrap - X
// 5-day forecast (limit) with:
// --date
// --icon representation of weather conditions
// --temperature
// --the wind speed
// --humidity
// way to click on a city from the search history and get directed to that city's conditions

// API KEY: 23116274a5a42433f230b2d7ad947f9a


// start of things for searchbar/function
var searchBar = document.getElementById("searchBar");
var submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function(){
    var searchVal = searchBar.value;
    citynameFetch(searchVal);
    localStorage.setItem('last-city', JSON.stringify(searchVal));
});


function citynameFetch(cityName){
    var geocodereqURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=23116274a5a42433f230b2d7ad947f9a';
    fetch(geocodereqURL)
        .then((res) => {return res.json()
        // maybe set up 404 response if time
        })
        .then((data) => {
            console.log(data);
            var currentLat = data[0].lat;
            var currentLon = data[0].lon;
            coordsFetch(currentLat, currentLon);
        });
};

function coordsFetch(lat, lon){
    var latestLat = lat;
    var latestLon = lon;
    var coordsfetchURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latestLat + '&lon=' + latestLon + '&appid=23116274a5a42433f230b2d7ad947f9a';
    console.log(latestLat, latestLon);
    fetch(coordsfetchURL)
        .then((res) => {return res.json()})        
        .then((data) => {
            console.log(data);
        })
}