import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Output(props) {

    const { country } = props
    const [weatherData, setWeatherData] = useState({})

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
            .then(res => setWeatherData(res.data))

    }, [])


    // console.log(weatherData.wind['speed'])
    const temp = weatherData && weatherData.main?.temp
    const speed = weatherData && weatherData.wind?.speed
    const icon = (Array.isArray(weatherData.weather)) && weatherData?.weather[0].icon
    console.log(icon)

    let countriesEle = (
        <div>
            <h1>{country.name.common || 'not found'}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <br />
            <b>languages</b>
            <ul>
                {Object.values(country.languages).map((l) => {
                    return <li>{l}</li>
                })}
            </ul>
            <img src={country.flags.png} />
            <br />
            <h2>Weather in {country.name.common}</h2>
            <p>tempature {temp} Celcius</p>
            <img src={`http://openweathermap.org/img/w/${icon}.png`} />
            <p>wind {speed} m/s</p>
        </div>
    )

    return (
        <div>
            {countriesEle}
        </div>
    )
}