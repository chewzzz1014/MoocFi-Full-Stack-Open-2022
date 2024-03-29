- The main principle of GraphQL is that the code on the browser forms a query describing the data wanted, and sends it to the API with an HTTP POST request. Unlike REST, all GraphQL queries are sent to the same address, and their type is POST.
- The content of the FetchBlogsQuery can be roughly interpreted as: find a user named "mluukkai" and for each of his followedUsers, find all their blogs, and for each blog, all its comments, and for each user who wrote each comment, find their blogs, and return the title of each of them.

```
query FetchBlogsQuery {
  user(username: "mluukkai") {
    followedUsers {
      blogs {
        comments {
          user {
            blogs {
              title
            }
          }
        }
      }
    }
  }
}
```

- Server's response would be about the following JSON object:

```
{
  "data": {
    "followedUsers": [
      {
        "blogs": [
          {
            "comments": [
              {
                "user": {
                  "blogs": [
                    {
                      "title": "Goto considered harmful"
                    },
                    {
                      "title": "End to End Testing with Cypress is most enjoyable"
                    },
                    {
                      "title": "Navigating your transition to GraphQL"
                    },
                    {
                      "title": "From REST to GraphQL"
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Schemas and Queries
- Schema: describes the data sent between the client and the server.
- Query: tells what kind of queries can be made to the API
- Example:

```
type Person {
  name: String!
  phone: String
  street: String!
  city: String!
  id: ID! 
}

type Query {
  personCount: Int!
  allPersons: [Person!]!
  findPerson(name: String!): Person
}
```
- personCount returns an integer
- allPersons returns a list of Person objects
- findPerson is given a string parameter and it returns a Person object.