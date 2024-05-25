import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'



function WeatherApp() {

    let apikey = "44c58b7748891f418d4c9e3b09c6aa0e";
    let [wicon, setWicon] = useState(clear_icon);

    async function search(){
        let inputfield = document.querySelector('.search-label')
        if(inputfield.value===""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputfield.value}&units=Metric&appid=${apikey}`
        let data;
        try{
            let response = await fetch(url);
            data = await response.json();
        
            let humidityper = document.querySelector('.humidity-percent')
            let windspeed = document.querySelector('.wind-speed')
            let temp = document.querySelector('.weather-temp')
            let location = document.querySelector('.weather-location')

            temp.innerHTML = Math.floor(data.main.temp) +"°C";
            location.innerHTML = data.name;
            humidityper.innerHTML = Math.floor(data.main.humidity)+"%";
            windspeed.innerHTML = data.wind.speed + "km/h";

            if(data.weather[0].icon ==="01d" || data.weather[0].icon ==="01n"){
                setWicon(clear_icon)
            }
            else if(data.weather[0].icon ==="02d" || data.weather[0].icon ==="02n" || data.weather[0].icon ==="03d" || data.weather[0].icon ==="03n"){
                setWicon(cloud_icon)
            }
            else if(data.weather[0].icon ==="04d" || data.weather[0].icon ==="04n" || data.weather[0].icon ==="09d" || data.weather[0].icon ==="09n"){
                setWicon(drizzle_icon)
            }
            else if(data.weather[0].icon ==="10d" || data.weather[0].icon ==="10n" || data.weather[0].icon ==="11d" || data.weather[0].icon ==="11n"){
                setWicon(rain_icon)
            }
            else{
                setWicon(snow_icon)
            }
        }
        catch(err){
            alert("Invalid City name");
            
        }
        
    }

  return (
    <div className='container'>
        <div className='search-bar'>
            <input type="text" className='search-label' placeholder='Search' />
            <div className='logo' onClick={()=>{search()}}>
                <img src={search_icon} alt='' className='search_icon' />
            </div>
        </div>
        <div className='weather-image'>
            <img src={wicon} alt="" />
        </div>
        <div className='weather-temp'>24°C</div>
        <div className='weather-location'>Hyderabad</div>
        <div className='data-container'>
            <div className='element'>
                <img src={humidity_icon} alt="" className='icon' />
                <div className='data'>
                    <div className='humidity-percent'>69%</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
            <div className='element'>
                <img src={wind_icon} alt="" className='icon' />
                <div className='data'>
                    <div className='wind-speed'>8 km/h</div>
                    <div className='text'> Wind Speed</div>
                </div>
            </div>
            
        </div>
        
    </div>
  )
}

export default WeatherApp