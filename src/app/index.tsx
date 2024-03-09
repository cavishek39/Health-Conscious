import { StatusBar } from 'expo-status-bar'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { Link } from 'expo-router'
import FoodListItem, {
  FoodListItemProps,
} from '../components/card/FoodListItem'
import { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { debounce } from '../hooks/useDebounce'

const GET_SEARCHED_DATA = gql`
  query search($ingr: String) {
    search(ingr: $ingr) {
      hints {
        food {
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

export default function Page() {
  const [searchText, setSearchText] = useState('')

  const [getSearchedData, { data: searchedData, loading: searchingData }] =
    useLazyQuery(GET_SEARCHED_DATA)

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
        renderItem={({ item }) => <FoodListItem item={item?.food} />}
        keyExtractor={(item, index) => item?.food?.foodId + index.toString()}
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
