import * as React from "react"
import { StyleSheet, View, Text, Image } from "react-native"

interface UserCardProps {
  points: string
  name: string
  mobileno: string
  onPress?: () => void
  validText:string
}
const UserCard: React.FC<UserCardProps> = ({ points, onPress,name,mobileno,validText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.imgText}>{mobileno}</Text>
      </View>
      <View style={styles.pointContainer}>
        <Text style={styles.totalPoint}>{points}</Text>
        <Text style={styles.points}>points</Text>
        <Text style={styles.validate}>{validText}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBFB",
    borderWidth: 1,
    borderColor: "rgba(196, 196, 196,0.3)",
    borderRadius: 25,
    width: 342,
    height: 110,
    display: "flex",
    flexDirection: "row",
    elevation:10
  },
  name: {
    color: "#504D4D",
    fontWeight: "600",
    fontSize: 20,
    top: 10,
  },
  imgContainer: {
    width: 150,
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  divider: {
    width: 1.5,
    backgroundColor: "rgba(196, 196, 196,0.3)",
  },
  imgText: {
    color: "#999999",
    fontWeight: "700",
    fontSize: 14,
    top: 20,
  },
  totalPoint: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "600",
  },
  points: {
    color: "#949494",
    fontSize: 18,
    fontWeight: "500",
  },
  validate: {
    color: "#247C05",
    fontSize: 12,
    fontWeight: "500",
    top: 7,
  },
  pointContainer: {
    justifyContent: "center",
    paddingLeft: 10,
    alignItems: "flex-end",
  },
  title: {
    color: "#FDA058",
    fontWeight: "700",
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 40,
  },
  giftlogo: {
    width: 60,
    height: 60,
    top: 10,
  },
})

export default UserCard
