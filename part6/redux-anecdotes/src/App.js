import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNotification, removeNotification, voteNotification } from './reducers/notificationReducer'
import { setAnecdote, addAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import { getAll, createNew, increaseVote} from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const [hasNotification, setHasNotification] = useState(false)

  useEffect(() => {
    getAll().then(anecdotes => dispatch(setAnecdote(anecdotes)))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps  

  let anecdotes = useSelector(state => state.anecdotes)
  anecdotes = anecdotes.filter(a =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  )

  console.log(anecdotes)

  const vote = async (id) => {
    // const content = anecdotes.find(a => a.id === id).content

    // update backend, state
    const updatedAnecdote = await increaseVote(id)
    dispatch(voteAnecdote(updatedAnecdote))
    dispatch(voteNotification(updatedAnecdote.content))

    setHasNotification(true)
    setTimeout(() => {
      dispatch(removeNotification(updatedAnecdote.content))
      setHasNotification(false)
    }, 3000)
  }

  const addAnec = async (e) => {
    e.preventDefault()
    const content = e.target.contentField.value

    // update backend
    const newAnecdote = await createNew(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch(addNotification(content))

    // show notifications for 3 seconds, then remove it
    setHasNotification(true)
    setTimeout(() => {
      dispatch(removeNotification(e.target.contentField.value))
      setHasNotification(false)
    }, 3000)
  }

  return (
    <div>
      {hasNotification && <Notification />}
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm addAnec={addAnec} />
    </div>
  )
}

export default App