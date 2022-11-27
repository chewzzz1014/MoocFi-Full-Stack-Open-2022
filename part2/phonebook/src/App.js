import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'

function App() {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState({})
  const [results, setResults] = useState(persons)

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
