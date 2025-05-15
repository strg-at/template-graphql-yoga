import { Resolvers } from '../resolvers-types'
import { logger } from '@strg/logging-winston'

export const resolvers: Resolvers = {
  Query: {
    errorCodes: () => {
      logger.debug('ErrorCodes.resolver - Query.errorCodes call')
      return ['NOT_FOUND', 'GRAPHQL_PARSE_FAILED', 'GRAPHQL_VALIDATION_FAILED']
    },
  },
}
