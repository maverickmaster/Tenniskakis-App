import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuth } from "../hooks/useAPI";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signInAction } from "../redux/ducks/blogAuth";

const API = "https://milton688.pythonanywhere.com";
const API_LOGIN = "/auth";
const API_SIGNUP = "/newuser";

export default function SignInSignUpView({ navigation, isSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [login, signup, loading, errorText] = useAuth(
    username,
    password,
    () => {
      dispatch(signInAction());
    }
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("../assets/dateme.jpg")}
          style={{
            height: 168,
            width: 168,
            marginTop: 10,
            borderRadius: 15,
          }}
        />
        <Text style={styles.title}>{"DateME App"}</Text>
        <Text style={styles.body}>
          {isSignIn ? "Log in now" : "Account Sign up"}
        </Text>

        <Text style={styles.fieldTitle}>Username</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={(input) => setUsername(input)}
        />

        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(input) => setPassword(input)}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={isSignIn ? login : signup}
            style={[
              styles.loginButton,
              { backgroundColor: isSignIn ? "blue" : "orange" },
            ]}
          >
            <Text style={styles.buttonText}>
              {isSignIn ? "Log in" : "Sign up"}
            </Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="red" /> //adjust
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(isSignIn ? "SignUp" : "SignIn");
          }}
          style={styles.switchButton}
        >
          <Text style={styles.switchText}>
            {isSignIn
              ? "Register for a new account"
              : "Have an account? Sign in"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{errorText}</Text>
        <View style={{ height: 20, alignItems: "left" }}></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "skyblue",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "ChalkboardSE-Bold",
    marginBottom: 24,
    color: "brown",
  },
  body: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    height: 40,
  },
  switchText: {
    color: "blue",
  },
  Image: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
    borderRadius: 15,
  },
});
