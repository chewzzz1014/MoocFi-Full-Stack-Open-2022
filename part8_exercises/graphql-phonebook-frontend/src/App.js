import {useQuery} from '@apollo/client'
import { ALL_PERSONS } from './queries'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import { useState } from 'react';
import PhoneForm from './components/PhoneForm';

function App() {
  // for handling mutation errors in PersonForm
  const [errorMessage, setErrorMessage] = useState(null)

  // make queries
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons}/>
      <PersonForm setError={notify}/>
      <PhoneForm setError={notify} />
    </div>
  );
}

const Notify = ({errorMessage}) => {
  if (!errorMessage)
    return null 
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default App;
