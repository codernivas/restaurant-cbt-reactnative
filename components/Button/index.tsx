import * as React from "react"
import { Button } from "react-native-paper"
import { StyleSheet, View, Text } from "react-native"

interface ButtonCompProps {
  title: string
  onPress?: () => void
}
const CustomButton: React.FC<ButtonCompProps> = ({ title,onPress }) => {
  return (
    <View style={styles.container}>
      <Button onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDA058",
    borderRadius:25,
    width:297,
    height:42,
    justifyContent:"center",
    alignItems:"center"
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize:16
  },
})
export default CustomButton
