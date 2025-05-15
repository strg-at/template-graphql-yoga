import { createModule } from 'graphql-modules'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'

export const users = createModule({
  id: 'users',
  dirname: __dirname,
  resolvers,
  typeDefs,
})
