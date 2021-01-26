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
  const [age, setAge] = useState("");
  const [career, setCareer] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Create posts to DB
  async function createPost(title, content, age, career, email) {
    console.log("--- Post creating ---");
    var success = true;

    try {
      setLoading(true);
      const response = await axios.post(API + API_CREATE_POST, {
        title,
        content,
        age,
        career,
        email,
      });
      console.log("Post create successful!");
      console.log("response.data:");
      console.log(response.data);
    } catch (error) {
      console.log("Error retriving posts!");
      console.log(error.response.data.error);
      success = false;
    } finally {
      setLoading(false);
      return success;
    }
  }

  // Create button pressed
  async function createPressed(
    recTitle,
    recContent,
    recAge,
    recCareer,
    recEmail
  ) {
    // Error check if Name entered
    if (recTitle == "") {
      setErrorMessage("Please enter Name.");
      return;
    }
    // Error check if Date entered
    if (recContent == "") {
      setErrorMessage("Please enter an available date for a meetup.");
      return;
    }
    // Error check if Age entered
    if (recAge == "") {
      setErrorMessage("Please enter your Age.");
      return;
    }
    // Error check if Career entered
    if (recCareer == "") {
      setErrorMessage("Please enter your Career.");
      return;
    }
    // Error check if Email entered
    if (recEmail == "") {
      setErrorMessage("Please enter your Email.");
      return;
    }

    // Create post
    const didCreatePost = await createPost(
      recTitle,
      recContent,
      recAge,
      recCareer,
      recEmail
    );

    if (didCreatePost) {
      navigation.navigate("Index", {
        title,
        content,
        age,
        career,
        email,
        action: "create",
      });
    } else {
      alert("Error creating post");
    }
  }

  // Cancel button pressed
  function cancelPressed() {
    return navigation.navigate("Index");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={commonStyles.container}>
        <Text style={styles.textLabel}>Create Date Event</Text>
        <Text style={styles.textLabel2}>Name</Text>
        <TextInput
          placeholder="Enter Name..."
          style={styles.textInput}
          value={title}
          onChangeText={(input) => setTitle(input)}
          onTextInput={() => setErrorMessage("")}
          autoCorrect={false}
        ></TextInput>
        <Text style={styles.textLabel2}>Date, Time and Event </Text>
        <TextInput
          placeholder="Suggest an event and date for a meet up..."
          style={styles.textInput}
          value={content}
          onChangeText={(input) => setContent(input)}
          onTextInput={() => setErrorMessage("")}
          autoCorrect={false}
        ></TextInput>

        <Text style={styles.textLabel2}>Age</Text>
        <TextInput
          placeholder="Enter Age..."
          style={styles.textInput}
          value={age}
          onChangeText={(input) => setAge(input)}
          onTextInput={() => setErrorMessage("")}
          autoCorrect={false}
        ></TextInput>
        <Text style={styles.textLabel2}>Career</Text>
        <TextInput
          placeholder="Enter current Career..."
          style={styles.textInput}
          value={career}
          onChangeText={(input) => setCareer(input)}
          onTextInput={() => setErrorMessage("")}
          autoCorrect={false}
        ></TextInput>
        <Text style={styles.textLabel2}>Email</Text>
        <TextInput
          placeholder="Enter contect Email..."
          style={styles.textInput}
          value={email}
          onChangeText={(input) => setEmail(input)}
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
            onPress={() => createPressed(title, content, age, career, email)}
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
