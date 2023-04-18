import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.hygraph.com/v2/cle7xg2351f1a01tfgsrh7ptf/master',
  cache: new InMemoryCache(),
})
