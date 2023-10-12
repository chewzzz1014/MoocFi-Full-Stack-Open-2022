import { courseParts } from "./types"
import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"

function App() {
  const courseName = 'Half Stack Application Development'

  const totalExercises = courseParts.reduce((total, part) => total + part.exerciseCount, 0)

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  )
}

export default App
