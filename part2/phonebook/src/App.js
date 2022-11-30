import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonsForm from './components/PersonsForm'
import personService from './services/persons'
import comp from './components/Persons'

const { Filter, Persons } = comp

function App() {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState({})

  useEffect(() => {
    console.log('effect')

    // before running the app, run `npm run server` to launch the json server with `persons` json
    personService
      .getAllContacts()
      .then(res => {
        console.log(res)
        setPersons(res.data)
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

    if (!checkIsExist(newName.name.toLowerCase())) {

      const noteObject = {
        name: newName.name,
        number: newName.number
      }

      personService
        .addContacts(noteObject)
        .then(res => {
          console.log(res)
          setPersons(persons.concat(noteObject))
        })

      alert(`${newName.name} is already added to phonebook`)

    } else {
      const needReplace = window.confirm(`${newName.name} is already added to phonebook, replace the old number with a new one?`)

      if (needReplace) {
        const foundContacts = persons.find(ele => ele.name.toLowerCase() === newName.name)
        const targetId = foundContacts.id
        const updatedContacts = {
          ...foundContacts,
          number: newName.number
        }

        personService
          .updateContacts(targetId, updatedContacts)
          .then(res => {
            setPersons(persons.map(ele => ele.id !== targetId ? ele : res))
          })
          .catch(err => {
            alert(`${foundContacts.name} was already deleted from server!`)
            setPersons(persons.filter(ele => ele.id !== targetId))
          })

      }
    }

    setNewName('')
  }

  function checkIsExist(name) {
    let isExist = false
    persons.forEach((ele) => {
      if (ele.name.toLowerCase() === name)
        isExist = true
    })
    return isExist
  }

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Filter />

      <h2>Phonebook</h2>
      <PersonsForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newName={newName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
}

export default App;
