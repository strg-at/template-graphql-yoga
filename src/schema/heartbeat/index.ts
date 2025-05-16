import { createModule } from 'graphql-modules'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'

export const heartbeat = createModule({
  id: 'heartbeat',
  dirname: __dirname,
  resolvers,
  typeDefs,
})
