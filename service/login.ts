import { LoginPageApi } from "../types"
import axios from "axios"

export async function loginApiPost(data: LoginPageApi) {
  try {
    const response = await axios.post(
      "https://restaurant1-ym87.onrender.com/login",
      data
    )
    return response.data
} catch (error: any) {
    throw new Error("Login failed: " + error.message)
  }
}
