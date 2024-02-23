import { StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import StatusBar from "../../components/StatusBar"
import { SafeAreaView } from "react-native-safe-area-context"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@rneui/themed"
import Icon from "react-native-vector-icons/FontAwesome"
import RewardCard from "../../components/RewardCard"
import CustomButton from "../../components/Button"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

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
const AddReward = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false }) // Hide the header
  }, [navigation])
  const handleSubmits = () => {
    navigation.navigate("RewardTable") // Navigate back
  }
  const [billAction, setBillAction] = useState("")
  const [rewardAction, setRewardAction] = useState(true)
  const [enteredAmount, setEnteredAmount] = useState("")
  const [calculatedValue, setCalculatedValue] = useState(0)
  const [customerName, setCustomerName] = useState("")
  const [customerData, setCustomerData] = useState<CustomerData | null>(null)
  const { token } = useAuth()

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

  const handleAmountChange = (amount: string) => {
    setEnteredAmount(amount)

    const parsedAmount = parseFloat(amount)
    if (!isNaN(parsedAmount)) {
      const calculated = parsedAmount * 0.1
      setCalculatedValue(calculated)
    } else {
      setCalculatedValue(0)
    }
  }
  const currentDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Months are zero indexed
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}/${month}/${day}`
  }
  const handleOptionSelect = (selectedOption: string) => {
    setBillAction(selectedOption)

    if (selectedOption === "Credit Reward") {
      setRewardAction(true)
    } else if (selectedOption === "Claim Reward") {
      setRewardAction(false)
    }
  }

  const { control, handleSubmit, reset } = useForm()
  console.log("rewadToken", token)
  const options = ["Credit Reward", "Claim Reward"]
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "https://restaurant1-ym87.onrender.com/newcustomer",
        {
          customerName: customerData?.customerName,
          mobileNo: customerData?.mobileNo,
          bills: [
            {
              billNumber: data.billno,
              billAmt: parseInt(data.billamt),
              rewardAction: true,
              rewardPoints: calculatedValue,
              entryDate: currentDate(),
              validDate: "2024/02/12",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log("API Response:", response.data)

      reset()
      navigation.navigate("RewardTable")
    } catch (error) {
      console.error("Error:", error)
    }
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
  // Check if customerData and createdAt exist
  const originalDateString =
    customerData && customerData.createdAt ? customerData.createdAt : ""
  const nextvalid30Days = valid30Days(originalDateString)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}></View>
      <StatusBar title="Add Reward" icon onPress={handleSubmits} />
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.formTitle}>Customer Name</Text>
          <Controller
            name="customername"
            control={control}
            render={({ field }) => {
              setCustomerName(field.value)
              return (
                <Input
                  style={styles.inputText}
                  inputContainerStyle={styles.input}
                  placeholder="Enter Customer Name"
                  disabled
                  value={customerData?.customerName}
                />
              )
            }}
          />
        </View>
        <View>
          <Text style={styles.formTitle}>Mobile No</Text>
          <Controller
            name="mobileno"
            control={control}
            render={({ field }) => (
              <Input
                style={styles.inputText}
                inputContainerStyle={styles.input}
                placeholder="Enter Mobile No"
                onChangeText={field.onChange}
                disabled
                value={customerData?.mobileNo}
              />
            )}
          />
        </View>
        <View style={{ display: "flex", flexDirection: "row", zIndex: 1 }}>
          <View>
            <Text style={styles.formTitle}>Bill No</Text>
            <Controller
              name="billno"
              control={control}
              render={({ field }) => (
                <Input
                  style={styles.inputText}
                  inputContainerStyle={styles.smallInput}
                  placeholder="Enter Bill No"
                  onChangeText={field.onChange}
                  value={field.value}
                />
              )}
            />
          </View>
          <View>
            <Text style={styles.formTitle}>Bill Amount</Text>
            <Controller
              name="billamt"
              control={control}
              render={({ field }) => (
                <Input
                  style={styles.inputText}
                  inputContainerStyle={styles.smallInput}
                  placeholder="Enter Bill Amt"
                  onChangeText={(value) => {
                    handleAmountChange(value)
                    field.onChange(value)
                  }}
                  value={field.value}
                  leftIcon={
                    <Icon name="rupee" size={20} color="rgba(94, 94, 94,0.4)" />
                  }
                />
              )}
            />
          </View>
        </View>
      </View>
      {/* <View style={styles.radioContainer}>
      <RadioButton options={options} onOptionSelect={handleOptionSelect} />
    </View> */}
      <View style={styles.rewardContainer}>
        <RewardCard
          title={calculatedValue.toLocaleString()}
          validText={nextvalid30Days}
        />
      </View>
      <View style={{ top: "25%" }}>
        <CustomButton
          title="Submit"
          width={171}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View style={styles.subContainer2}></View>
    </SafeAreaView>
  )
}

export default AddReward

const styles = StyleSheet.create({
  container: {
    top: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  disable: {
    backgroundColor: "rbga(207,203,210,0.5)",
  },
  subContainer: {
    height: 300,
    width: 300,
    borderRadius: 150,
    backgroundColor: "rgba(253, 160, 88,0.5)",
    position: "absolute",
    left: -150,
    top: 600,
  },
  subContainer2: {
    height: 300,
    width: 300,
    borderRadius: 150,
    backgroundColor: "rgba(253, 160, 88,0.5)",
    position: "absolute",
    left: 250,
    top: 350,
  },
  formContainer: { top: 80 },
  radioContainer: { top: 80, left: -10 },
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
    // width: 280,
  },
  smallInput: {
    color: "#797979",
    fontWeight: "400",
    borderRadius: 10,
    height: 42,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.4)",
    padding: 10,
    width: 140,
  },
  formTitle: {
    color: "#595757",
    fontWeight: "600",
    bottom: 5,
  },
  rewardContainer: {
    top: "20%",
  },
})