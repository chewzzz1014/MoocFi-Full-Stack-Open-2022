import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction, addAction } from './actions/vote'
import { addNotification, removeNotification } from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const filter = useSelector(state => state.filter)
  let anecdotes = useSelector(state => state.anecdotes)
  let notifications = useSelector(state => state.notifications)

  const [hasNotification, setHasNotification] = useState(false)

  anecdotes = anecdotes.filter(a =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  )

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAction(id))
  }

  const addAnec = (e) => {
    e.preventDefault()
    dispatch(addAction(e.target.contentField.value))
    dispatch(addNotification(e.target.contentField.value))

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