const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')

let persons = [
    {
        name: "Arto Hellas",
        phone: "040-123543",
        street: "Tapiolankatu 5 A",
        city: "Espoo",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Matti Luukkainen",
        phone: "040-432342",
        street: "Malminkaari 10 A",
        city: "Helsinki",
        id: '3d599470-3436-11e9-bc57-8b80ba54c431'
    },
    {
        name: "Venla Ruuska",
        street: "Nallemäentie 22 C",
        city: "Helsinki",
        id: '3d599471-3436-11e9-bc57-8b80ba54c431'
    },
]

// define graphql schema and query
// mutation: to perform all operations which cause a change
const typeDefs = `
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person!]!
        findPerson(name: String!): Person
    }

    type Mutation {
        name: String!
        phone: String
        street: String!
        city: String!
    }: Person
`

// server resolver
// define how GraphQL queries are responded to
// correspond to query in schema
//  field has default resolver if resolver is not defined
/*
 *   Person: {    
 *      name: (root) => root.name,    
 *      phone: (root) => root.phone,    
 *      street: (root) => root.street,    
 *      city: (root) => root.city,    
 *      id: (root) => root.id  
 * }
 */
const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => 
            persons.find(p => p.name === args.name)
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

// define graphql server
const server = new ApolloServer({
    typeDefs,
    resolvers 
})

// start server
startStandaloneServer(server, {
    listen: {port: 4000},
}).then(({url}) => {
    console.log(`Server ready at ${url}`)
})