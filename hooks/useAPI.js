import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_WHOAMI = "/whoami";
const API_LOGIN = "/auth";
const API_SIGNUP = "/newuser";

export const API = "https://milton688.pythonanywhere.com";
export const API_ALL_POSTS = "/posts"; // GET
export const API_DELETE_POST_ID = "/posts/"; // DELETE
export const API_CREATE_POST = "/create"; // POST
export const API_POST_ID = "/posts/"; // GET
export const API_EDIT_POST_ID = "/posts/"; // PUT

export function useUsername() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      if (token == null) {
        setError(true);
        setUsername(null);
      } else {
        try {
          const response = await axios.get(API + API_WHOAMI, {
            headers: { Authorization: `JWT ${token}` },
          });
          setUsername(response.data.username);
          setLoading(false);
        } catch (e) {
          setError(true);
          setUsername(null);
          setLoading(false);
        }
      }
    })();
    setRefresh(false);
  }, [refresh]);

  return [username, loading, error, setRefresh];
}

export function useAuth(username, password, navigationCallback) {
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  async function login() {
    console.log("---- Signing in ----");

    try {
      setLoading(true);
      const response = await axios.post(API + API_LOGIN, {
        username,
        // age, //add 1
        // career,
        // email,
        password,
      });
      console.log("Success signing in!");
      await AsyncStorage.setItem("token", response.data.access_token);
      setLoading(false);
      navigationCallback();
    } catch (error) {
      setLoading(false);
      console.log("Error signing in!");
      console.log(error);
      setErrorText(error.response.data.description);
    }
  }

  async function signup() {
    console.log("---- Signing up ----");

    try {
      setLoading(true);
      await axios.post(API + API_SIGNUP, {
        username,
        // age, // add2
        // career,
        // email,
        password,
      });
      if (response.data.Error === "User already exists") {
        setErrorText("This user exists");
        setLoading(false);
        return;
      }
      console.log("Success signing up!");
      login();
    } catch (error) {
      setLoading(false);
      console.log("Error signing up!");
      console.log(error);
      setErrorText(error.response.data.description);
    }
  }

  return [login, signup, loading, errorText];
}
