import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { API, API_ALL_POSTS, API_DELETE_POST_ID } from "../hooks/useAPI";
import { Card, CardItem, Body } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

var data = [];

export default function IndexScreen({ navigation, route }) {
  const isDarkModeOn = useSelector((state) => state.prefs.darkMode);
  const [errorMessage, setErrorMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => createPressed()}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "#f55",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
    // Retrive all posts from DB and refresh flatlist
    retrivePosts();
  }, []);

  // Monitor route.params for changes and add items to the database
  useEffect(() => {
    if (route.params?.action == "edit") {
      console.log("---Return from edit! ---");
    } else {
      console.log("---- Return from create! ---");
    }
    // Retrive all posts from DB and refresh flatlist
    retrivePosts();
  }, [
    route.params?.title,
    route.params?.content,
    route.params?.age,
    route.params?.career,
    route.params?.email,
  ]);

  // this retrive posts from DB and refresh flatlist
  async function retrivePosts() {
    console.log("--- Posts retriving --- ");

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      //  Send authorization header
      const response = await axios.get(API + API_ALL_POSTS, {
        headers: { Authorization: `JWT ${token}` },
      });

      data = response.data;
      console.log("Posts retrive successful!");
      // trigger flatlist refresh
      setRefresh(!refresh);
    } catch (error) {
      console.log("Error retriving posts!");
      console.log(error);
      if (error.response) {
        console.log(error.response);
      }
    } finally {
      setLoading(false);
    }
  }

  // Create button pressed
  function createPressed() {
    setErrorMessage("");
    return navigation.navigate("Create");
  }

  // Show button pressed
  function showPressed(recID) {
    setErrorMessage("");
    return navigation.navigate("Show", { id: recID });
  }

  // This deletes an individual post
  async function deletePosts(recID) {
    console.log("--- Posts deleting ---");
    try {
      setLoading(true);
      const response = await axios.delete(API + API_DELETE_POST_ID + recID);
      console.log("Posts delete successful!");
      console.log("response.data:");
      console.log(response.data);
      // Refresh data and reload flatlist
      retrivePosts();
    } catch (error) {
      console.log("Error deleting post!");
      console.log(error.response.data.error);
      // setErrorMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  // Delete button pressed
  function deletePressed(recID) {
    console.log("--- Deleting! ---");
    // Here need to add delete Post
    deletePosts(recID);
    return navigation.navigate("Index");
  }

  // The function to render each row in our FlatList
  // change all item.name to item
  function renderPost({ item }) {
    return (
      <Card style={styles.card}>
        <CardItem style={{ backgroundColor: "violet" }}>
          <Body style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
                marginRight: 20,
              }}
            >
              <TouchableOpacity onPress={() => deletePressed(item.id)}>
                <Ionicons name="remove-circle-outline" size={40} color="red" />
              </TouchableOpacity>
            </View>
            <View style={{ width: "80%", flexDirection: "column" }}>
              <TouchableOpacity onPress={() => showPressed(item.id)}>
                <Text style={styles.renderViewText}>{item.title}</Text>
                <Text style={{ color: "white" }} numberOfLines={1}>
                  {item.content}
                </Text>

                {/* <Text style={{ color: "white" }} numberOfLines={1}>
                  {item.age}
                </Text>
                <Text style={{ color: "white" }} numberOfLines={1}>
                  {item.career}
                </Text>
                <Text style={{ color: "white" }} numberOfLines={1}>
                  {item.email}
                </Text> */}
              </TouchableOpacity>
            </View>
            <View
              style={{ width: "10%", alignItems: "center", marginRight: 30 }}
            >
              <TouchableOpacity onPress={() => showPressed(item.id)}>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </Body>
        </CardItem>
      </Card>
    );
  }

  // This will clear the whole screen and replace with a spinner
  if (loading) {
    return (
      <View
        style={[
          commonStyles.container,
          isDarkModeOn && { backgroundColor: "black" },
        ]}
      >
        {/* <View style={commonStyles.container}> */}
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View
      style={[
        commonStyles.container,
        isDarkModeOn && { backgroundColor: "black" },
      ]}
    >
      <Text style={[styles.text, isDarkModeOn && { color: "white" }]}>
        Members Available Dates
      </Text>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderPost}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.id.toString()}
          extraData={refresh}
        />
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "brown",
  },
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    // alignItems: "center",
    textAlign: "center",
    // justifyContent: "center",
    width: "100%", // give the container full width
    fontSize: 28,
    fontWeight: "bold",
    color: "brown",
  },
  card: {
    flex: 1,
    width: "100%",
  },
});
