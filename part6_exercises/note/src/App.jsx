import store from './store/store'
import {
  createNote,
  toggleImportanceOf
} from './reducers/noteReducer'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import NewNote from './components/NewNote'

function App() {
  // to dispatch actions
  const dispatch = useDispatch()
  // to access state
  const notes = useSelector(state => state)

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <NewNote />
      <ul>
        {notes.map(note => (
          <li
            key={note.id}
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
