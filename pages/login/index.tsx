import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  Alert,
} from "react-native"
import { Controller, useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@rneui/themed"
import CustomButton from "../../components/Button"
import axios from "axios"
import { loginApiPost } from "../../service/login"
import { LoginPageApi } from "../../types"
import { useAuth } from "../../context/authContext"

const LoginPage = ({ navigation }: any) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false }) // Hide the header
  }, [navigation])
  const { setToken } = useAuth()

  const [keyboardStatus, setKeyboardStatus] = useState(false)
  const { control, handleSubmit, reset } = useForm<LoginPageApi>()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardStatus(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardStatus(false)
      }
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const onSubmit: SubmitHandler<LoginPageApi> = async (data) => {
    try {
      const response = await loginApiPost(data)
      console.log("Login successful")
      console.log(response)
      setToken(response);
      navigation.navigate('RewardTable');
    } catch (error) {
      console.error("Login failed", error)
      Alert.alert("Login Failed", "Invalid username or password")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}></View>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.formTitle}>Username</Text>
          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <Input
                style={styles.inputText}
                inputContainerStyle={styles.input}
                placeholder="Enter Work Email"
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.formTitle}>Password</Text>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                style={styles.inputText}
                inputContainerStyle={styles.input}
                placeholder="Enter Password"
                onChangeText={field.onChange}
                value={field.value}
                secureTextEntry={true}
              />
            )}
          />
        </View>
        <View>
          <CustomButton title="Login" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>

      {!keyboardStatus && <View style={styles.subContainer2}></View>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    width: "100%",
  },
  subContainer: {
    height: 800,
    width: 800,
    borderRadius: 400,
    backgroundColor: "rgba(253, 160, 88,0.5)",
    position: "absolute",
    left: -400,
    top: -500,
  },
  subContainer2: {
    height: 800,
    width: 800,
    borderRadius: 400,
    backgroundColor: "rgba(253, 160, 88,0.5)",
    position: "absolute",
    right: -400,
    bottom: -500,
  },
  title: {
    paddingTop: "60%",
    fontSize: 30,
    color: "#5E5E5E",
    fontWeight: "700",
  },
  formContainer: { top: 30 },
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
    width: 280,
  },
  formTitle: {
    color: "#595757",
    fontWeight: "600",
    bottom: 5,
  },
})

export default LoginPage
