import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { Resource } from '@opentelemetry/resources'
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { logger } from '@strg/logging-winston'
import { SERVICE_NAME, SERVICE_VERSION } from '../config/defaults'

const OPENTELEMETRY_ENABLED =
  (process.env.OPENTELEMETRY_ENABLED &&
    ['true', 'True', 'TRUE', '1'].indexOf(process.env.OPENTELEMETRY_ENABLED) >= 0) ||
  false
const OPENTELEMETRY_CONSOLE_ENABLED =
  (process.env.OPENTELEMETRY_CONSOLE_ENABLED &&
    ['true', 'True', 'TRUE', '1'].indexOf(process.env.OPENTELEMETRY_CONSOLE_ENABLED) >= 0) ||
  false
const OPENTELEMETRY_JAEGER_ENDPOINT = process.env.OPENTELEMETRY_JAEGER_ENDPOINT || 'http://localhost:14268/api/traces'

const registerProvider = () => {
  const exporter = new JaegerExporter({
    endpoint: OPENTELEMETRY_JAEGER_ENDPOINT,
  })

  const resource = Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: SERVICE_NAME,
      [SemanticResourceAttributes.SERVICE_VERSION]: SERVICE_VERSION,
    })
  )

  const provider = new NodeTracerProvider({ resource })

  provider.addSpanProcessor(new SimpleSpanProcessor(exporter))
  if (OPENTELEMETRY_CONSOLE_ENABLED) {
    provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
  }
  provider.register()

  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new GraphQLInstrumentation({
        depth: 2,
        mergeItems: true,
      }),
    ],
  })
}

if (OPENTELEMETRY_ENABLED) {
  registerProvider()
  logger.info('OpenTelemetry Tracer registered', {
    OPENTELEMETRY_ENABLED,
    OPENTELEMETRY_CONSOLE_ENABLED,
    OPENTELEMETRY_JAEGER_ENDPOINT,
  })
}
