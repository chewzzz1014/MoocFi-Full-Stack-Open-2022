import {useQuery, useMutation, useQueryClient} from 'react-query'
import { getNotes, createNote, updateNote } from './requests'

// use react query to manage state
// do not need useState and useEffect anymore!

const App = () => {
  const queryClient = useQueryClient()

  // do something after mutation is executed
  // tell react query that old result of the query whose key is the string notes should be invalidated
  const newNoteMutation = useMutation(createNote, {
    onSuccess: () => {
      // React Query will automatically update a query with the key notes, i.e. fetch the notes from the server.
      // As a result, the application renders the up-to-date state on the server, i.e. the added note is also rendered.
      queryClient.invalidateQueries('notes')
    }
  })

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    // to mutate the state
    newNoteMutation.mutate({content, important: true})
  }

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important})
  }

  // useQuery:
  // first params: string acts as key to query
  // second params: function
  // return: object that indicates the status of the query
  const result = useQuery(
    'notes', getNotes)
  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App