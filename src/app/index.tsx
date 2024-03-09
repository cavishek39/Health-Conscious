import { StatusBar } from 'expo-status-bar'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { Link } from 'expo-router'
import FoodListItem, {
  FoodListItemProps,
} from '../components/card/FoodListItem'
import { useState } from 'react'
import { colors } from '../constants/colors'

export default function Page() {
  const [searchText, setSearchText] = useState('')

  return (
    <View style={styles.container}>
      <Link href={'/dashboard'}>Go to dashboard</Link>
      <TextInput
        placeholder='Search'
        onChangeText={setSearchText}
        style={styles.textInputContainer}
        returnKeyType='search'
        onBlur={() => {
          console.log('onBlur')
        }}
      />
      <FlatList<FoodListItemProps>
        data={foodLists}
        renderItem={({ item }) => <FoodListItem item={item?.item} />}
        keyExtractor={({ item }) => item.label + item.cal + item.brand}
        contentContainerStyle={{ gap: 8 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  textInputContainer: {
    padding: 20,
    backgroundColor: colors.light,
    borderRadius: 8,
    width: '100%',
    marginVertical: 8,
  },
})

const foodLists: FoodListItemProps[] = [
  {
    item: {
      label: 'Burger',
      cal: 200,
      brand: 'McDonalds',
    },
  },
  {
    item: {
      label: 'Pizza',
      cal: 300,
      brand: 'Dominos',
    },
  },
  {
    item: {
      label: 'Pasta',
      cal: 400,
      brand: 'Olive Garden',
    },
  },
  {
    item: {
      label: 'Tacos',
      cal: 500,
      brand: 'Taco Bell',
    },
  },
  {
    item: {
      label: 'Fried Chicken',
      cal: 600,
      brand: 'KFC',
    },
  },
  {
    item: {
      label: 'Sushi',
      cal: 700,
      brand: 'Sushi Palace',
    },
  },
  {
    item: {
      label: 'Ice Cream',
      cal: 800,
      brand: 'Cold Stone',
    },
  },
  {
    item: {
      label: 'Donuts',
      cal: 900,
      brand: 'Dunkin Donuts',
    },
  },
  {
    item: {
      label: 'Cupcakes',
      cal: 1000,
      brand: 'Georgetown Cupcake',
    },
  },
  {
    item: {
      label: 'Pancakes',
      cal: 1100,
      brand: 'IHOP',
    },
  },
  {
    item: {
      label: 'Waffles',
      cal: 1200,
      brand: 'Waffle House',
    },
  },
  {
    item: {
      label: 'Bacon',
      cal: 1300,
      brand: 'Porky Pig',
    },
  },
  {
    item: {
      label: 'Eggs',
      cal: 1400,
      brand: 'Chickens',
    },
  },
  {
    item: {
      label: 'Steak',
      cal: 1500,
      brand: 'Texas Roadhouse',
    },
  },
  {
    item: {
      label: 'Salad',
      cal: 1600,
      brand: 'Olive Garden',
    },
  },
  {
    item: {
      label: 'Fruit',
      cal: 1700,
      brand: 'Whole Foods',
    },
  },
  {
    item: {
      label: 'Vegetables',
      cal: 1800,
      brand: 'Whole Foods',
    },
  },
]
