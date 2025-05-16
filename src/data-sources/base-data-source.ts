import { logger } from '@strg/logging-winston'

export abstract class BaseDataSource {
  url: string = ''

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async request(endpoint: string) {
    try {
      // const headers = {
      //   headers: {
      //     // eslint-disable-next-line @typescript-eslint/naming-convention
      //     'X-Api-Key': process.env.API_KEY!,
      //   },
      // }
      //
      // const response = await fetch(endpoint, headers)
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`)
      // }
      // return await response.json()
      return [
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
    } catch (error) {
      logger.error('Error fetching data:', error)
      throw new Error('Failed to fetch data from external API')
    }
  }
}
