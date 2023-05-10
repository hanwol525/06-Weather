// TO DO:
// way to display current conditions for a city
// --the date (day.js for conversion)
// --icon representation of weather conditions
// 5-day forecast (limit) with:
// --date
// --icon representation of weather conditions

// API KEY: 23116274a5a42433f230b2d7ad947f9a


// element selection variables
var searchBar = document.getElementById("searchBar");
var submitBtn = document.getElementById("submitBtn");
var searchHistory = document.getElementById("search-history");

// arrays for daily forecast
var dailyTemparray = [];
var dailyWindarray = [];
var dailyHumarray = [];

// arrays for averaging temperature in 5-day forecast
var firstdayTemparray = [];
var seconddayTemparray = [];
var thirddayTemparray = [];
var fourthdayTemparray = [];
var fifthdayTemparray = [];

// arrays for averaging wind speed in 5-day forecast
var firstdayWindarray = [];
var seconddayWindarray = [];
var thirddayWindarray = [];
var fourthdayWindarray = [];
var fifthdayWindarray = [];

// arrays for averaging humidity in 5-day forecast
var firstdayHumarray = [];
var seconddayHumarray = [];
var thirddayHumarray = [];
var fourthdayHumarray = [];
var fifthdayHumarray = [];

// arrays for displays
var firstdayDisplay = [];
var seconddayDisplay = [];
var thirddayDisplay = [];
var fourthdayDisplay = [];
var fifthdayDisplay = [];

// sends last city to local storage
submitBtn.addEventListener("click", function(){
    var searchVal = searchBar.value;
    citynameFetch(searchVal);
    localStorage.setItem('last-city', JSON.stringify(searchVal));

    // append last city to a list under searchbar
    var lastcityLS = JSON.parse(localStorage.getItem('last-city'));
    var lastcityBtn = document.createElement("button");
    lastcityBtn.textContent = lastcityLS;
    // figure out way to do title/sentence case for city
    lastcityBtn.style.display = "block";
    searchHistory.appendChild(lastcityBtn);
    lastcityBtn.addEventListener("click", function(){
        citynameFetch(lastcityLS);
    })
});


// geocodes based on city name
function citynameFetch(cityName){
    var geocodereqURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=23116274a5a42433f230b2d7ad947f9a';
    fetch(geocodereqURL)
        .then((res) => {return res.json()
        // maybe set up 404 response if time
        })
        .then((data) => {
            var currentLat = data[0].lat;
            var currentLon = data[0].lon;
            coordsFetch(currentLat, currentLon);
        });
    return;
};

// uses coordinates to retrieve city name for 5-day forecast
function coordsFetch(lat, lon){
    // urls for api calls
    var fivedaycoordsFetchURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=23116274a5a42433f230b2d7ad947f9a&units=imperial';
    var dailycoordsFetchURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=23116274a5a42433f230b2d7ad947f9a&units=imperial';

    // call for daily forecast
    fetch(dailycoordsFetchURL)
    .then((res) => {
        return res.json()
    })

    .then((data) => {
        console.log(data)

        dailyTemparray.push(data.main.temp);
        dailyWindarray.push(data.wind.speed);
        dailyHumarray.push(data.main.humidity);
    });

    // call for 5-day forecast
    fetch(fivedaycoordsFetchURL)
        .then((res) => {
            return res.json()
        }) 
      
        .then((data) => {
            console.log(data);

            // loop to get 5-day temperature/wind speed/humidity averages
            for (var i = 0; i < data.list.length; i++){
                if (i >= 0 && i <= 7){
                    firstdayTemparray.push(data.list[i].main.temp);
                    firstdayWindarray.push(data.list[i].wind.speed);
                    firstdayHumarray.push(data.list[i].main.humidity);
                } else if (i >= 8 && i <= 15) {
                    seconddayTemparray.push(data.list[i].main.temp);
                    seconddayWindarray.push(data.list[i].wind.speed);
                    seconddayHumarray.push(data.list[i].main.humidity);
                } else if (i >= 16 && i <= 23) {
                    thirddayTemparray.push(data.list[i].main.temp);
                    thirddayWindarray.push(data.list[i].wind.speed);
                    thirddayHumarray.push(data.list[i].main.humidity);
                } else if (i >= 24 && i <= 31){
                    fourthdayTemparray.push(data.list[i].main.temp);
                    fourthdayWindarray.push(data.list[i].wind.speed);
                    fourthdayHumarray.push(data.list[i].main.humidity);
                } else if (i >= 32 && i <= 39){
                    fifthdayTemparray.push(data.list[i].main.temp);
                    fifthdayWindarray.push(data.list[i].wind.speed);
                    fifthdayHumarray.push(data.list[i].main.humidity);
                }
            }

            // pushing 5-day forecast info to display arrays
            firstdayDisplay.push(arrayAvg(firstdayTemparray), arrayAvg(firstdayWindarray), arrayAvg(firstdayHumarray));
            seconddayDisplay.push(arrayAvg(seconddayTemparray), arrayAvg(seconddayWindarray), arrayAvg(seconddayHumarray));
            thirddayDisplay.push(arrayAvg(thirddayTemparray), arrayAvg(thirddayWindarray), arrayAvg(thirddayHumarray));
            fourthdayDisplay.push(arrayAvg(fourthdayTemparray), arrayAvg(fourthdayWindarray), arrayAvg(thirddayHumarray));
            fifthdayDisplay.push(arrayAvg(fifthdayTemparray), arrayAvg(fifthdayWindarray), arrayAvg(fifthdayHumarray));

            // figure out how to do the weather condition icons
        });
        
    
    

    return;
};

// displays temperature/wind speed/humidity
function displayTime(){
}

// averages array objects and returns an integer
function arrayAvg(array){
   var initialTotal = 0;
   for (var i = 0; i < array.length; i++){
        initialTotal += array[i]
   }
   return Math.floor(initialTotal / array.length);
};