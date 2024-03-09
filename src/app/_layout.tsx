import React from 'react'
import { Slot } from 'expo-router'
import { ApolloProvider } from '@apollo/client'
import { client } from '../graphql/client'

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <Slot />
    </ApolloProvider>
  )
}

export default RootLayout
