import { createServer } from 'http'
import { gatewayApp } from './gateway'
import { logger } from '@strg/logging-winston'
import { Config } from './utils/config/config'
import { configFromYaml } from './utils/config/config-from-yaml'
import { CONFIG_PATH, NODE_ENV, SERVICE_NAME, SERVICE_VERSION } from './utils/config/defaults'

const config: Config = configFromYaml(CONFIG_PATH)

config.app = Object.assign(
  {
    name: SERVICE_NAME,
    version: SERVICE_VERSION,
  },
  config.app
)
const APP_ID = `${config.app.name}:${config.app.version} (${NODE_ENV})`

const server = createServer(gatewayApp)
server.listen(config.app.port, config.app.host, () =>
  logger.info(`The GraphQL gateway app: ${APP_ID} is running at ${config.app.host}:${config.app.port}/graphql`)
)
