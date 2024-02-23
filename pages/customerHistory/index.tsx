import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuth } from "../../context/AuthContext"
import StatusBar from "../../components/StatusBar"
import UserCard from "../../components/UserCard"
import { ScrollView } from "react-native-gesture-handler"

// Define types for the API response
interface Bill {
  billNumber: string
  billAmt: number
  rewardAction: boolean
  rewardPoints: string
  entryDate: string
  validDate: string
  _id: string
}

interface CustomerData {
  _id: string
  customerName: string
  mobileNo: string
  bills: Bill[]
  createdAt: string
  updatedAt: string
  __v: number
}

const CustomerHistory = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false }) // Hide the header
  }, [navigation])
  const [customerData, setCustomerData] = useState<CustomerData | null>(null)
  const [totalRewardPoints, setTotalRewardPoints] = useState<number>(0) // State to hold total reward points
  const [nonRewardPoints, setNonRewardPoints] = useState<number>(0) // State to hold non-reward points

  const { token } = useAuth()
const avaliablePoints= totalRewardPoints-nonRewardPoints
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // Retrieve the stored customer ID from AsyncStorage
        const customerId = await AsyncStorage.getItem("selectedCustomerId")
        if (customerId && token) {
          // Make API request using the stored customer ID and token
          const response = await fetch(
            `https://restaurant1-ym87.onrender.com/customer/${customerId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          if (response.ok) {
            const data: CustomerData = await response.json()
            setCustomerData(data)
            // Calculate total and non-reward points
            const rewards = data.bills.reduce((acc, bill) => {
              if (bill.rewardAction) {
                return acc + parseInt(bill.rewardPoints)
              } else {
                setNonRewardPoints((prev) => prev + parseInt(bill.rewardPoints)) // Update non-reward points
                return acc
              }
            }, 0)
            setTotalRewardPoints(rewards) // Update state with total reward points
          } else {
            console.error("Failed to fetch customer data")
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error)
      }
    }
    fetchCustomerData()
  }, [token])

  const handleSubmits = () => {
    navigation.navigate("RewardTable")
  }
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
  }

  const getNext30DaysDate = (dateString: string): string => {
    const date = new Date(dateString)
    date.setDate(date.getDate() + 30)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
  }

  const valid30Days = (dateString: string): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const date = new Date(dateString)
    date.setDate(date.getDate() + 30) // Add 30 days to the current date

    const day = String(date.getDate()).padStart(2, "0")
    const monthIndex = date.getMonth()
    const monthName = months[monthIndex]
    const year = date.getFullYear()

    return `Valid until ${day} ${monthName} ${year}`
  }
  const originalDateString =
    customerData && customerData.createdAt ? customerData.createdAt : ""
  const formattedDate = originalDateString ? formatDate(originalDateString) : ""

  const next30DaysDate = getNext30DaysDate(originalDateString)
  const nextvalid30Days = valid30Days(originalDateString)

  return (
    <View style={styles.container}>
      <StatusBar title="Customer History" icon onPress={handleSubmits} />

      {customerData ? (
        <>
          <View style={styles.cardContainer}>
            <UserCard
              validText={nextvalid30Days}
              mobileno={customerData.mobileNo}
              name={customerData.customerName}
              points={avaliablePoints.toString()}
            />
          </View>
          <ScrollView style={styles.tableContainer}>
            <Text>Bills:</Text>
            {customerData.bills.map((bill) => (
              <View key={bill._id} style={styles.billContainer}>
                <Text>Bill Number: {bill.billNumber}</Text>
                <Text>Bill Amount: {bill.billAmt}</Text>
                <Text>Reward Action: {bill.rewardAction ? "Yes" : "No"}</Text>
                <Text>Reward Points: {bill.rewardPoints}</Text>
                <Text>Entry Date: {bill.entryDate}</Text>
                <Text>Valid Date: {bill.validDate}</Text>
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}

export default CustomerHistory

const styles = StyleSheet.create({
  container: {
    top: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  billContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  cardContainer: {
    top: 10,
    zIndex: 1,
  },
  tableContainer: {
    width: "100%",
  },
})
