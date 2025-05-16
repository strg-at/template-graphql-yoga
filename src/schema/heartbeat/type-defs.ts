import { gql } from 'graphql-modules'

export const typeDefs = gql`
  type Query {
    heartbeat: String!
  }
`
