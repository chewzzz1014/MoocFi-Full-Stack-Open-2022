import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeAnecdotes, createAnecdote, voteAnecdoteActionCreator } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // getAll().then(anecdotes => dispatch(setAnecdote(anecdotes)))
    dispatch(initializeAnecdotes())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps  

  const filter = useSelector(state => state.filter)
  const [hasNotification, setHasNotification] = useState(false)
  let anecdotes = useSelector(state => state.anecdotes)

  useEffect(() => {
    console.log(hasNotification)
    setHasNotification(true)
  }, [anecdotes]) // eslint-disable-line react-hooks/exhaustive-deps  

  anecdotes = anecdotes.filter(a =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  )

  const vote = async (id) => {
    const content = anecdotes.find(a => a.id === id).content

    // update backend and state
    dispatch(voteAnecdoteActionCreator(id))
    // show notification
    dispatch(setNotification(`you voted ${content}`, 3000))
  }

  const addAnec = async (e) => {
    e.preventDefault()
    const content = e.target.contentField.value

    // update backend and state
    dispatch(createAnecdote(content))
    // show notification
    dispatch(setNotification(`added ${content}`, 3000))
  }

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm addAnec={addAnec} />
    </div>
  )
}

export default App