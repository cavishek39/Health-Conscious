import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Dashboard = () => {
  return (
    <View>
      <Text>Dashboard</Text>
      <Link href={'/'}>Go back to Home</Link>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})
