import { useState, useEffect } from 'react'
import axios from 'axios'
import { Note } from './types'

function App() {
  // use type parameter
  const [newNote, setNewNote] = useState('')
  const [notes, setNotes] = useState<Note[]>([
    {id: 1, content: 'testing'}
  ])

  useEffect(() => {
    // specify response data type
    axios.get('http://localhost:3001/notes')
      .then((response) => {
        console.log(response.data)
        setNotes(response.data as Note[])
      })
  }, [])

  const noteCreation = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const noteToAdd = {
      content: newNote,
      id: notes.length + 1
    }
    setNotes(notes.concat(noteToAdd))
    setNewNote('')
  }

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(n => (
          <li key={n.id}>{n.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
