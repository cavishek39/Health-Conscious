import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import Ionicons from '@expo/vector-icons/Ionicons'

export type FoodListItemProps = {
  item: {
    label: string
    nutrients: {
      ENERC_KCAL: number
    }
    brand: string
  }
}

const FoodListItem = ({ item }: FoodListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 5 }}>
        <Text numberOfLines={1} style={styles.headerText}>
          {item.label}
        </Text>
        <Text numberOfLines={1} style={styles.subText}>
          {item.nutrients.ENERC_KCAL} cal, {item.brand}
        </Text>
      </View>
      <View style={styles.circle}>
        <Ionicons name='add' size={24} color={colors.blue} />
      </View>
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
