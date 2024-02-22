import { View, Text, StyleSheet } from "react-native"
import React from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import { Input } from "@rneui/themed"

const SearchBar = () => {
  // return (
  //   <View style={styles.container}>
  //     <Icon name="search" size={20} color="rgba(94, 94, 94,0.7)" />
  //     <Text style={styles.title}>SearchBar</Text>
  //   </View>
  // )
  return(
    <View>
      <Input
      style={styles.inputText}
      inputContainerStyle={styles.input}
      placeholder="Search..."
      leftIcon={<Icon name="search" size={20} color="rgba(94, 94, 94,0.7)"  />}
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
    width: 309,
    height: 42,
    borderColor: "rgba(0, 0, 0, 0.4)",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  // container: {
  //   backgroundColor: "rgba(0, 0, 0, 0.1)",
  //   borderColor: "rgba(0, 0, 0, 0.4)",
  //   borderRadius: 25,
  //   borderWidth: 1,
  //   width: 309,
  //   height: 42,
  //   alignItems: "center",
  //   display: "flex",
  //   flexDirection: "row",
  //   paddingHorizontal: 20,
  // },
  // title: {
  //   color: "rgba(94, 94, 94,0.7)",
  //   fontWeight: "500",
  //   fontSize: 16,
  //   paddingLeft: 10,
  // },
})
export default SearchBar
