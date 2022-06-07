import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import  clima from './img/clima.png'
let tempC=0
let tempF=0
function App() {
  const [position, setposition] = useState()
  const [Wheather, setWheather] = useState()
  const [refresh, setrefresh] = useState(true)

  useEffect(()=>{
    const success=(coords)=>{
      const lat=coords.coords.latitude
      const lon=coords.coords.longitude 
      setposition({lat,lon}) 
    }
    navigator.geolocation.getCurrentPosition(success)

  },[refresh])
  useEffect(() => {
    if(position!==undefined){ 
      const key='d993d119ca66d0a611399e0a7acadf4a'
      const URL=`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${key}`
      //console.log(URL)
      axios.get(URL).then(res=>setWheather(res.data)).catch(err=>console.log(err))   
    }
  }, [position])

const ref=()=>{
  setrefresh(!refresh)
}
tempC=Wheather?.main.temp-273,15
tempF=tempC*9/5+32
  return (
    <div className="App">
      <div className='container'>
        <h2>Weather App</h2>
        <h2>City: {Wheather?.name}</h2>
        <div className='body'>
            <div className='x'>
              <img src={clima} alt="" />
              <h2>{refresh?(tempC).toFixed(2):(tempF).toFixed(2)} <b>{refresh?'°C':'°F'}</b></h2>
            </div>
            <div className='x'>
                <p><b>{Wheather?.weather[0].description}</b></p>
                <p><a href=""><b>Wind speed:</b></a> {Wheather?.wind.speed} <b>m/s</b></p>
                <p><a href=""><b>Clouds:</b></a> {Wheather?.main.humidity} <b>%</b></p>
                <p><a href=""><b>Pressure:</b></a> {Wheather?.main.pressure} <b>hPa</b></p>
            </div>
        </div>
        <button onClick={ref}><b>Degrees °{refresh?'F':'C'}</b></button>
    </div>
    </div>
  )
}

export default App
 //'e925a3fd70af57c04bb6f2ec026e26d3'
