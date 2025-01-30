import React, { useState, useEffect } from 'react'
import axios from 'axios'
import humidity from "../assets/thermometer.gif";
import wind from "../assets/wind.gif";
import sun from "../assets/sunset.gif";
import Snow from "../assets/Snow.gif"
import Sunny from "../assets/sun.gif"
import Search from "../assets/search (1).png"
import cloudy from "../assets/cloudy.gif"
import partlycloud from "../assets/Partly cloudy.gif"
import Tornado from "../assets/tornado.gif"
import Rain from "../assets/rain.gif"
import snowstorm from "../assets/snow-storm.gif"
import storm from "../assets/Storm.gif"
import drizzle from "../assets/drizzle.gif"
import mist from "../assets/foggy.gif"
import smoke from "../assets/smoke.png"
import snowstick from "../assets/snow (1).gif"


const Card = () => {
  const [time, setTime] = useState("");
  const [city, setCity] = useState("Delhi")
  const [location, setLocation] = useState("")
  const [changeloc, setChange] = useState(null)
  const [temp, changeTemp] = useState(null)
  const [Weather, setWeather] = useState(null)
  const [hum, setHum] = useState(null)
  const [Wind, setwind] = useState(null)
  const [sunrise, setSunrise] = useState(null)
  const [sunset, setSunset] = useState(null)
  const [minutes, setMin] = useState(null)
  const [hours, setHours] = useState(null)
  const [weathlogo, setWeathlogo] = useState(null)
  






  useEffect(() => {

    if (sunrise && sunset) {

      let calculsec = sunset - sunrise
      let hrs = Math.floor(calculsec / 3600)
      let minu = Math.floor((calculsec % 3600) / 60)

      setHours(hrs)
      setMin(minu)

    }
  }, [sunset, sunrise])


  const Cityset = () => {

    if (!location && location == '') {
      alert("HEY IDIOT TYPE SOMETHING")
    }
    else {
      setCity(location)

}
   
  }

  const API_KEY = "01174097a49faa22b3d3d78ac1ae795c"


  useEffect(() => {

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    axios.get(API_URL)
      .then(response => {

     
        setChange(response.data)
        changeTemp(Math.round(response.data.main.temp))
        setWeather(response.data.weather[0].main)
        setHum(response.data.main.humidity)
        setwind(response.data.wind.speed)
        setSunrise(response.data.sys.sunrise)
        setSunset(response.data.sys.sunset)
       


      }).catch(error => {
        console.error(error);

      })

  }, [city])




  useEffect(() => {

    const currentTime = new Date()
    const ArrangeTime = currentTime.getHours() + ":" + currentTime.getMinutes()

    setTime(ArrangeTime)

  }, [])

  useEffect(() => {

    if (!Weather || temp === null) return;

    if (Weather == 'Clear' && temp < 9) {
      setWeathlogo(snowstick)
    }

    if (Weather == 'Clear' && temp >= 9) {
      setWeathlogo(Sunny)
    }

    if (Weather == 'Snow') {
      setWeathlogo(Snow)
    }

    if (Weather == 'Haze') {
      setWeathlogo(cloudy)
    }

    if (Weather == 'Clouds' && temp > 9) {
      setWeathlogo(partlycloud)
    }

    if (Weather == 'Tornado') {
      setWeathlogo(Tornado)
    }

    if (Weather == 'Rain') {
      setWeathlogo(Rain)
    }


    if (Weather == 'Thunderstorm') {
      setWeathlogo(storm)
    }

    if (Weather == 'Clouds' && temp < 9) {
      setWeathlogo(snowstorm)
    }

    if (Weather == 'Drizzle') {
      setWeathlogo(drizzle)
    }
    if (Weather == 'Mist') {
      setWeathlogo(mist)
    }

    if (Weather == 'Smoke') {
      setWeathlogo(smoke)
    }


  }, [Weather, city, temp])



  return (
    <div className='flex flex-col justify-center items-center w-[100%] gap-8'>
      <div className='h-[40vh] w-[25%] bg-[#FFFFFF] rounded-4xl' id='card'>

        <div className='flex w-full justify-between items-center px-7 py-5 text-[#4B515D] font-mono'>
          <h1 className='capitalize'>{city}</h1>
          <h2>{time}</h2>
        </div>

        <div className=' w-full flex items-center justify-center flex-col gap-1 '>
          <h1 className='text-5xl font-bold text-[#212121]'>{temp}°C</h1>
          <h2 className='text-[#4b515da2]'>{Weather}</h2>
        </div>

        <div className='flex w-full justify-between items-center p-6 pt-6 pl-3 px-6' id='lower'>
          <div className='flex items-center justify-center flex-col gap-1 p-4 ml-3'>

            <div className='flex justify-between items-center w-full gap-2 text-[#4B515D]'>

              <img src={humidity} alt="img" className='w-7' />
              <h2 className='text-start w-full text-md'>{hum}</h2>
            </div>
            <div className='flex justify-between items-center w-full gap-2 text-[#4B515D]'>

              <img src={wind} alt="img" className='w-7' />
              <h2 className='text-start w-full text-md'>{Wind}</h2>
            </div>
            <div className='flex justify-between items-center w-full gap-2 text-[#4B515D]'>

              <img src={sun} alt="img" className='w-7' />
              <h2 className='text-start w-full text-md'>{hours}.{minutes}h</h2>
            </div>
          </div>
          <div className='w-19 h-19 mr-5' id='logo'>
            <img src={weathlogo} alt="" className='h-full w-full' />
          </div>
        </div>
      </div>

      <div className='w-[25%] h-[7vh] bg-amber-200 rounded-4xl overflow-hidden relative' id='searchbar'>

        <input type="text" placeholder='Search City' className='h-full w-full bg-[#c8c8c8] px-5 outline-none border-none ' onChange={(e) => setLocation(e.target.value)} />
        <button className='h-[7vh] w-[3vw] bg-[amber-200] absolute right-0 cursor-pointer rounded-4xl' id='btn' onClick={Cityset}>
          <img src={Search} alt="search" className='w-7' />
        </button>

      </div>
    </div>

  )
}

export default Card