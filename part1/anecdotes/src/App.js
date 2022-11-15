import React from 'react'
import { useState } from 'react';

function Button(props) {
  return (
    <button onClick={props.handler}>
      {props.text}
    </button>
  )
}

function Anecdote(props) {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {props.text}
        <br />
        has {props.vote} votes
      </p>
    </div>
  )
}


function MostVotedAnecdote(props) {

  let mostVoted = props.votes[0];
  let mostVotedIdx = 0;
  props.votes.forEach((ele, idx) => {
    if (ele > mostVoted) {
      mostVoted = ele;
      mostVotedIdx = idx;
    }
  })

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>
        {props.anecdotes[mostVotedIdx]}
        <br />
        has {mostVoted} votes
      </p>
    </div>
  )
}

function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0);

  const points = [
    0, 0, 0, 0, 0, 0, 0
  ]
  const [votes, setVotes] = useState(points);

  const randomQuote = () => {
    console.log("old selected", selected)
    setSelected(Math.floor(Math.random() * (anecdotes.length)))
    console.log("new selected", selected)
  }

  const voting = () => {
    console.log("old =votes arr", votes)

    let votesCopy = [...votes];
    votesCopy[selected] = votes[selected] + 1;
    setVotes(votesCopy)
    console.log("new votes arr", votes)
  }

  return (
    <div>
      <Anecdote text={anecdotes[selected]} vote={votes[selected]} />
      <Button handler={voting} text='vote' />
      <Button handler={randomQuote} text='next anecdote' />
      <MostVotedAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App