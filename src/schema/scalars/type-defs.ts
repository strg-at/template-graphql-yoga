import { gql } from 'graphql-tag'
import {
  DateTypeDefinition,
  DateTimeTypeDefinition,
  EmailAddressTypeDefinition,
  PositiveIntTypeDefinition,
  URLTypeDefinition,
} from 'graphql-scalars'

export const typeDefs = gql`
  ${DateTypeDefinition}
  ${DateTimeTypeDefinition}
  ${EmailAddressTypeDefinition}
  ${PositiveIntTypeDefinition}
  ${URLTypeDefinition}
`
