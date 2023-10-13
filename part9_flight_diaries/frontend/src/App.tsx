import { useState, useEffect } from "react"
import Diary from "./components/Diary"
import Form from "./components/Form"
import { NonSensitiveEntries } from "./types"
import { getAllDiaries } from "./services/diaryService"

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveEntries[]>([])

  useEffect(() => {
    getAllDiaries()
      .then(data => setDiaries(data))
  }, [])

  return (
    <div>
      <Form diaries={diaries} setDiaries={setDiaries} />

      <h1>Diary entries</h1>
      {diaries.map((d, idx) => (
        <Diary key={idx} diary={d}/>
      ))}
    </div>
  )
}

export default App
