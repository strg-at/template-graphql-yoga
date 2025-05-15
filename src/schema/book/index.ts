import { createModule } from 'graphql-modules'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'

export const books = createModule({
  id: 'books',
  dirname: __dirname,
  resolvers,
  typeDefs,
})
