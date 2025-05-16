import { Resolvers } from '../resolvers-types'
import { ApiBook, apiBookToBook } from '../../data-sources/book'
import { logger } from '@strg/logging-winston'
import { Context } from '../../gateway'

export const resolvers: Resolvers = {
  Query: {
    books: async (_: unknown, { ids }, { dataSources, language }: Context) => {
      logger.debug('Books.resolver - Query.books call')
      return (await dataSources.booksDataSource.fetchBooks(ids ?? [])).map((course: ApiBook) =>
        apiBookToBook(course, language)
      )
    },
  },
}
