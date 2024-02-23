import * as React from "react"
import { Button } from "react-native-paper"
import { StyleSheet, View, Text, Pressable } from "react-native"

interface ButtonCompProps {
  title: string
  onPress?: () => void
  width?: number
}
const CustomButton: React.FC<ButtonCompProps> = ({ title, onPress ,width}) => {
  return (
    <View>
      <Pressable onPress={onPress}>
      <View style={[styles.container, { width: width }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDA058",
    borderRadius: 25,
    // width: 297,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
})
export default CustomButton
