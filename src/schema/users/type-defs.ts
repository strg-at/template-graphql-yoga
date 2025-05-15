import { gql } from 'graphql-modules'

// example types
export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String
    profileImage: String
  }

  type Query {
    getUserById(id: ID!): User
    getAllUsers: [User]
  }
`
