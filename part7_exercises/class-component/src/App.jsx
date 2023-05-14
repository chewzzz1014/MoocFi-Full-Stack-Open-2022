import React from 'react'

// React class component
class App extends React.Component {
  constructor(props) {
    super(props)

    // all states are stored as properties of this.state
    // initialize this.state
    this.state = {
      anecdotes: [],
      current: 0
    }
  }

  render() {
    // if no anecdote render this
    if (this.state.anecdotes.length === 0) {
      return <div>no anecdotes...</div>
    }

    // else, render this
    return (
      <div>
        <h1>anecdote of the day</h1>
        <div>
          {this.state.anecdotes[this.state.current].content}
        </div>
        <button>next</button>
      </div>
    )
  }
}

export default App
