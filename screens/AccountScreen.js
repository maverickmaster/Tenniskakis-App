import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUsername } from "../hooks/useAPI";
import { useDispatch, useSelector } from "react-redux";
import { signOutAction } from "../redux/ducks/blogAuth";
import { toggleDarkMode } from "../redux/ducks/accountPrefs";

export default function AccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const [username, loading, error, refresh] = useUsername();
  const isDarkModeOn = useSelector((state) => state.prefs.darkMode);
  const [isEnabled, setIsEnabled] = useState(false);
  //const [isEnabled, setIsEnabled] = useState(false);

  // signs out if the useUsername hook returns error as true
  useEffect(() => {
    if (error) {
      signOut();
    }
  }, [error]);

  useEffect(() => {
    const removeListener = navigation.addListener("focus", () => {
      refresh(true);
    });

    return removeListener;
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");

    dispatch(signOutAction());
  }

  return (
    <View
      style={[
        commonStyles.container,
        isDarkModeOn && { backgroundColor: "black" },
      ]}
    >
      <Text style={[styles.titleText, isDarkModeOn && { color: "white" }]}>
        Member Account Screen
      </Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.usernameText}>{username}</Text>
      )}
      <View style={styles.horizontalBlock}>
        <Text style={isDarkModeOn && { color: "white" }}>Dark mode</Text>
        <Switch
          value={isDarkModeOn}
          onValueChange={() => dispatch(toggleDarkMode())}

          // value={isEnabled}
          // onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View>
      <Text> {isDarkModeOn ? "DARK MODE ON" : "DARK MODE OFF"}</Text>

      <Button title="Sign out" onPress={signOut} />
      <Image
        source={require("../assets/dateme.jpg")}
        style={{ height: 160, width: 160, marginTop: 15, borderRadius: 15 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "brown",
    marginBottom: 108,
  },
  usernameText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "grey",
    marginBottom: 12,
  },
  horizontalBlock: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    width: "35%",
    flexDirection: "row",
  },
});
