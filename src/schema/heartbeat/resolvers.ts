import { Resolvers } from '../resolvers-types'
import { logger } from '@strg/logging-winston'

export const resolvers: Resolvers = {
  Query: {
    heartbeat: () => {
      logger.debug('Heartbeat.resolver - Query.heartbeat call')
      return 'OK'
    },
  },
}
