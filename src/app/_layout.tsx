import React from 'react'
import { Slot, Navigator, Stack } from 'expo-router'
import { ApolloProvider } from '@apollo/client'
import { client } from '../graphql/client'
import { colors } from '../constants/colors'

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.light,
          },
          // headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </ApolloProvider>
  )
}

export default RootLayout
