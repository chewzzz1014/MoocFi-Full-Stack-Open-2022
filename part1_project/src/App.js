function Header(props) {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

function Part(props) {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  )
}

function Content(props) {
  const { part1, part2, part3 } = props.contents
  return (
    <div>
      <Part part={part1.name} exercise={part1.exercises} />
      <Part part={part2.name} exercise={part2.exercises} />
      <Part part={part3.name} exercise={part3.exercises} />
    </div>
  )
}

function Total(props) {
  const { part1, part2, part3 } = props.contents

  return (
    <>
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>

    </>
  )
}

function App() {

  const course = 'Half Stack application development'
  const contents = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
      <Total contents={contents} />
    </div>
  )
}

export default App;
