import React, { useState } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import {
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";

const Register = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const register = async () => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile to include username
      await updateProfile(user, { displayName: username });

      // Send email verification
      await sendEmailVerification(user);

      // Make new user in Firestore
      const userRef = doc(FIRESTORE_DB, "users", user.uid);
      await setDoc(userRef, {
        email: user.email,
        username: username,
        pantry: null,
        preferredProviders: [],
        onboarded: false,
        onboardDate: null,
      });

      // Sign the user out
      await signOut(auth);

      Alert.alert("Registration Successful", "Please verify your email");
      navigation.navigate("Login");
    } catch (error) {
      // Check for common errors
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email");
      } else if (error.code === "auth/weak-password") {
        alert("Weak password");
      } else {
        // Handle other errors
        let errorMessage = "Failed to register. Please try again.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        Alert.alert("Registration Failed", errorMessage);
        console.error(error);
      }
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#156bba', '#4e4e4e']} style={styles.backgroundGradient}>
        {/* Image Above Title */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require("../../assets/istockphoto-1318452948-612x612.jpg")} // Update to your image path
            style={styles.image}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['transparent', '#23649f']}
              style={styles.imageOverlay}
            />
          </ImageBackground>
        </View>

        {/* Title */}
        <View style={styles.titleFormContainer}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Welcome Aboard!</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Username Input */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
              onChangeText={(text) => setUsername(text)}
              autoCapitalize="none"
              style={styles.textInput}
            />
          </View>
          {/* Email Input */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              style={styles.textInput}
            />
          </View>
          {/* Password Input */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              autoCapitalize="none"
              style={styles.textInput}
            />
          </View>
          <View style={styles.registerButtonView}>
            <TouchableOpacity
              style={styles.registerButtonTouchableOpacity}
              onPress={register}
              disabled={isLoading}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>

          {isLoading && (
            <ActivityIndicator size="large" color="#3098ca" style={styles.spinner} />
          )}

          <View style={styles.signupView}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.signupText, { color: "#64c2ec" }]}>
                {" "}Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
    padding: 0,
  },
  container: {
    height: "100%",
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  imageContainer: {
    width: '100%',
    height: 200, 
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  titleFormContainer: {
    justifyContent: "space-around",
    height:100

  },
  titleView: {
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 42,
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "#3098ca",
    borderWidth: 1,
    borderRadius: 10,
    width: "95%",
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    color: "#fff",
    fontSize: 16,
  },
  registerButtonView: {
    marginTop: 30,
    width: "90%",
  },
  registerButtonTouchableOpacity: {
    width: "100%",
    backgroundColor: "#3098ca",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  signupView: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  signupText: {
    color: "white",
    fontSize: 14,
  },
  spinner: {
    marginTop: 20,
  },
});

export default Register;
