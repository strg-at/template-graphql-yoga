import { createYoga } from 'graphql-yoga'
import { useGraphQLModules } from '@envelop/graphql-modules'
import { application } from './application'
import { usePrometheus } from '@graphql-yoga/plugin-prometheus'
import BooksDataSource from './data-sources/book'
import { getLanguageFromHeaders, LANG } from './utils/get-language-header'
import { Config } from './utils/config/config'
import { configFromYaml } from './utils/config/config-from-yaml'
import { CONFIG_PATH } from './utils/config/defaults'

const config: Config = configFromYaml(CONFIG_PATH)
export interface Context {
  language: LANG
  dataSources: {
    booksDataSource: BooksDataSource
  }
}

export const gatewayApp = createYoga({
  plugins: [
    useGraphQLModules(application),
    usePrometheus({
      endpoint: '/',
    }),
  ],
  context: ({ request }): Context => {
    return {
      language: getLanguageFromHeaders(request),
      dataSources: {
        booksDataSource: new BooksDataSource(config),
      },
    }
  },
  maskedErrors: false,
  graphiql: {
    title: 'Yoga GraphQL template',
    // this is an example query that will be shown when opening the GraphiQL editor on localhost:4000/graphql
    defaultQuery: /* GraphQL */ `
      query BooksById {
        books(ids: ["1"]) {
          id
          title
          __typename
        }
      }

      query AllBooks {
        books {
          id
          title
          __typename
        }
      }

      query Heartbeat {
        heartbeat
      }
    `,
  },
})
