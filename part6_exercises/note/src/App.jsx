import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

import {getAll} from './services/notes'
import { setNotes } from './reducers/noteReducer'
import { initializeNotes } from './reducers/noteReducer'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // getAll().then(notes => dispatch(setNotes(notes)))
    dispatch(initializeNotes())
  }, [])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
