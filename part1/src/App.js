function App() {
  const now = new Date()
  const a = 10, b = 20

  return (
    <div>
      <p>Hello world, it's {now.toString()}</p>
      <p>
        {a} plue {b} is {a + b}
      </p>
    </div>
  );
}

export default App;
