import ReactDOM from 'react-dom/client';
import App from './App';
import {
  ApolloClient, 
  ApolloProvider,
  InMemoryCache,
  gql
} from '@apollo/client'

const client = new ApolloClient({
  url: 'https://localhost:4000',
  cache: new InMemoryCache(),
})

const query = gql`
  query{
    allPersons {
      name,
      phone,
      address {
        street,
        city
      }
      id
    }
  }
`

client.query({query})
  .then((response) => {
    console.log(response.data)
  })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

