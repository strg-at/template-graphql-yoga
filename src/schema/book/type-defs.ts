import { gql } from 'graphql-modules'

export const typeDefs = gql`
  scalar PositiveInt
  scalar Date
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books(ids: [ID!]): [Book]!
  }
`
