import { StyleSheet, Text, View, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import CustomButton from "../../components/Button"
import { TouchableOpacity } from "react-native-gesture-handler"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface Customer {
  customerName: string
  _id: string
 
}

const RewardTable = ({ navigation }: any) => {
  const { token } = useAuth();
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const tokenString = typeof token === "string" ? token : JSON.stringify(token);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(
          "https://restaurant1-ym87.onrender.com/customer",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Assuming your API requires a bearer token
              // Add other headers if needed
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCustomerData(data);
        } else {
          console.error("Failed to fetch customer data");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    // Fetch data initially
    fetchCustomerData();

    // Set up interval to fetch data every second
    const interval = setInterval(fetchCustomerData, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [token]);

  const handleItemClick = async (customerId: string) => {
    try {
      await AsyncStorage.setItem("selectedCustomerId", customerId);
      navigation.navigate("CustomerDetails");
    } catch (error) {
      console.error("Error storing selected customer ID:", error);
    }
  };

  const handleSubmit = () => {
    navigation.navigate("NewCustomer");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>hi</Text>
      <Text>{tokenString}</Text>
      {customerData.map((customer, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleItemClick(customer._id)}
        >
          <Text>{customer.customerName}</Text>
        </TouchableOpacity>
      ))}
      <CustomButton title="New Customer" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default RewardTable;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "center",
  },
})
