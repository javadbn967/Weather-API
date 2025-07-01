async function getWeather() {
    const city = document.getElementById('cityInput').value.trim(); 
    if (!city) {
        document.getElementById('weatherResult').innerHTML = '<p class="error">Please write the name of the city!</p>';
        return;
    }
    const apiKey = '6b789cd52af1f529fb41187c40780ce1'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'The city was not received!');
        }
        const data = await response.json();
        const weather = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon">
            <p>Status: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
        document.getElementById('weatherResult').innerHTML = weather;

        const weatherStatus = data.weather[0].main.toLowerCase();
        document.body.className = '';
        if (weatherStatus.includes('clear')) document.body.className = 'clear';
        else if (weatherStatus.includes('cloud')) document.body.className = 'clouds';
        else if (weatherStatus.includes('rain')) document.body.className = 'rain';
        else if (weatherStatus.includes('snow')) document.body.className = 'snow';
        else document.body.className = 'clear';
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `<p class="error">${error.message}</p>`;
    }
}