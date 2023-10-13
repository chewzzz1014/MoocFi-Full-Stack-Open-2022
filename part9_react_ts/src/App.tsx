import { useState, useEffect } from 'react'
import { Note } from './types'
import { getAllNotes, createNote } from './services/noteService'

function App() {
  // use type parameter
  const [newNote, setNewNote] = useState('')
  const [notes, setNotes] = useState<Note[]>([
    {id: 1, content: 'testing'}
  ])

  useEffect(() => {
    getAllNotes().then(data => {
      setNotes(data)
    })
  }, [])

  const noteCreation = (e: React.SyntheticEvent) => {
    e.preventDefault()

    createNote({content: newNote}).then(data => {
      setNotes(notes.concat(data))
    })
    
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
