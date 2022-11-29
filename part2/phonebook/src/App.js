import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'

function App() {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState({})
  const [results, setResults] = useState(persons)

  useEffect(() => {
    console.log('effect')

    // before running the app, run `npm run server` to launch the json server with `persons` json
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        console.log(res)
        setPersons(res.data)
        setResults(persons)
      })
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setNewName((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const noteObject = {
      name: newName.name,
      number: newName.number
    }
    setPersons(persons.concat(noteObject))
    setResults(persons.concat(noteObject))
    alert(`${newName.name} is already added to phonebook`)
    setNewName('')
  }

  function filter(e) {
    const desired = e.target.value.toLowerCase()
    setResults(persons.filter((ele) => {
      return ele.name.toLowerCase().includes(desired)
    }))
  }

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Filter filter={filter} />

      <h2>Phonebook</h2>
      <PersonsForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newName={newName}
      />
      <h2>Numbers</h2>
      <Persons results={results} />

    </div>
  );
}

export default App;
