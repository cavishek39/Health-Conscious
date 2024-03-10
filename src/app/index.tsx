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
  query MyLoggedFoodList($userId: String = "user1") {
    foodLogByUserId(user_id: $userId) {
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
  const { data, loading, refetch } = useQuery(MY_LOGGED_FOOD_DATA, {
    // onCompleted(data) {
    //   console.log('My data', data)
    // },
  })

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Calories</Text>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>1780 cal</Text>
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
        data={data?.foodLogByUserId}
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
