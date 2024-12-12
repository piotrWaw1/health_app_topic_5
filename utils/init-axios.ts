import axios from "axios";
import * as SecureStore from "expo-secure-store";

axios.defaults.baseURL = "https://15d6-83-150-199-246.ngrok-free.app";
const token = SecureStore.getItem("token")
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}