import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"

function App() {
  const courseName = 'Half Stack Application Development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ]
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
