import { useSelector, useDispatch } from 'react-redux'
import { voteAction, addAction } from './actions/vote'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
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
      <Filter />
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm addAnec={addAnec} />
    </div>
  )
}

export default App