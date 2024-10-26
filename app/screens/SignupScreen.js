import React, { useState } from "react";
import {
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";

function SignupScreen({ navigation }) {
  const [loaded] = useFonts({
    "Hanuman-Black": require("../assets/fonts/Hanuman-Black.ttf"),
    "PlayfairDisplay-Black": require("../assets/fonts/PlayfairDisplay-Black.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const handleSignup = () => {
    if (
      !email.includes("@") ||
      password !== retypePassword ||
      password.length < 8
    ) {
      Alert.alert("Try again", "Please enter valid email and matching passwords");
    } else {
      Alert.alert("Success", "Account created successfully");
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/bg.jpg")}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={[styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={[styles.inputContainer, { marginBottom: 20 }]}>
        <TextInput
          style={styles.input}
          placeholder="Retype Password"
          secureTextEntry={true}
          value={retypePassword}
          onChangeText={(text) => setRetypePassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    fontFamily: "Hanuman-Black",
  },
  button: {
    backgroundColor: "#7cccc7",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    width: 100,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "PlayfairDisplay-Black",
  },
});

export default SignupScreen;

