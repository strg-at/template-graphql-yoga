import { createModule } from 'graphql-modules'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'

export const scalars = createModule({
  id: 'scalars',
  typeDefs,
  resolvers,
})
