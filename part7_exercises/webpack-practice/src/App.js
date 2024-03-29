import React, {useState, useEffect} from 'react'
import './index.css'
import axios from 'axios'

// custom hook
// refetch data when url is changed (dev/prod)
const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios.get(url).then(response => {
      setNotes(response.data)
    })
  }, [url])
  return notes
}

function App() {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])
  // get value from global constant
  const notes = useNotes(BACKEND_URL)

  const handleClick = () => {
    setCounter(counter+1)
    setValues(values.concat(counter))
  }

  return (
    <div className='container'>
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>
  )
}

export default App
