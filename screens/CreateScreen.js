import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_CREATE_POST } from "../hooks/useAPI";

export default function CreateScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Create posts to DB
  async function createPost(title, content) {
    console.log("--- Post creating ---");

    try {
      setLoading(true);
      const response = await axios.post(API + API_CREATE_POST, {
        title,
        content,
      });
      console.log("Post create successful!");
      console.log("response.data:");
      console.log(response.data);
    } catch (error) {
      console.log("Error retriving posts!");
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  // Create button pressed
  function createPressed(recTitle, recContent) {
    // Error check if title entered
    if (recTitle == "") {
      setErrorMessage("Please enter title.");
      return;
    }
    // Error check if content entered
    if (recContent == "") {
      setErrorMessage("Please enter content.");
      return;
    }
    // Create post
    createPost(recTitle, recContent);

    navigation.navigate("Index", { title, content, action: "create" });
  }

  // Cancel button pressed
  function cancelPressed() {
    return navigation.navigate("Index");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={commonStyles.container}>
        <Text style={styles.textLabel}>Add Blog</Text>
        <Text style={styles.textLabel2}>Title</Text>
        <TextInput
          placeholder="Enter title..."
          style={styles.textInput}
          value={title}
          onChangeText={(input) => setTitle(input)}
          onTextInput={() => setErrorMessage("")}
          autoCorrect={false}
        ></TextInput>
        <Text style={styles.textLabel2}>Content</Text>
        <TextInput
          placeholder="Enter content..."
          style={styles.textInput}
          value={content}
          onChangeText={(input) => setContent(input)}
          onTextInput={() => setErrorMessage("")}
          autoCorrect={false}
        ></TextInput>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.button, styles.buttonCancel, { marginRight: 10 }]}
            onPress={() => cancelPressed()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSubmit, { marginLeft: 10 }]}
            onPress={() => createPressed(title, content)}
          >
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="large" color="red" />
              ) : (
                "Create"
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 28,
    color: "brown",
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },
  textLabel2: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    margin: 20,
    borderWidth: 1,
    width: "90%",
    padding: 10,
    borderColor: "#ccc",
    marginTop: 0,
    justifyContent: "center",
  },
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
  buttonSubmit: {
    backgroundColor: "orange",
  },
  buttonCancel: {
    backgroundColor: "red",
  },
  textSignUp: {
    color: "blue",
  },
  errorText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
    height: 20,
    textAlign: "center",
    marginBottom: 10,
  },
});
