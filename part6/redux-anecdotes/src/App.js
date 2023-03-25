import { useSelector, useDispatch } from 'react-redux'
import { voteAction, addAction } from './actions/vote'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

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
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm addAnec={addAnec} />
    </div>
  )
}

export default App