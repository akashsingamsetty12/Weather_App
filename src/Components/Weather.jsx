import React, { useEffect,useState ,useRef} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import cloud_icon from '../assets/cloud.png'

const Weather = () => {
    const [weatherData,setWeatherData]=useState(false);
    const inputRef=useRef();
    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":drizzle_icon,
        "03n":drizzle_icon,
        "04d":rain_icon,
        "04n":rain_icon,
        "09d":snow_icon,
        "09n":snow_icon,
    }

    const API_KEY ="d8c87cd101b60e8ab370c24ddbe3b694";
    const search=async(city)=>{
        if(city===""){
            alert("Please enter a city name");
            return;
        }
        
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const response=await fetch(url);
            const data=await response.json();
            console.log(data);
            const icon=allIcons[data.weather[0].icon]|| clear_icon;
            setWeatherData({
                humidity:data.main.humidity,
                temperature:parseFloat(data.main.temp),
                wind:data.wind.speed,
                location:data.name,
                icon: icon
            });
        } catch (error) {
        }
    };
    useEffect(() => {
        search("London");
    },[])
  return (
    <div className='weather'>
        <div className="searchbar">
            <input ref={inputRef} type="text" placeholder="Search..."/>
            <img src={search_icon} onClick={()=>search(inputRef.current.value)} alt="" />
        </div>
        <img src={weatherData.icon} alt="" className='weathericon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weatherdata1">
            <div className="col">
            <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
            <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.wind}Km/h</p>
                    <span>Wind speed</span>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Weather
