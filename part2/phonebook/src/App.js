import React, { useState, useEffect } from 'react'
import PersonsForm from './components/PersonsForm'
import personService from './services/persons'
import comp from './components/Persons'
import Notification from './components/Notification'
import './App.css'

const { Filter, Persons } = comp

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState({})
  const [results, setResults] = useState([])
  const [notiMsg, setNotiMsg] = useState({})

  useEffect(() => {

    // before running the app, run `npm run server` to launch the json server with `persons` json
    personService
      .getAllContacts()
      .then(res => {
        console.log(res)
        setPersons(res.data)
        setResults(res.data)
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
        name: newName.name.trim(),
        number: newName.number
      }

      personService
        .addContacts(noteObject)
        .then(res => {
          console.log(res.data)
          setPersons(persons.concat(res.data))
          setResults(persons.concat(res.data))

          setNotiMsg({
            type: 'success',
            msg: `${res.data.name} added`
          })
          setTimeout(() => {
            setNotiMsg({})
          }, 5000)
        })

    } else {
      const needReplace = window.confirm(`${newName.name} is already added to phonebook, replace the old number with a new one?`)

      if (needReplace) {

        const foundContacts = persons.find(ele => ele.name.toLowerCase() === newName.name)

        try {

          const targetId = foundContacts.id
          const updatedContacts = {
            ...foundContacts,
            number: newName.number
          }

          personService
            .updateContacts(targetId, updatedContacts)
            .then(res => {
              const f = persons.map(ele => ele.id !== targetId ? ele : res.data)
              setPersons(f)
              setResults(f)
            })
            .catch(err => {
              const filtered = persons.filter(ele => ele.id !== targetId)
              setPersons(filtered)
              setResults(filtered)

              setNotiMsg({
                type: 'error',
                msg: `Information of ${foundContacts.name} has already been removed from server!`
              })
              setTimeout(() => {
                setNotiMsg({})
              }, 5000)
            })
        } catch (err) {
          setNotiMsg({
            type: 'error',
            msg: `Contacts Not Found! It has been removed.`
          })
          setTimeout(() => {
            setNotiMsg({})
          }, 5000)

          const f = persons.filter(ele => ele.name !== newName.name)
          setPersons(f)
          setResults(f)
        }
      }
    }
    setNewName('')
  }

  function handleDelete(id) {
    const foundContacts = persons.find((ele) => ele.id === id)

    console.log(id)

    const isDelete = window.confirm(`Delete ${foundContacts.name} ?`)

    if (isDelete) {
      personService
        .deleteContacts(id)
        .then(res => {
          const filtered = persons.filter(ele => ele.id !== id)

          setPersons(filtered)
          setResults(filtered)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  function checkIsExist(name) {
    let isExist = false
    persons.forEach((ele) => {
      if (ele.name.toLowerCase() === name)
        isExist = true
    })
    return isExist
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
      <Notification notiMsg={notiMsg} />
      <Filter filter={filter} />

      <h2>Add a New Contacts</h2>
      <PersonsForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newName={newName}
      />
      <h2>Numbers</h2>
      <Persons persons={results} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
