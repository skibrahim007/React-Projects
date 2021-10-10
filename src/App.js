import React, { useContext, useState, useEffect } from 'react';
import { ImSad} from 'react-icons/im'
const api = {key :'b8b4c7b2967f702ae4d45e9cbbe03e52',
            base: 'https://api.openweathermap.org/data/2.5/weather?'}

function App() {
const [query, setQuery] = useState('');
  const [weather, setWeather] = useState([]);
  const [notFound, setNotFound] = useState(false);

let city ='';
useEffect(()=>{
  fetchUserLoc();
},[])
  const getDate =(d) =>{
    const day = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const Month = ['January','Febrary','March','April','May','June','July','August','September','October','November','December']
    return day[d.getDay()] + "," + d.getDate() + " " + Month[d.getMonth()] + " " + d.getFullYear()
  }
const fetchUserLoc = () =>{
    fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=e84ca4053d0248b1bafc84db3b7ce98b')
      .then((res) => 
        res.json()
       )
    .then(result => {
      city = result.city;
    fetchWeather(city)}
  ).catch(error => {
      alert('No Internet Connection')
  })
}
const callFetch = (e) =>{
  if(e.key === "Enter"){  
      fetchWeather('');
  }
}
  const fetchWeather = (city) => {
    if (city === '' || city === null) {
      fetch(`${api.base}q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            setNotFound(true);
          } else {
            setNotFound(false);
          }
           return res.json();
        })
        .then(result => {
          setWeather(result)
          setQuery('');
        })
    }
    else {
      fetch(`${api.base}q=${city}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            setNotFound(true);
          } else {
            setNotFound(false);
          }
            return res.json();
        })
        .then(result => {
          setWeather(result)
        })
    }
  }
  return ( 
    <div className={
      typeof weather.main != 'undefined' ?
        (weather.weather[0].main === 'Clouds') ? 'app-clouds' :
          (weather.weather[0].main === 'Rain') ? 'app-rain' :
          (weather.weather[0].main === 'Haze') ? 'app-haze' :'app'
      : 'app'
    }>
      <main>
        <div className="search-box">
          <input className="search-bar" type="text" placeholder="Enter City"
          onChange={(e)=>setQuery(e.target.value)}
          value={query}
          onKeyPress={callFetch}/>
        </div>
        { 
          (notFound)?
        (<div className="not-found">
              Not Found
              <div className="logo">
                <ImSad/>
                </div>
        </div>)
        :(typeof weather.main != "undefined") ? (
          <div>
        <div className="location-box">
                <div className="location">{weather.name} , {weather.sys.country}</div>
          <div className="date">{getDate(new Date())}</div>    
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°c</div>
          <div className="weather ">{weather.weather[0].main}</div>
        </div> 
          </div>) : ('')  }
      </main>
    </div> 
  );
}

export default App;
