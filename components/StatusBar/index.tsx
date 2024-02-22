import { View, Text, StyleSheet, Button, Pressable } from "react-native"
import React, { useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome6"

interface StatusBarProps {
  title: string
  onPress?: () => void
  icon?: boolean
}

const StatusBar: React.FC<StatusBarProps> = ({ title, onPress, icon }) => {
  return (
    <View style={styles.container}>
      {icon && onPress && (
        <Pressable onPress={onPress} style={{ paddingLeft: 15 }}>
          <Icon name="arrow-left" size={20} color="#FFFFFF" />
        </Pressable>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FDA058",
    borderBottomStartRadius: 30,
    borderTopStartRadius: 30,
    width: "100%",
    height: 60,
    paddingHorizontal: 5,
    paddingTop: 18,
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 20,
    paddingLeft: 15,
    bottom: 5,
  },
})
export default StatusBar
