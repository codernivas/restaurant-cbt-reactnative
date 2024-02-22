import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext';

const RewardTable = () => {
    const { token } = useAuth();
console.log("tt",token)
const tokenString = typeof token === 'string' ? token : JSON.stringify(token);

  return (
    <View>
      <Text>hi</Text>
      <Text>{tokenString}</Text>
      
    </View>
  )
}

export default RewardTable

const styles = StyleSheet.create({})