document.getElementById('search-btn').addEventListener('click', function() {
    let countryName = document.getElementById('country-input').value;
    fetchCountryData(countryName);
});

async function fetchCountryData(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        displayCountryInfo(data[0]);
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

function displayCountryInfo(country) {
    const countryInfoContainer = document.getElementById('country-info');
    countryInfoContainer.innerHTML = `
        <div class="country-card">
            <h2>${country.name.common}</h2>
            <p>Population: ${country.population}</p>
            <p>Capital: ${country.capital}</p>
            <p>Region: ${country.region}</p>
            <p>Flag: <img src="${country.flags.png}" alt="Flag" width="100"></p>
            <button class="details-btn" onclick="fetchWeatherData('${country.name.common}')">More Details</button>
            <div id="weather-${country.name.common}"></div>
        </div>
    `;
}

async function fetchWeatherData(countryName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=5e3aa5082756e3115b789341009e13ca`);
        const data = await response.json();
        displayWeatherInfo(countryName, data.weather[0].description);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeatherInfo(countryName, weatherDescription) {
    const weatherContainer = document.getElementById(`weather-${countryName}`);
    weatherContainer.innerHTML = `<p>Weather: ${weatherDescription}</p>`;
}
