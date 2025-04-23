import { Platform } from "react-native";

const BASE_URL =
  process.env.REACT_APP_API_URL || "http://10.0.3.100:3000/api/auth";

export default BASE_URL;
