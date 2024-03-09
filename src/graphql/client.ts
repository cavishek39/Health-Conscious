import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://dashboard.stepzen.com/explorer?endpoint=api%2Fironic-mink',
  cache: new InMemoryCache(),
  headers: {
    Authorization: process.env.EXPO_PUBLIC_STEPZEN_API_KEY || '',
  },
})
