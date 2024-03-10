import {
  Alert,
  FlatList,
  Pressable,
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
import Ionicons from '@expo/vector-icons/Ionicons'
import { Camera, CameraType } from 'expo-camera'

const GET_SEARCHED_DATA = gql`
  query search($ingr: String, $upc: String) {
    search(ingr: $ingr, upc: $upc) {
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
    $image: String
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
  const [scannerEnabled, setScannerEnabled] = useState(false)

  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()

  if (!permission) {
    requestPermission()
  }

  if (!permission?.granted) {
    requestPermission()
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

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

  if (scannerEnabled) {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          onBarCodeScanned={(data) => {
            console.log(data)
            if (data.type === 'org.gs1.EAN-13') {
              getSearchedData({
                variables: {
                  upc: data.data,
                },
                onCompleted(data) {
                  setScannerEnabled(false)
                },
                onError(error) {
                  Alert.alert('Sorry', 'No data found')
                  // console.error(error)
                  setScannerEnabled(false)
                },
              })
            }
          }}>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </Pressable>
          </View>
        </Camera>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Link href={'/dashboard'}>Go to dashboard</Link>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // width: '100%',
        }}>
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
        <Pressable
          onPress={() => {
            setScannerEnabled(true)
          }}
          style={{ marginHorizontal: 10 }}>
          <Ionicons name='barcode-outline' size={26} color={colors.blue} />
        </Pressable>
      </View>
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
                  // console.log(data)
                  Alert.alert(
                    `${item?.food?.label} added`,
                    `${item?.food?.label} added successfully`
                  )
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
    flex: 1,
    backgroundColor: colors.light,
    borderRadius: 8,
    marginVertical: 8,
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})
