import * as React from "react"
import { StyleSheet, View, Text, Image } from "react-native"

interface RewardCardProps {
  title: string
  onPress?: () => void
  avaliable?:string
  validText?:string

}
const RewardCard: React.FC<RewardCardProps> = ({ title, onPress,avaliable ,validText}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require("../../assets/icons/mc-donalds-logo.png")}
          style={styles.giftlogo}
        />
        <Text style={styles.imgText}>Rewards</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.pointContainer}>
        <Text style={styles.totalPoint}>{title}</Text>
        <Text style={styles.points}>Points {avaliable}</Text>
        <Text style={styles.validate}>{validText}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgba(196, 196, 196,0.3)",
    // borderRadius: 25,
    // width: 342,
    // height: 110,
    // display: "flex",
    // flexDirection: "row",
    backgroundColor: "#FBFBFB",
    borderWidth: 1,
    borderColor: "rgba(196, 196, 196,0.3)",
    borderRadius: 25,
    width: 342,
    height: 110,
    display: "flex",
    flexDirection: "row",
    elevation:10,
    zIndex:1
  },
  imgContainer: {
    width: 123,
    alignItems: "center",
  },
  divider: {
    width: 1.5,
    backgroundColor: "rgba(196, 196, 196,0.3)",
  },
  imgText: {
    color: "#999999",
    fontWeight: "700",
    fontSize: 22,
    top: 10,
  },
  totalPoint: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "800",
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

export default RewardCard
