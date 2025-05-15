import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/schema/**/*.ts',
  generates: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    './src/schema/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
}
export default config
