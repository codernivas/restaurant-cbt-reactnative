import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import LoginPage from "./pages/login"
import RewardTable from "./pages/rewardTable"
const Stack = createStackNavigator()

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RewardTable" component={RewardTable} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
