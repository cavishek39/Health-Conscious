import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import FoodListItem from '../components/card/FoodListItem'
import { Link } from 'expo-router'
import { colors } from '../constants/colors'

const MY_LOGGED_FOOD_DATA = gql`
  query MyLoggedFoodList {
    food_logList {
      label
      category
      categoryLabel
      foodId
      image
      knownAs
      nutrients {
        ENERC_KCAL
      }
    }
  }
`

const HomeScreen = () => {
  const { data, loading } = useQuery(MY_LOGGED_FOOD_DATA, {
    onCompleted(data) {
      console.log(data)
    },
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
        data={data?.search?.hints}
        renderItem={({ item }) => (
          <FoodListItem item={item?.food} onPressAddingAnItem={() => {}} />
        )}
        keyExtractor={(item, index) => item?.food?.foodId + index.toString()}
        contentContainerStyle={{ gap: 8 }}
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
