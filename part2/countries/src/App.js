import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Output from './components/Output'

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

  function handleClick(e) {
    const { value } = e.target
    setCountry(value)
  }

  const countries = allCountries
    .filter(ele => {
      return ele.name.common.toLowerCase().includes(country.toLowerCase())
    })
    .sort((a, b) => (a < b) ? -1 : (a > b) ? 1 : 0)

  function getOutput() {
    if (countries.length > 10) {
      return <p>To many matches, specify another filter</p>
    }
    else if (countries.length == 1) {

      console.log('111')
      return <Output country={countries[0]} />

    }
    else if (countries.length <= 10) {

      return countries.map((ele) => {
        return <p>{ele.name.common} <button onClick={handleClick} value={ele.name.common}>show</button></p>
      })

    }
  }


  return (
    <div className="App">
      <form>
        find countries <input onChange={handleChange} name='countries' value={country} />
      </form>

      {/* <Output
        countries={countries}
        handleClick={handleClick}
        country={country}
      /> */}
      {getOutput()}

    </div>
  );
}

export default App;
