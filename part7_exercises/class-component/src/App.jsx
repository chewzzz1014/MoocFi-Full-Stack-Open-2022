import React from 'react'
import axios from 'axios'

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

  // lifecycle method
  // executed once right after the first time component renders
  componentDidMount = () => {
    axios.get('http://localhost:3001/anecdotes')
      .then((response) => {
        // only updates 1 state
        this.setState({
          anecdotes: response.data
        })
      })
  }

  handleClick = () => {
    // jumps to random anecdote
    const current = Math.floor(Math.random()  * this.state.anecdotes.length)
    this.setState({current})
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
        <button onClick={this.handleClick}>next</button>
      </div>
    )
  }
}

export default App
