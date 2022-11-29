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

  console.log(allCountries[0])
  const countries = allCountries
    .filter(ele => {
      return ele.name.common.toLowerCase().includes(country.toLowerCase())
    })
    .sort((a, b) => (a < b) ? -1 : (a > b) ? 1 : 0)


  return (
    <div className="App">
      <form>
        find countries <input onChange={handleChange} name='countries' value={country} />
      </form>
      <Output countries={countries} />
    </div>
  );
}

export default App;
