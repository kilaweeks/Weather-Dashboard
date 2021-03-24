// placement of shit
// local storage and search list 

const today = new Date();  
const searchInput = document.getElementById("search-input");
const ul = document.querySelector("ul"); 


// Call APIs 
function getApi(event) { 
    
    const searchContent = searchInput.value.trim();

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchContent}&units=imperial&appid=fb2d2fe09203827547fcf79ecc2852af`; 

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchContent}&units=imperial&appid=fb2d2fe09203827547fcf79ecc2852af`;
    
    
    fetch(currentUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        generateCurrentWeather(data); 
    }) 

    fetch(forecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        generateForecast(data); 
    }) 

}
// List previous searches 
var searchHistory = document.getElementById("search-history"); 

function displaySearches() {
    searchHistory.innerHTML = (JSON.parse(localStorage.getItem("Searches")) || []).map(function(searchItem) {
        return '<li class="list-group-item">' + searchItem + '</li>'; 
    }).join(""); 
}

const submitButton = document.querySelector(".btn").addEventListener("click", onButtonClick);

function addSearch() {
    let searchArray = JSON.parse(localStorage.getItem("Searches")) || []; 
    var searchContent = searchInput.value;
    searchArray.push(searchContent);    
    localStorage.setItem("Searches", JSON.stringify(searchArray));
}
// On button click, run these functions 
function onButtonClick() {
    getApi(); 
    addSearch(); 
    displaySearches();
}
// Generates current weather card 
function generateCurrentWeather(data) {
    // Formats card 
    const cardBody = $('<div>').addClass('card-body').addClass("card rounded blue");
    // Assigns variables to data from API and adds to cards
    const city = $('<h2>').addClass('card-title').text(data.name);
    const description = $('<p>').addClass("card-text").text(data.weather[0].description); 
    const icon = data.weather[0].icon;
    const img = new Image(); 
    img.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
    const temp = $("<p>").addClass("card-text").text("Temperature: " + Math.floor(data.main.temp) + "°F"); 
    const humidity = $("<p>").addClass("card-text").text("Humidity: " + (data.main.humidity) + "%"); 
    const windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH"); 
    // Generates card
    cardBody.append(city); 
    cardBody.append(today.toDateString()); 
    cardBody.append(description);
    cardBody.append(img); 
    cardBody.append(temp); 
    cardBody.append(humidity); 
    cardBody.append(windSpeed); 
  
    const card = $('<div>').addClass('card').addClass("shadow-lg");
    card.append(cardBody);
    
    // Writes card to page 
    const weatherDiv = $('#weather-div');
    // Clears previous search content 
    weatherDiv.empty(); 
    weatherDiv.append(card);
}
// Generates 5-day forecast
function generateForecast(data) {
    const forecastDiv = $("#forecast-div"); 
    // Clears previous search content 
    forecastDiv.empty(); 
    
    for (i = 0; i < 5; i++) {

        // Sets dates for next 5 days 
        const futureDate = new Date(today);
        const dateFormat = {year: "numeric", month: "numeric", day: "numeric"};
        futureDate.setDate(today.getDate() + i);
        const weekDay = `${futureDate.toLocaleDateString("en-US", {weekday: "long"})} ${futureDate.toLocaleDateString("en-US", dateFormat)}`
        const dayOfWeek = $('<div>').addClass('card-title').text(weekDay)
        // Formats cards for 5-day forecast
        const cardBody = $('<div>').addClass('card-body').addClass('bg-00ffff w-70 rounded')
        // Assigns variables to data from API and adds to cards 
        const description = $('<p>').addClass("card-text").text(data.list[i].description);
        
        var icon = data.list[i].weather[0].icon;
        var img = new Image(); 
        img.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 

        const temp = $("<p>").addClass("card-text").text("Temperature: " + Math.floor(data.list[i].main.temp) + "°F"); 
        const humidity = $("<p>").addClass("card-text").text("Humidity: " + (data.list[i].main.humidity) + "%"); 
       
        // Writes cards to page 
        cardBody.append(dayOfWeek); 
        cardBody.append(description);
        cardBody.append(img); 
        cardBody.append(temp); 
        cardBody.append(humidity); 
        
        
        // Formats cards
        const card = $('<div>').addClass('card').addClass("mr-3 shadow-lg blue");
        // Writes card to page 
        card.append(cardBody);
        forecastDiv.append(card); 

    }
}
// Display previous searches on page load 
displaySearches();