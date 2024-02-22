import React, { useState } from "react"
import { View, TextInput, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { Input } from "@rneui/themed"

const CustomSmallInput = () => {
  return (
    <View>
      <Input
        style={styles.inputText}
        inputContainerStyle={styles.input}
        leftIcon={<Icon name="rupee" size={20} color="rgba(94, 94, 94,0.4)" />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputText: {
    fontSize: 14,
  },
  input: {
    color: "#797979",
    fontWeight: "400",
    borderRadius: 10,
    height: 42,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.4)",
    padding: 10,
    width: 140,
  },
})

export default CustomSmallInput
