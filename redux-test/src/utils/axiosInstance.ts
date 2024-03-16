import axios from "axios";
import { AppUser } from "../schemas";

export default function axiosInstance() {
  const userData = localStorage.getItem("user");
  if (!userData) {
    return axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${(JSON.parse(userData) as AppUser).access_token}`,
    },
  });
}
