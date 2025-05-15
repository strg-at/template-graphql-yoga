import { createApplication } from 'graphql-modules'
import { books, heartbeat, scalars, users } from './schema'
import { errorCodes } from './schema'

export const application = createApplication({
  modules: [scalars, heartbeat, users, errorCodes, books],
})
