import {gql, useQuery} from '@apollo/client'

const ALL_PERSONS = gql`
query{
  allPersons {
    name
    phone
    id
  }
}
`

function App() {
  // make queries
  const result = useQuery(ALL_PERSONS)

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
