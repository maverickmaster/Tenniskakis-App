import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, CardItem, Body } from "native-base";
import axios from "axios";
import { API, API_POST_ID } from "../hooks/useAPI";
import { DarkTheme } from "@react-navigation/native";

export default function ShowScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [age, setAge] = useState("");
  const [career, setCareer] = useState("");
  const [email, setEmail] = useState("");

  const [id, setID] = useState(route.params.id);
  const [loading, setLoading] = useState(false);

  // Start when loaded
  useEffect(() => {
    //Retrive post by ID
    retrivePost(id);

    // Add home icon to header right
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => editPressed(id)}
        >
          <MaterialCommunityIcons
            name="file-document-edit-outline"
            size={40}
            color="black"
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  // Retrive posts
  async function retrivePost(recID) {
    console.log("--- Post retriving --- ");

    try {
      setLoading(true);
      const response = await axios.get(API + API_POST_ID + recID);
      console.log("Title: " + response.data.title);
      console.log("Content: " + response.data.content);
      console.log("Age: " + response.data.age);
      console.log("Career: " + response.data.career);
      console.log("Email: " + response.data.email);

      setTitle(response.data.title);
      setContent(response.data.content);
      setAge(response.data.age);
      setCareer(response.data.career);
      setEmail(response.data.email);

      console.log("Post retrive successful!");
    } catch (error) {
      console.log("Error retriving post!");
    } finally {
      setLoading(false);
    }
  }

  function editPressed(recID) {
    return navigation.navigate("Edit", { id: recID });
  }

  function backPressed() {
    return navigation.navigate("Index", { action: "show" });
  }

  return (
    <View style={commonStyles.container}>
      {/*      <Text style={styles.titleText}>Show Screen</Text> */}
      <Card style={styles.card}>
        <CardItem>
          <Body>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardBody}>{age}</Text>
            <Text style={styles.cardBody}>{career}</Text>
            <Text style={styles.cardBody}>{email}</Text>
            <Text>{content}</Text>
          </Body>
        </CardItem>
      </Card>
      <TouchableOpacity
        style={[styles.button, styles.buttonBack]}
        onPress={() => backPressed()}
      >
        <Text style={styles.buttonText}>
          {loading ? <ActivityIndicator size="large" color="red" /> : "Back"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    padding: 5,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonBack: {
    backgroundColor: "green",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    color: "blue",
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginBottom: 3,
  },

  card: {
    flex: 1,
    width: "90%",
  },
});
