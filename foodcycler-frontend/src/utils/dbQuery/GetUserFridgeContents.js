import Axios from "axios";
import { BACKEND_URL } from "../constants";

export const GetUserFridgeContents = (username) => {
    return Axios.get(`${BACKEND_URL}/api/fridgeItems/${username}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };