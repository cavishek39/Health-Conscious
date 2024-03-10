import {
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import FoodListItem from '../components/card/FoodListItem'
import { Link } from 'expo-router'
import { colors } from '../constants/colors'

export const MY_LOGGED_FOOD_DATA = gql`
  query MyLoggedFoodList($userId: String = "user1", $created_at: DateTime!) {
    getFoodByDateAndUserId(created_at: $created_at, user_id: $userId) {
      brand
      category
      category_label
      food_id
      image
      label
      kcal
    }
  }
`

const HomeScreen = () => {
  console.log('HomeScreen', new Date().toISOString().split('T')[0])

  const { data, loading, refetch } = useQuery(MY_LOGGED_FOOD_DATA, {
    variables: {
      created_at: new Date().toISOString().split('T')[0],
      userId: 'user1',
    },
    onCompleted(data) {
      console.log('My data', data)
    },
    onError(error) {
      console.log(error)
    },
  })

  const totalCalories = data?.getFoodByDateAndUserId?.reduce(
    (acc, curr) => acc + curr?.kcal,
    0
  )

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Calories</Text>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>
          {totalCalories} cal
        </Text>
      </View>
      <View style={styles.headerContainer}>
        <Text>Today's food</Text>
        <Link href={'/search'} asChild>
          <Text style={{ color: colors.blue, fontSize: 16, fontWeight: '600' }}>
            ADD FOOD
          </Text>
        </Link>
      </View>
      {loading && <Text>Loading...</Text>}
      <FlatList
        data={data?.getFoodByDateAndUserId}
        renderItem={({ item }) => (
          <FoodListItem item={item} onPressAddingAnItem={() => {}} />
        )}
        keyExtractor={(item, index) => item?.food_id + index.toString()}
        contentContainerStyle={{ gap: 8 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    gap: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
})
