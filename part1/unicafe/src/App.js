import React from 'react'
import { useState } from 'react'

function Button(props) {
  return (
    <button onClick={props.clickHandler}>
      {props.text}
    </button>
  )
}

function StatisticLine(props) {

  if (props.text === 'positive') {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

function Stats(props) {
  const [good, neutral, bad, allRes] = props.moods;
  const all = good + neutral + bad;
  const avg = (good + -1 * bad) / all;
  const positivePect = good / all * 100;

  if (allRes.length === 0) {
    return (
      <table>
        <h1>statistics</h1>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='average' value={avg} />
        <StatisticLine text='positive' value={positivePect} />
      </table>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allRes, setAllRes] = useState([]);

  const goodHandler = () => {
    setGood(good + 1);
    setAllRes(allRes.concat['G'])
  }
  const neutralHandler = () => {
    setNeutral(neutral + 1);
    setAllRes(allRes.concat['N'])
  }
  const badHandler = () => {
    setBad(bad + 1);
    setAllRes(allRes.concat['B'])
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={goodHandler} text={good} />
      <Button clickHandler={neutralHandler} text={neutral} />
      <Button clickHandler={badHandler} text={bad} />
      <Stats moods={[good, neutral, bad, allRes]} />
    </div>
  )
}

export default App