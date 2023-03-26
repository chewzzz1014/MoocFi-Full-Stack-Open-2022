import NewNote from './components/NewNote'
import Notes from './components/Notes'

function App() {
  const filterSelected = (value) => {

  }

  return (
    <div>
      <NewNote />
      <div>
        all
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('ALL')}
        />
        important
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('IMPORTANT')}
        />
        nonimportant
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('NONIMPORTANT')}
        />
      </div>
      <Notes />
    </div>
  )
}

export default App
