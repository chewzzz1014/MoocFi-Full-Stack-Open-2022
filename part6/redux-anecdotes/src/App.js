import { useSelector, useDispatch } from 'react-redux'
import { voteAction, addAction } from './actions/vote'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAction(id))
  }

  const addAnec = (e) => {
    e.preventDefault()
    dispatch(addAction(e.target.contentField.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnecdoteForm addAnec={addAnec} />
    </div>
  )
}

export default App