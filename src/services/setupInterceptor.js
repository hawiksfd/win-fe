import axios from "axios";
import { useSelector } from "react-redux";
import jwt_decoded from "jwt-decode";

export const api = axios.create({
  baseURL: process.env.API_URL || "https://win-be-hawiksfd.cyclic.app/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":
      "https://win-fe-git-master-hawiksfd.vercel.app/",
    "Access-Control-Allow-Credentials": "true",
  },
});

export const privateApi = axios.create({
  baseURL: process.env.API_URL || "https://win-be-hawiksfd.cyclic.app/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":
      "https://win-fe-git-master-hawiksfd.vercel.app/",
    "Access-Control-Allow-Credentials": "true",
  },
});

privateApi.interceptors.request.use(
  async (config) => {
    try {
      const tkn = JSON.parse(localStorage.getItem("tkn"));
      const exp = JSON.parse(localStorage.getItem("exp"));
      const currentDate = new Date();
      if (exp * 1000 > currentDate.getTime()) {
        config.headers["Authorization"] = "Bearer " + tkn;
        config.headers["authorization"] = "Bearer " + tkn;
      } else {
        const response = await api.get("auth/rtoken");
        const decoded = jwt_decoded(response.data.accessToken);
        const expire = decoded.exp;
        localStorage.setItem("tkn", JSON.stringify(response.data.accessToken));
        localStorage.setItem("exp", JSON.stringify(expire));
        config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
        config.headers["authorization"] = `Bearer ${response.data.accessToken}`;
      }
    } catch (error) {
      console.log(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
