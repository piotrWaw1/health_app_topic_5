import axios from "axios";
import * as SecureStore from "expo-secure-store";

axios.defaults.baseURL = "http://192.168.0.100:5000";
const token = SecureStore.getItem("token")
console.log(token)
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}