import { writeFileSync } from 'fs'
import { printSchema } from 'graphql'
import { application } from '../application'

writeFileSync('./dist/schema.graphql', printSchema(application.schema), 'utf8')
