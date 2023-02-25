import Axios from "axios";
import { BACKEND_URL } from "../constants";

export const LoginUser = (userName, password) => {
  return Axios.post(BACKEND_URL + "/api/login", {
    userName: userName,
    userPassword: password,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Error occurred while logging in");
    });
};