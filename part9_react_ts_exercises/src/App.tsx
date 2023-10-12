import { CoursePart } from "./types"
import { assertNever } from "./utils"
import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"

function App() {
  const courseName = 'Half Stack Application Development'
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
  ]

  courseParts.forEach(part => {
    switch (part.kind) {
      case "basic":
        console.log(part.name, part.description, part.exerciseCount)
        break;
      case "group":
        console.log(part.name, part.exerciseCount, part.groupProjectCount)
        break;
      case "background":
        console.log(part.name, part.description, part.exerciseCount, part.backgroundMaterial)
        break;
      default:
        return assertNever(part)
    }
  })

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
