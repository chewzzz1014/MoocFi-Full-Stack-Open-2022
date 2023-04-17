import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQuery} from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import {useMutation, useQueryClient} from 'react-query'

const App = () => {
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const handleVote = (anecdote) => {
    console.log(anecdote.id)
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1
  })
  console.log(result)

  if (result.isLoading) {
    return <div>loading data</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
