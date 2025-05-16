import { createApplication } from 'graphql-modules'
import { books, heartbeat, scalars } from './schema'

export const application = createApplication({
  modules: [scalars, heartbeat, books],
})
