import { Config } from '../../utils/config/config'
import { BaseDataSource } from '../base-data-source'
import { LANG } from '../../utils/get-language-header'

export type ApiBook = {
  id: string
  title_en: string
  title_de: string
  author: string
}

export const apiBookToBook = (apiBook: ApiBook, language: LANG) => {
  return {
    id: apiBook.id,
    title: apiBook[`title_${language}`],
    author: apiBook.author,
  }
}

export default class BooksDataSource extends BaseDataSource {
  constructor(protected config: Config) {
    super()
    this.url = config.app.datasources.booksApi.url
  }

  async fetchBooks(ids: string[] = []) {
    const books = await this.request(this.url)
    if (ids.length > 0) {
      return books.filter((apiBook: ApiBook) => ids.includes(apiBook.id))
    }
    return books
  }
}
