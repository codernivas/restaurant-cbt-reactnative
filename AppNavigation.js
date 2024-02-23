import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import LoginPage from "./pages/login"
import RewardTable from "./pages/rewardTable"
import NewCustomer from "./pages/newCustomer"
import CustomerHistory from "./pages/customerHistory"
import ClaimReward from "./pages/claimReward"
import AddReward from "./pages/addReward"
import CustomerDetails from "./pages/customerDetails"
const Stack = createStackNavigator()

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RewardTable" component={RewardTable} />
        <Stack.Screen name="NewCustomer" component={NewCustomer} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
        <Stack.Screen name="CustomerHistory" component={CustomerHistory} />
        <Stack.Screen name="ClaimReward" component={ClaimReward} />
        <Stack.Screen name="AddReward" component={AddReward} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
