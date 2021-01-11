import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://milton488.pythonanywhere.com";
const API_WHOAMI = "/whoami";

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState("");

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
      setUsername(response.data.username);
      console.log(response);
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
    /// if succeed , we will display the  user name
    /// if fale .... do nothing?
  }

  useEffect(() => {
    getUsername();
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
  }

  return (
    <View style={commonStyles.container}>
      <Text>Account Screen</Text>
      <Text>{username}</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({});
