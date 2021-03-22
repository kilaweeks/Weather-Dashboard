
const today = new Date();  
const searchInput = document.getElementById("search-input");
const ul = document.querySelector("ul"); 



// Button submits input 
function getApi(event) { 
    
    const searchContent = searchInput.value.trim();

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchContent}&units=imperial&appid=fb2d2fe09203827547fcf79ecc2852af`; 

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchContent}&units=imperial&appid=fb2d2fe09203827547fcf79ecc2852af`;
    
    // const otherForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=fb2d2fe09203827547fcf79ecc2852af`; 
    
    // var lat = data.lat; 
    // var long = 

    
    fetch(currentUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data); 
        generateCurrentWeather(data); 
    }) 

    fetch(forecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data); 
        generateForecast(data); 
    }) 

}

// function findCity(userCity) {

// }

// List previous searches 
// function displaySearches(){}
var searchHistory = document.getElementById("search-history"); 
searchHistory.innerHTML = localStorage.getItem("Searches") || []; 

const submitButton = document.querySelector(".btn").addEventListener("click", onButtonClick);

let searchArray = []; 

function addSearch() {
    var searchContent = searchInput.value;
    searchArray.push(searchContent)   
    localStorage.setItem("Searches", searchArray);
}

function onButtonClick() {
    getApi(); 
    addSearch(); 
}

function generateCurrentWeather(data) {
    // Formats card 
    const cardBody = $('<div>').addClass('card-body').addClass("rounded");
    // Assigns variables to data from API and adds to cards
    const city = $('<h2>').addClass('card-title').text(data.name);
    const description = $('<p>').addClass("card-text").text(data.weather[0].description); 
    const icon = data.weather[0].icon;
    const img = new Image(); 
    img.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
    const temp = $("<p>").addClass("card-text").text("Temperature: " + Math.floor(data.main.temp) + "°F"); 
    const humidity = $("<p>").addClass("card-text").text("Humidity: " + (data.main.humidity) + "%"); 
    const windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH"); 
    // Writes card to page 
    cardBody.append(today.toDateString()); 
    cardBody.append(city);
    cardBody.append(description);
    cardBody.append(img); 
    cardBody.append(temp); 
    cardBody.append(humidity); 
    cardBody.append(windSpeed); 
    // Generates card
    const card = $('<div>').addClass('card').addClass("shadow-lg");
  
    card.append(cardBody);
    

    const weatherDiv = $('#weather-div');
    weatherDiv.append(card);


}
// Generates 5-day forecast
function generateForecast(data) {

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
        const card = $('<div>').addClass('card').addClass("mr-3 shadow-lg");

        card.append(cardBody);
        
        const forecastDiv = $("#forecast-div"); 
        forecastDiv.append(card); 

    }
}

// function generateCurrent(data) {
//     const div = $("<div>"); 
//     const city = $("<h5>").text(data.name); 
//     const description = $("<p>").text(data.weather[0].description); 
//     const temp = $("<p>").text(data.main.temp); 
//     const humidity = $("<p>").text(data.main.humidity); 
//     const windSpeed = $("<p>").text(data.wind.speed); 
  
//     // const date;         
//     // const uvIndex; 
//     // const wColor;
    
//     div.append(city); 
//     div.append(description); 
//     div.append(temp); 
//     div.append(humidity); 
//     div.append(windSpeed); 


//     const weatherDiv = $("#weather-div"); 
//     weatherDiv.append(div); 
// }