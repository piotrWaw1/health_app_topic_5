import axios from "axios";
import * as SecureStore from "expo-secure-store";

axios.defaults.baseURL = "https://192.168.0.100:5000";
const token = SecureStore.getItem("token")
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}