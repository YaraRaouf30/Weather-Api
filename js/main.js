const apiKey = `648d3db9144248efbe303010232102`
let searchBtn= document.getElementById("findCity")
let searchInput= document.getElementById("searchInput")

let city= searchInput.value
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentweather = {}



async function searchTemperature(city){

    console.log(city);
    let api =`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
    let res = await fetch(api)
    let data = await res.json()
    console.log(data)
    currentweather=data
displayCurrent()
displayNextDays()
}

searchInput.addEventListener("blur",function(){
    
    searchTemperature(searchInput.value)

})


function displayCurrent(){
    
       let temp = `<h5 class="text-start" id="country">${currentweather.location.name}</h5>
       <div class="weather d-flex justify-content-around">
           <h1>${currentweather.current.temp_c}<sup>o</sup>C</h1>
           <img src="${"https://"+currentweather.current.condition.icon}" id="iconImage">
       </div>
      
       <p>${currentweather.current.condition.text}</p>
       <div class="icons">
         <i class="fa-solid fa-umbrella pe-1"></i><span class="pe-3">${currentweather.current.cloud}%</span>
         <i class="fa-solid fa-wind pe-1"></i><span class="pe-3">${currentweather.current.wind_kph}</span>
         <i class="fa-regular fa-compass pe-1"></i><span class="pe-3">${currentweather.current.wind_dir}</span>
       </div>`
      
document.getElementById("currentWeather").innerHTML = temp

let day =new Date(`${currentweather.forecast.forecastday[0].date}`)
document.getElementById("currentDay").innerHTML = weekday[day.getDay()]
let date =`${currentweather.forecast.forecastday[0].date}`
document.getElementById("currentDate").innerHTML = date

// let date =new Date(`${currentweather.forecast.forecastday[0].date}`)
// document.getElementById("currentDate").innerHTML = monthNames[date.getMonth()]
        
    }

    function displayNextDays(){

        let temp= `<img src="${"https://"+currentweather.forecast.forecastday[1].day.condition.icon}">
        <h4>${currentweather.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h4>
        <h6>${currentweather.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</h6>
          
           <p>${currentweather.forecast.forecastday[1].day.condition.text}</p>`

           document.getElementById("nextDay").innerHTML= temp

           let next =new Date(`${currentweather.forecast.forecastday[1].date}`)
           document.getElementById("next").innerHTML = weekday[next.getDay()]


        let dayAfter= `<img src="${"https://"+currentweather.forecast.forecastday[2].day.condition.icon}">
        <h4>${currentweather.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h4>
        <h6>${currentweather.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</h6>
          
           <p>${currentweather.forecast.forecastday[2].day.condition.text}</p>`

           document.getElementById("dayAfter").innerHTML= dayAfter
        
           let after =new Date(`${currentweather.forecast.forecastday[2].date}`)
           document.getElementById("after").innerHTML = weekday[after.getDay()]
    }
    
    searchTemperature("Alexandria")




