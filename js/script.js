



const searchInput = document.getElementById("search-input");


// Button submits input 
function getApi(event) { 
    console.log(searchInput); 
    const searchContent = searchInput.value.trim();
        // Pull from local storage 
        // Save to local storage 

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchContent}&units=imperial&appid=fb2d2fe09203827547fcf79ecc2852af`; 

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchContent}&units=imperial&appid=fb2d2fe09203827547fcf79ecc2852af`;

    
    fetch(currentUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data); 
        generateCard(data); 
    }) 

    fetch(forecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data); 
        // call function
    }) 
}

const submitButton = document.querySelector(".btn").addEventListener("click", getApi);

function generateCurrentWeather(data) {
    const div = $("<div>"); 
    const cityName = $("<h5>").text(data.name); 
    const description = $("<p>").text(data.weather[0].description); 
    const temp = $("<p>").text(data.main.temp); 
    const humidity = $("<p>").text(data.main.humidity); 
    const windSpeed = $("<p>").text(data.wind.speed); 
  
    // const date;         
    // const uvIndex; 
    // const wColor;
    
    div.append(cityName); 
    div.append(description); 
    div.append(temp); 
    div.append(humidity); 
    div.append(windSpeed); 


    const weatherDiv = $("#weather-div"); 
    weatherDiv.append(div); 
}


function generateCard(data) {
    const cardBody = $('<div>').addClass('card-body');
    const cityName = $('<h5>').addClass('card-title').text(data.name);
    const description = $('<p>').addClass("card-text").text(data.weather[0].description);
    const temp = $("<p>").addClass("card-text").text(data.main.temp); 
    const humidity = $("<p>").addClass("card-text").text(data.main.humidity);
    const windSpeed = $("<p>").addClass("card-text").text(data.wind.speed); 

    cardBody.append(cityName);
    cardBody.append(description);
    cardBody.append`Temperature: {temp} F`; 
    cardBody.append(humidity); 
    cardBody.append(windSpeed); 
    const image = $('<img>').addClass('card-img-top');
    const card = $('<div>').addClass('card');
    card.append(image);
    card.append(cardBody);
    

    const weatherDiv = $('#weather-div');
    weatherDiv.append(card);
}
