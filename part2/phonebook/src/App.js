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
    console.log(newName)
  }

  function addDataToServer() {
    const noteObject = {
      name: newName.name.trim(),
      number: newName.number
    }

    personService
      .addContacts(noteObject)
      .then(res => {
        console.log("iiiiii ", res.data)
        console.log(res.data.data)
        setPersons(persons.concat({
          name: res.data.data.name,
          number: res.data.data.number
        }))
        setResults(persons.concat({
          name: res.data.data.name,
          number: res.data.data.number
        }))

        setNotiMsg({
          type: 'success',
          msg: `${res.data.data.name} added`
        })
        setTimeout(() => {
          setNotiMsg({})
        }, 5000)
      })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!checkIsExist(newName.name.toLowerCase())) {
      addDataToServer()
    } else {
      const needReplace = window.confirm(`${newName.name} is already added to phonebook, replace the old number with a new one?`)

      if (needReplace) {

        const foundContacts = persons.find(ele => ele.name.toLowerCase() === newName.name.trim().toLowerCase())
        const targetId = foundContacts._id
        const updatedContacts = {
          ...foundContacts,
          number: newName.number || 'unknown number'
        }

        personService
          .updateContacts(targetId, updatedContacts)
          .then(res => {
            const f = persons.map(ele => ele._id !== targetId ? ele : res.data)
            setPersons(f)
            setResults(f)
          })
          .catch(err => {
            const filtered = persons.filter(ele => ele._id !== targetId)
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
      }
    }
    document.querySelector('#nameField').value = ''
    document.querySelector('#numberField').value = ''
    setNewName({})
  }

  function handleDelete(id) {
    const foundContacts = persons.find((ele) => ele._id === id)

    console.log(id)

    const isDelete = window.confirm(`Delete ${foundContacts.name} ?`)

    if (isDelete) {
      personService
        .deleteContacts(id)
        .then(res => {
          const filtered = persons.filter(ele => ele._id !== id)

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
