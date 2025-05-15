import { gql } from 'graphql-modules'

export const typeDefs = gql`
  type Query {
    errorCodes: [String]!
  }
`
