import React from 'react'

function Anecdote({anecdote}) {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  )
}

export default Anecdote
