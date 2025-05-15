import { Resolvers } from '../resolvers-types'
import { logger } from '@strg/logging-winston'

// example resolvers
export const resolvers: Resolvers = {
  Query: {
    getUserById: (_: unknown, { id }: { id: string }) => {
      logger.debug('Users.resolver - Query.getUserById call')
      return { id, name: `Example User ${id}`, email: 'user@example.com', profileImage: 'url-to-image' }
    },
    getAllUsers: () => {
      logger.debug('Users.resolver - Query.getAllUsers call')
      return [
        { id: '1', name: 'Example User', email: 'user1@example.com', profileImage: 'url-to-image-1' },
        { id: '2', name: 'Another User', email: 'user2@example.com', profileImage: 'url-to-image-2' },
      ]
    },
  },
}
