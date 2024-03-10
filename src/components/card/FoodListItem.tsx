import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'

export type FoodListItemProps = {
  item: {
    image: string
    label: string
    nutrients: {
      ENERC_KCAL: number
    }
    brand: string
  }
  onPressAddingAnItem: () => void
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

const FoodListItem = ({ item, onPressAddingAnItem }: FoodListItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={item?.image}
        placeholder={blurhash}
        contentFit='contain'
        transition={300}
      />
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.headerText}>
          {item.label}
        </Text>
        <Text numberOfLines={1} style={styles.subText}>
          {item.nutrients.ENERC_KCAL} cal, {item.brand}
        </Text>
      </View>
      <Pressable onPress={onPressAddingAnItem} style={styles.circle}>
        <Ionicons name='add' size={24} color={colors.blue} />
      </Pressable>
    </View>
  )
}

export default FoodListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    width: '100%',
    padding: 10,
    backgroundColor: colors.light,
    borderRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  contentContainer: { flex: 1, gap: 5, paddingHorizontal: 6 },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  subText: {
    fontSize: 14,
    color: colors.grey,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
