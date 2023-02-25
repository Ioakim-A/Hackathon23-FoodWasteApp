import Axios from "axios";
import { BACKEND_URL } from "../constants";

export const CreateUser = (userName, password) => {
  console.log(userName,password)  
  Axios.post(BACKEND_URL + "/api/createUser", {
    userName: userName,
    userPassword: password,
  })
    .then(() => {
      alert("Successful insertion!");
    })
    .catch((err) => {
      if (err.response && err.response.status === 409) {
        alert("User with the same user name already exists");
      } else {
        console.log(err);
        alert("Error occurred while creating user");
      }
    });
};