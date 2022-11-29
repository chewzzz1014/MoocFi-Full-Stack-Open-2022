import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [country, setCountry] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setAllCountries(res.data))

  }, [])

  function handleChange(e) {
    const { value } = e.target
    setCountry(value)
  }

  console.log(allCountries[0])

  let countriesEle;
  const countries = allCountries.filter(ele => {
    return ele.name.common.toLowerCase().includes(country.toLowerCase())
  })
    .sort((a, b) => (a < b) ? -1 : (a > b) ? 1 : 0)


  if (countries.length > 10) {
    countriesEle = <p>To many matches, specify another filter</p>
  } else if (countries.length == 1) {
    const c = countries[0]
    countriesEle = (
      <div>
        <h1>{c.name.common || 'not found'}</h1>
        <p>capital {c.capital}</p>
        <p>area {c.area}</p>
        <br />
        <b>languages</b>
        <ul>
          {Object.values(c.languages).map((l) => {
            return <li>{l}</li>
          })}
        </ul>
        <img src={c.flags.png} />
      </div>
    )
  }
  else if (countries.length <= 10) {
    countriesEle = countries.map((ele) => {
      return <p>{ele.name.common}</p>
    })
  }

  return (
    <div className="App">
      <form>
        find countries <input onChange={handleChange} name='countries' value={country} />
      </form>
      {countriesEle}
    </div>
  );
}

export default App;
