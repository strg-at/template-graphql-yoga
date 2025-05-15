export enum ENVIRONMENT {
  PRODUCTION = 'PRODUCTION',
  TEST = 'TEST',
  INTEGRATION = 'INTEGRATION',
}

export interface Config {
  app: {
    port: number
    host: string
    name: string
    version: string
    environment: ENVIRONMENT
    datasources: {
      booksApi: {
        url: string
      }
    }
  }
}
