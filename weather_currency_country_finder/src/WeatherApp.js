import {useState,useEffect} from "react"
import "./WeatherApp.css"
import axios from "axios"
import { DNASpinner } from "./spinners/DNASpinner"

export const GetWeather=()=>{
    const [value,setValue]=useState('')
    const [weather,setWeatherInfo]=useState(null)
    const [debouncedValue,setDebouncedValue]=useState(value)
    const [loading,setLoading]=useState(false)
    const handleChange=(event)=>{
        setValue(event.target.value)
    }
    useEffect(()=>{
        const handler=setTimeout(()=>{
            setDebouncedValue(value)
        },3000)
        return ()=>{
            clearInterval(handler)
        }
    },[value])
      useEffect(()=>{
        if(debouncedValue){
        getWeather()
        }
      },[debouncedValue])
    const getWeather=async()=>{
        setLoading(true)
        if(value!==""){
        const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=6789cc641f77b46fd0ba104436316b7d&units=metric`)
        console.log(response.data)
        setWeatherInfo(response.data)
         setLoading(false)

    }
    }

    return(
        <>
        <div className="title-container"><h1 className="title">Weather App</h1>  </div>
        <div className="search-box">
         
        <div className="wrap-input-17"><div className="search-box">
  <button className="btn-search" onClick={getWeather}>🔍</button>
  <input type="text" value={value} onChange={handleChange} className="input-search" placeholder="Search City..."/>
   </div>
     </div> 
     </div>
     {
        loading?(
        <DNASpinner/>
    )
         :(
            weather && (
            <div className="weather-container">
            <div className="weather-info">
                <h2>{weather.name}, {weather.sys.country}</h2>
                <p>Temperature: {weather.main.temp} °C</p>
                <p>Weather: {weather.weather[0].description}</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
            </div>
        ))
     }
     
        </>
    )
}