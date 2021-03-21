
const today = new Date();  
const searchInput = document.getElementById("search-input");
const ul = document.querySelector("ul"); 


// Button submits input 
function getApi(event) { 
    
    const searchContent = searchInput.value.trim();

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchContent}&units=imperial&appid=fb2d2fe09203827547fcf79ecc2852af`; 

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchContent}&units=imperial&appid=fb2d2fe09203827547fcf79ecc2852af`;
    
    
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
    const cardBody = $('<div>').addClass('card-body');
    const city = $('<h2>').addClass('card-title').text(data.name);
    const description = $('<p>').addClass("card-text").text(data.weather[0].description);

   let icon = data.weather[0].icon;
    
    const img = new Image(); 
    img.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
    const temp = $("<p>").addClass("card-text").text("Temperature: " + Math.floor(data.main.temp) + "°F"); 
    const humidity = $("<p>").addClass("card-text").text("Humidity: " + (data.main.humidity) + "%"); 
    const windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH"); 

    cardBody.append(today); 
    cardBody.append(city);
    cardBody.append(img); 
    cardBody.append(description);
    cardBody.append(temp); 
    cardBody.append(humidity); 
    cardBody.append(windSpeed); 
    
    const card = $('<div>').addClass('card').addClass('rounded').addClass('bg-primary');
  
    card.append(cardBody);
    

    const weatherDiv = $('#weather-div');
    weatherDiv.append(card);


}

function generateForecast(data) {

    for (i = 0; i < 5; i++) {


        const futureDate = new Date(today);
        const dateFormat = {year: "numeric", month: "numeric", day: "numeric"};
        futureDate.setDate(today.getDate() + i);
        const weekDay = `${futureDate.toLocaleDateString("en-US", {weekday: "long"})} ${futureDate.toLocaleDateString("en-US", dateFormat)}`

        const cardBody = $('<div>').addClass('card-body').addClass('bg-primary').addClass('w-70').addClass('rounded').addClass('mr-5');
        const dayOfWeek = $('<div>').addClass('card-title').text(weekDay)
         
        const description = $('<p>').addClass("card-text").text(data.list[i].description);
        const temp = $("<p>").addClass("card-text").text("Temperature: " + Math.floor(data.list[i].main.temp) + "°F"); 
        const humidity = $("<p>").addClass("card-text").text("Humidity: " + (data.list[i].main.humidity) + "%"); 
       
        cardBody.append(dayOfWeek); 
        cardBody.append(description);
        cardBody.append(temp); 
        cardBody.append(humidity); 
        

        const card = $('<div>').addClass('card');

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