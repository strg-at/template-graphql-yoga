import { DateResolver, DateTimeResolver, EmailAddressResolver, PositiveIntResolver, URLResolver } from 'graphql-scalars'

export const resolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  PositiveInt: PositiveIntResolver,
  URL: URLResolver,
}
