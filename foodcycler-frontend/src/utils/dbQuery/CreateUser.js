import Axios from "axios";
import { BACKEND_URL } from "../constants";

export const CreateUser = async (userName, password) => {
  try {
    const response = await Axios.post(BACKEND_URL + "/api/createUser", {
      userName: userName,
      userPassword: password,
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 409) {
      alert("User with the same user name already exists");
    } else {
      console.log(err);
      alert("Error occurred while creating user");
    }
    return false;
  }
};

