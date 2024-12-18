//get your elements
const searchInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');

//add event listener to search button
searchButton.addEventListener('click', async function(){
    //check if input is empty
    if(searchInput.value === ''){
        alert('Please enter a city name.');
        return;
    }

    //fetch weather data from API
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=101b268e9bfa7981d35defd616a8a175`);
        if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        //display weather information
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching weather data.');
    
        //clear weather information
        weatherInfo.innerHTML = '';
    
        //reset input field
        searchInput.value = '';
    
        //display error message
        weatherInfo.innerHTML = '<p>Error fetching weather data.</p>';
    
        //remove error message after 3 seconds
        setTimeout(() => {
            weatherInfo.innerHTML = '';
        }, 3000);
    
        //disable search button
        searchButton.disabled = true;
    } finally {
        //enable search button after 5 seconds
        setTimeout(() => {
            searchButton.disabled = false;
        }, 5000);
    }

})