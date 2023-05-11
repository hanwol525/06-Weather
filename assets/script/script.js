// TO DO:
// current/daily forecase
// --date (day.js for conversion)
// --icon representation of weather conditions
// 5-day forecast with:
// --date
// --icon representation of weather conditions

// API KEY: 23116274a5a42433f230b2d7ad947f9a


// intro message
var introMsg = document.getElementById("introMsg");

// search bar/history variables
var searchBar = document.getElementById("searchBar");
var submitBtn = document.getElementById("submitBtn");
var searchHistory = document.getElementById("example-dropdown");

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

// forecast section display variables
var dailyForecast = document.getElementById("daily-forecast");
var fivedayForecast = document.getElementById("fivedayForecast");
var dayOne = document.getElementById("firstday-forecast");
var dayTwo = document.getElementById("secondday-forecast");
var dayThree = document.getElementById("thirdday-forecast");
var dayFour = document.getElementById("fourthday-forecast");
var dayFive = document.getElementById("fifthday-forecast");

// sends last city to local storage
submitBtn.addEventListener("click", function(){
    var searchVal = searchBar.value;
    citynameFetch(searchVal);
    localStorage.setItem('last-city', JSON.stringify(searchVal));
    // appends last city to a dropdown menu
    var lastcityLS = JSON.parse(localStorage.getItem('last-city'));
    var lastcityBtn = document.createElement("button");
    lastcityBtn.textContent = lastcityLS.toUpperCase();
    lastcityBtn.className = "searchhistoryBtn"
    searchHistory.appendChild(lastcityBtn);
    console.log(searchHistory.childNodes[1].innerHTML);
    // triggers weather fetches
    lastcityBtn.addEventListener("click", function(){
        citynameFetch(lastcityLS);
    })
});

function clearDays(){
    dayOne.innerHTML = '';
    dayTwo.innerHTML = '';
    dayThree.innerHTML = '';
    dayFour.innerHTML = '';
    dayFive.innerHTML = '';
}

// geocodes based on city name
function citynameFetch(cityName){
    var geocodereqURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=23116274a5a42433f230b2d7ad947f9a';
    searchBar.value = '';
    introMsg.style.display = "none";
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

// uses coordinates to retrieve city name/data for daily and 5-day forecasts
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
        dailyForecast.innerHTML = '';

        var dailyArray = [];
        var todaysDate = dayjs().format('MM/DD');
        dailyArray.push(data.main.temp, data.wind.speed, data.main.humidity);

        var dateDisplay = document.createElement("p");
        dateDisplay.className = "displayText";
        var tempDisplay = document.createElement("p");
        tempDisplay.className = "displayText";
        var windDisplay = document.createElement("p");
        windDisplay.className = "displayText";
        var humDisplay = document.createElement("p");
        humDisplay.className = "displayText";
        dateDisplay.textContent = "Date: " + todaysDate;
        tempDisplay.textContent = "Temperature: " + String(dailyArray[0]) + "°F";
        windDisplay.textContent = "Wind speed: " + String(dailyArray[1]) + "MPH";
        humDisplay.textContent = "Humidity: " + String(dailyArray[2]) + "%";

        dailyForecast.append(dateDisplay, tempDisplay, windDisplay, humDisplay);

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
                var mainTemp = data.list[i].main.temp
                if (i >= 0 && i <= 7){
                    firstdayTemparray.push(mainTemp);
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
            };

            clearDays();

            var firstdayDisplay = ["Day One: "];
            var seconddayDisplay = ["Day Two: "];
            var thirddayDisplay = ["Day Three: "];
            var fourthdayDisplay = ["Day Four: "];
            var fifthdayDisplay = ["Day Five: "];

            dayjs(data.list[1].dt_txt).format('DD/MM');

            // pushing 5-day forecast info to display arrays
            firstdayDisplay.push(dayjs(data.list[1].dt_txt).format('MM/DD'), arrayAvg(firstdayTemparray), arrayAvg(firstdayWindarray), arrayAvg(firstdayHumarray));
            seconddayDisplay.push(dayjs(data.list[9].dt_txt).format('MM/DD'), arrayAvg(seconddayTemparray), arrayAvg(seconddayWindarray), arrayAvg(seconddayHumarray));
            thirddayDisplay.push(dayjs(data.list[17].dt_txt).format('MM/DD'), arrayAvg(thirddayTemparray), arrayAvg(thirddayWindarray), arrayAvg(thirddayHumarray));
            fourthdayDisplay.push(dayjs(data.list[25].dt_txt).format('MM/DD'), arrayAvg(fourthdayTemparray), arrayAvg(fourthdayWindarray), arrayAvg(thirddayHumarray));
            fifthdayDisplay.push(dayjs(data.list[33].dt_txt).format('MM/DD'), arrayAvg(fifthdayTemparray), arrayAvg(fifthdayWindarray), arrayAvg(fifthdayHumarray));
            // figure out how to do the weather condition icons

            arrayDisplay(firstdayDisplay, dayOne);
            arrayDisplay(seconddayDisplay, dayTwo);
            arrayDisplay(thirddayDisplay, dayThree);
            arrayDisplay(fourthdayDisplay, dayFour);
            arrayDisplay(fifthdayDisplay, dayFive);
        });
    return;
};

// displays temperature/wind speed/humidity
function arrayDisplay(array, daySection){
    var sectionHead = document.createElement("h2");
    var datedisplayEl = document.createElement("p");
    var tempdisplayEl = document.createElement("p");
    var winddisplayEl = document.createElement("p");
    var humdisplayEl = document.createElement("p");

    sectionHead.textContent = String(array[0]);
    sectionHead.className = "sectionHead";
    datedisplayEl.textContent = "Date: " + String(array[1])
    datedisplayEl.className = "displayText"
    tempdisplayEl.textContent = "Temperature: " + String(array[2]) + "°F";
    tempdisplayEl.className = "displayText";
    winddisplayEl.textContent = "Wind speed: " + String(array[3]) + "MPH";
    winddisplayEl.className = "displayText";
    humdisplayEl.textContent = "Humidity: " + String(array[4]) + "%";
    humdisplayEl.className = "displayText";
    daySection.append(sectionHead, datedisplayEl, tempdisplayEl, winddisplayEl, humdisplayEl);
    return;
};

// averages array objects and returns an integer
function arrayAvg(array){
   var initialTotal = 0;
   for (var i = 0; i < array.length; i++){
        initialTotal += array[i]
   }
   return Math.floor(initialTotal / array.length);
};

// imgs inside sections in HTML - X
// js to set attribute for the src
// dependent on weather type - get icon code in URL
// help