import React, { useEffect, useState } from "react";
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
import { API, API_POST_ID, API_EDIT_POST_ID } from "../hooks/useAPI";

export default function EditScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [age, setAge] = useState("");
  const [career, setCareer] = useState("");
  const [email, setEmail] = useState("");

  const [oldTitle, setOldTitle] = useState("");
  const [oldContent, setOldContent] = useState("");
  const [oldAge, setOldAge] = useState("");
  const [oldCareer, setOldCareer] = useState("");
  const [oldEmail, setOldEmail] = useState("");

  const [id, setID] = useState(route.params.id);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Start when loaded
  useEffect(() => {
    //Retrive post by ID
    retrivePost(id);
  }, []);

  // Retrive posts by ID from DB
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

      setOldTitle(response.data.title);
      setOldContent(response.data.content);
      setOldAge(response.data.age);
      setOldCareer(response.data.career);
      setOldEmail(response.data.email);

      console.log("Post retrive successful!");
    } catch (error) {
      console.log("Error retriving post!");
    } finally {
      setLoading(false);
    }
  }

  // Edit posts by ID
  async function editPostByID(title, content, age, career, email, recID) {
    console.log("--- Post editing ---");

    try {
      setLoading(true);
      const response = await axios.put(API + API_EDIT_POST_ID + recID, {
        title,
        content,
        age,
        career,
        email,
      });
      console.log("Post edit successful!");
      console.log("response.data:");
      console.log(response.data);
    } catch (error) {
      console.log("Error retriving posts!");
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  // Edit button pressed
  function editPressed(
    recTitle,
    recContent,
    recAge,
    recCareer,
    recEmail,
    recID
  ) {
    // Error check if changes made to title or content
    if (
      recTitle == oldTitle &&
      recContent == oldContent &&
      recAge == oldAge &&
      recCareer == oldCareer &&
      recEmail == oldEmail
    ) {
      setErrorMessage("No changes made.");
      return;
    }
    // Edit post by ID
    editPostByID(recTitle, recContent, recAge, recCareer, recEmail, recID);

    return navigation.navigate("Index", {
      title,
      content,
      age,
      career,
      email,
      id,
      action: "edit",
    });
  }

  // Cancel button pressed
  function cancelPressed() {
    return navigation.navigate("Show");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={commonStyles.container}>
        <Text style={styles.textLabel}>Edit Post</Text>
        <Text style={styles.textLabel2}>Name</Text>
        <TextInput
          placeholder="Enter  Name..."
          style={styles.textInput}
          value={title}
          onChangeText={(input) => setTitle(input)}
          onTextInput={() => setErrorMessage("")}
          autoCorrect={false}
        ></TextInput>
        <Text style={styles.textLabel2}>Date</Text>
        <TextInput
          placeholder="Enter available date..."
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
          placeholder="Enter contact Email..."
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
            style={[styles.button, styles.buttonSubmit]}
            onPress={() => editPressed(title, content, age, career, email, id)}
          >
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="large" color="red" />
              ) : (
                "Edit"
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
    fontSize: 18,
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
    backgroundColor: "green",
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
