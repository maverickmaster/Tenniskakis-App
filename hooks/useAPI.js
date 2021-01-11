import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "https://milton488.pythonanywhere.com";
const API_WHOAMI = "/whoami";

export function useUsername(signOutCallback) {
  async function getUsername() {
    console.log("---- Getting user name ----");
    ///get my token
    const token = await AsyncStorage.getItem("token");
    console.log(`Token is ${token}`);
    /// send to the API and save the user name
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      return response.data.username;
      console.log(response);
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);

        if (error.response.data.status_code === 401) {
          signOutCallback();
          return null;
        }
      } else {
        console.log(error);
      }
    }
    /// if succeed , we will display the  user name
    /// if fale .... do nothing?
  }
  return getUsername;
}
