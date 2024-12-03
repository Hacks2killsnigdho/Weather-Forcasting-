const search = document.querySelector(".search");
function capitalizeEachWord(text) {
    return text
        .split(' ') // Split text into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' '); // Join the words back into a string
}


search.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const text = search.value;
        const location = capitalizeEachWord(text);
        console.log(location);
        
        const temp = document.querySelector(".temp")
        const city_name = document.querySelector(".name")
        const Time= document.querySelector(".time")
        const Date = document.querySelector(".date")
        const cloud = document.querySelector(".Cloud")
        const Humidity = document.querySelector(".Humidity")
        const Wind = document.querySelector(".Wind")
        const Condition = document.querySelector(".condition")

        const url = `https://api.weatherstack.com/current?access_key=a5f6b61790a6fd119c4de2f5f838d0de&query=${location}`;
        const options = {
            method: 'GET'
        };
        
        async function fetchWeatherData() {
            try {
                const response = await fetch(url, options);
                console.log(response);
                
                const data = await response.json(); 
                console.log(data);
                const { name, country, localtime } = data.location;
                const {cloudcover,temperature,weather_descriptions,weather_icons,wind_speed,humidity } = data.current;

                console.log(cloudcover,name,country,temperature,weather_descriptions,weather_icons,wind_speed);
                
                temp.innerText = temperature
                city_name.innerText = name
                Date.innerText = localtime
                Wind.innerText = `${wind_speed} Kms/hr`;
                Humidity.innerText = `${humidity} %`
                Condition.innerText = weather_descriptions
                cloud.innerText = `${cloudcover} %`



            } catch (error) {
                console.error(error);
            }
        }
        
        fetchWeatherData();
        
    }
});
