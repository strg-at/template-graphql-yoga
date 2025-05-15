import { createModule } from 'graphql-modules'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'

export const errorCodes = createModule({
  id: 'errorCodes',
  dirname: __dirname,
  resolvers,
  typeDefs,
})
