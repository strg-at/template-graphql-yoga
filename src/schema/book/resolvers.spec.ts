import { expect } from 'chai'
import { resolvers } from './resolvers'
import { ApiBook } from '../../data-sources/book'
import { Context } from '../../gateway'

describe('Books Resolver', () => {
  describe('Query.books', () => {
    const mockBooks: ApiBook[] = [
      {
        id: '1',
        title_en: 'All Quiet on the Western Front',
        title_de: 'Im Westen nichts Neues',
        author: 'Erich Maria Remarque',
      },
      {
        id: '2',
        title_en: 'The Little Prince',
        title_de: 'Der kleine Prinz',
        author: 'Antoine de Saint-Exupéry',
      },
    ]

    const mockFetchBooks = async (ids: string[] | undefined) => {
      if (ids?.length) {
        return mockBooks.filter((book) => ids?.includes(book.id))
      }
      return mockBooks
    }

    const mockContext = {
      dataSources: {
        booksDataSource: {
          fetchBooks: mockFetchBooks,
        },
      },
      language: 'en',
    } as unknown as Context

    it('should return all books', async () => {
      // @ts-ignore
      const result = await resolvers.Query.books(null, {}, mockContext)

      expect(result).to.deep.equal([
        {
          id: '1',
          title: 'All Quiet on the Western Front',
          author: 'Erich Maria Remarque',
        },
        {
          id: '2',
          title: 'The Little Prince',
          author: 'Antoine de Saint-Exupéry',
        },
      ])
    })

    it('should return books by ID', async () => {
      // @ts-ignore
      const result = await resolvers.Query.books(null, { ids: ['1'] }, mockContext)

      expect(result).to.deep.equal([
        {
          id: '1',
          title: 'All Quiet on the Western Front',
          author: 'Erich Maria Remarque',
        },
      ])
    })
  })
})
