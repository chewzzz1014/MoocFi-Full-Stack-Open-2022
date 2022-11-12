const Welcome = () => {
  return (
    <div>
      <p><b>Welcome to React</b></p>
    </div>
  )
}

function App() {
  const now = new Date()
  const a = 10, b = 20

  return (
    <div>
      <Welcome />
      <p>Hello world, it's {now.toString()}</p>

      {/* every tag needs to be closed */}
      <br />

      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  );
}

export default App;
