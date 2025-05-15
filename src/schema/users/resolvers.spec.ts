import { expect } from 'chai'
import { resolvers } from './resolvers'

describe('Users Resolver', () => {
  describe('Query.getUserById', () => {
    it('should return a specific user by ID', async () => {
      const userId = '123'
      // @ts-ignore
      const result = await resolvers.Query.getUserById(null, { id: userId })

      expect(result).to.deep.equal({
        id: userId,
        name: `Example User ${userId}`,
        email: 'user@example.com',
        profileImage: 'url-to-image',
      })
    })
  })

  describe('Query.getAllUsers', () => {
    it('should return all users', async () => {
      // @ts-ignore
      const result = await resolvers.Query.getAllUsers()

      expect(result).to.deep.equal([
        {
          id: '1',
          name: 'Example User',
          email: 'user1@example.com',
          profileImage: 'url-to-image-1',
        },
        {
          id: '2',
          name: 'Another User',
          email: 'user2@example.com',
          profileImage: 'url-to-image-2',
        },
      ])
    })
  })
})
