import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://kingsville.stepzen.net/api/ironic-mink/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: process.env.EXPO_PUBLIC_STEPZEN_API_KEY || '',
  },
})
