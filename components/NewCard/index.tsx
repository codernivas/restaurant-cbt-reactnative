import * as React from "react"
import { StyleSheet, View, Text, Pressable } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"

interface NewCardProps {
  title: string
  onPress?: () => void
}
const NewCard: React.FC<NewCardProps> = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}  style={styles.container}>
      <View>
        <Icon
          name="user-plus"
          size={30}
          color="rgba(94, 94, 94,0.7)"
          style={{ paddingLeft: 120, paddingTop: 60 }}
        />

        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(94, 94, 94,0.1)",
    borderRadius: 25,
    width: 272,
    height: 200,
    display: "flex",
    flexDirection: "row",
  },
  title: {
    color: "#FDA058",
    fontWeight: "700",
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 40,
  },
})
export default NewCard
