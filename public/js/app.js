
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo= document.querySelector('#message-2');
const city = document.querySelector('#city');
const temp = document.querySelector('#temp');
const rain = document.querySelector('#rain');
const weather = document.querySelector('#weather');
const humidity = document.querySelector('#humidity');
const speed = document.querySelector('#speed');

// messageone.textContent = 'From Javascript'
weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = search.value
        messageone.textContent = 'Loading data.....'
        messagetwo.textContent = ''
        city.textContent = ''
        temp.textContent = ''
        rain.textContent = ''
        weather.textContent = ''
        humidity.textContent = ''
        speed.textContent = ''

        fetch('/weather?address='+ location).then((response) => {
            response.json().then((data) => {
                if(data.error){
                   messageone.textContent = data.error
                //    console.log(data.error)
                }else{
                    messageone.textContent = ''
                    city.textContent = data.location
                    temp.textContent = data.forecast.temperature
                    rain.textContent = data.forecast.precip
                    weather.textContent = data.forecast.weather_descriptions[0]
                    humidity.textContent = data.forecast.humidity
                    speed.textContent = data.forecast.wind_speed +'('+ data.forecast.wind_dir+ ')'
                    console.log(data.forecast.temperature)
                    console.log(data.forecast.precip)
                }
                // console.log(data)
            })
        })
    
  weatherForm.reset()
})