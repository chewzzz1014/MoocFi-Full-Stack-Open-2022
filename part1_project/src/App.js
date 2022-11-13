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
  const { part1, part2, part3, exercises1, exercises2, exercises3 } = props.contents
  return (
    <div>
      <Part part={part1} exercise={exercises1} />
      <Part part={part2} exercise={exercises2} />
      <Part part={part3} exercise={exercises3} />
    </div>
  )
}

function Total(props) {
  const { exercises1, exercises2, exercises3 } = props.contents

  return (
    <>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>

    </>
  )
}

function App() {

  const course = 'Half Stack application development'
  const contents = {
    part1: 'Fundamentals of React',
    exercises1: 10,
    part2: 'Using props to pass data',
    exercises2: 7,
    part3: 'State of a component',
    exercises3: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
      <Total contents={contents} />
    </div>
  )
}

export default App;
