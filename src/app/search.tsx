import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Link } from 'expo-router'
import FoodListItem from '../components/card/FoodListItem'
import { useState } from 'react'
import { colors } from '../constants/colors'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { MY_LOGGED_FOOD_DATA } from '.'

const GET_SEARCHED_DATA = gql`
  query search($ingr: String) {
    search(ingr: $ingr) {
      hints {
        food {
          image
          foodId
          label
          brand
          nutrients {
            ENERC_KCAL
          }
          category
        }
      }
    }
  }
`

const INSERT_FOOD = gql`
  mutation InsertFood(
    $label: String!
    $kcal: Int!
    $food_id: String!
    $image: String!
    $created_at: DateTime
  ) {
    insertFood_log(
      label: $label
      kcal: $kcal
      food_id: $food_id
      user_id: "user1"
      image: $image
      created_at: $created_at
    ) {
      food_id
      label
      image
      known_as
      kcal
      brand
      category
      category_label
    }
  }
`

export default function Page() {
  const [searchText, setSearchText] = useState('')

  const [getSearchedData, { data: searchedData, loading: searchingData }] =
    useLazyQuery(GET_SEARCHED_DATA)

  const [insertFoodItem] = useMutation(INSERT_FOOD, {
    refetchQueries: [
      {
        query: MY_LOGGED_FOOD_DATA,
        variables: {
          userId: 'user1',
        },
      },
    ],
  })

  return (
    <View style={styles.container}>
      <Link href={'/dashboard'}>Go to dashboard</Link>
      <TextInput
        placeholder='Search'
        onChangeText={setSearchText}
        style={styles.textInputContainer}
        returnKeyType='search'
        onBlur={() => {
          getSearchedData({
            variables: {
              ingr: searchText,
            },
          })
        }}
      />
      {searchingData && <Text>Searching...</Text>}
      <FlatList
        data={searchedData?.search?.hints}
        renderItem={({ item }) => (
          <FoodListItem
            item={item?.food}
            onPressAddingAnItem={() => {
              insertFoodItem({
                variables: {
                  label: item?.food?.label,
                  kcal: item?.food?.nutrients?.ENERC_KCAL,
                  food_id: item?.food?.foodId,
                  image: item?.food?.image,
                  created_at: new Date().toISOString(),
                },
                onCompleted(data) {
                  console.log(data)
                  Alert.alert('Food added', 'Food added successfully')
                },
                onError(error) {
                  console.error(error)
                },
              })
            }}
          />
        )}
        keyExtractor={(item, index) => item?.food?.food_id + index.toString()}
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
