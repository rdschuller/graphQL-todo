export const typeDefs = `#graphql
    type Todo {
        id: ID!
        task: String!
        completed: Boolean!
    }

    type Query {
        getTodos: [Todo]
    }
    type Mutation {
        addTodo(task: String!): Todo
        toggleComplete(id: ID!): Todo
    }
`