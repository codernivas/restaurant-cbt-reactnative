import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import AddReward from "../addReward"
import ClaimReward from "../claimReward"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import CustomerHistory from "../customerHistory"

const Tab = createBottomTabNavigator()

const CustomerDetails = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false }) // Hide the header
  }, [navigation])
  return (
    <Tab.Navigator
    initialRouteName="CustomerHistory"
      screenOptions={{
        tabBarLabelStyle: { fontWeight: "600" },
      }}
    >
      <Tab.Screen name="AddReward" component={AddReward} />
      <Tab.Screen name="CustomerHistory" component={CustomerHistory} />
      <Tab.Screen name="ClaimReward" component={ClaimReward} />
    </Tab.Navigator>
  )
}

export default CustomerDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  billContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
})
