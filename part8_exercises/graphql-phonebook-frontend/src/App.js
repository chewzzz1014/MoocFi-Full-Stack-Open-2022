import {useQuery} from '@apollo/client'
import { ALL_PERSONS } from './queries'

function App() {
  // make queries
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      {result.data.allPersons.map(p => p.name).joi(', ')}
    </div>
  );
}

export default App;
