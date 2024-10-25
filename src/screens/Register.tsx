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
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig"; // Firebase configuration imports
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth"; // Firebase Auth functions
import { doc, setDoc } from "firebase/firestore"; // Firestore functions
import { LinearGradient } from "expo-linear-gradient"; // Linear gradient for styling

// Main functional component for the registration screen
const Register = ({ navigation }: { navigation: any }) => {
  // State variables for user input and loading status
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = FIREBASE_AUTH; // Firebase Auth instance

  // Function to handle user registration
  const register = async () => {
    setIsLoading(true); // Set loading state
    try {
      // Create user account with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with the provided username
      await updateProfile(user, { displayName: username });

      // Send email verification to the user
      await sendEmailVerification(user);

      // Create a new document in Firestore for the user
      const userRef = doc(FIRESTORE_DB, "users", user.uid);
      await setDoc(userRef, {
        email: user.email,
        username: username,
        pantry: null, // Initialize pantry as null
        preferredProviders: [], // Initialize preferred providers as an empty array
        onboarded: false, // Flag to check if user is onboarded
        onboardDate: null, // Date of onboarding
      });

      // Sign out the user after registration
      await signOut(auth);

      // Show success message and navigate to login screen
      Alert.alert("Registration Successful", "Please verify your email");
      navigation.navigate("Login");
    } catch (error) {
      // Handle registration errors with specific messages
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email");
      } else if (error.code === "auth/weak-password") {
        alert("Weak password");
      } else {
        // Handle other errors generically
        let errorMessage = "Failed to register. Please try again.";
        if (error instanceof Error) {
          errorMessage = error.message; // Get error message if available
        }
        Alert.alert("Registration Failed", errorMessage);
        console.error(error); // Log the error for debugging
      }
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient background for the screen */}
      <LinearGradient colors={['#156bba', '#4e4e4e']} style={styles.backgroundGradient}>
        {/* Image Above Title */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require("../../assets/istockphoto-1318452948-612x612.jpg")} // Background image
            style={styles.image}
            resizeMode="cover" // Cover the entire area
          >
            <LinearGradient
              colors={['transparent', '#23649f']} // Gradient overlay on image
              style={styles.imageOverlay}
            />
          </ImageBackground>
        </View>

        {/* Title section */}
        <View style={styles.titleFormContainer}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Welcome Aboard!</Text>
          </View>
        </View>

        {/* User input form for registration */}
        <View style={styles.form}>
          {/* Username Input */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Username" // Placeholder text
              placeholderTextColor={"rgba(255, 255, 255, 0.5)"} // Placeholder color
              onChangeText={(text) => setUsername(text)} // Update username state
              autoCapitalize="none" // Prevent automatic capitalization
              style={styles.textInput}
            />
          </View>
          {/* Email Input */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email" // Placeholder text
              placeholderTextColor={"rgba(255, 255, 255, 0.5)"} // Placeholder color
              onChangeText={(text) => setEmail(text)} // Update email state
              autoCapitalize="none" // Prevent automatic capitalization
              style={styles.textInput}
            />
          </View>
          {/* Password Input */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Password" // Placeholder text
              placeholderTextColor={"rgba(255, 255, 255, 0.5)"} // Placeholder color
              secureTextEntry={true} // Secure entry for password
              onChangeText={(text) => setPassword(text)} // Update password state
              autoCapitalize="none" // Prevent automatic capitalization
              style={styles.textInput}
            />
          </View>
          <View style={styles.registerButtonView}>
            {/* Register button */}
            <TouchableOpacity
              style={styles.registerButtonTouchableOpacity}
              onPress={register} // Trigger registration on press
              disabled={isLoading} // Disable button if loading
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>

          {/* Show loading spinner while registering */}
          {isLoading && (
            <ActivityIndicator size="large" color="#3098ca" style={styles.spinner} />
          )}

          {/* Link to the login screen for existing users */}
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

// Styles for the component
const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
    padding: 0,
  },
  container: {
    height: "100%",
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Adjust for status bar on Android
  },
  imageContainer: {
    width: '100%',
    height: 200, // Height of the image container
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
    height: 100,
  },
  titleView: {
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 42, // Title font size
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Center align form items
  },
  inputBox: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
    borderColor: "#3098ca", // Border color
    borderWidth: 1,
    borderRadius: 10,
    width: "95%", // Width of the input box
    marginBottom: 20, // Spacing between input boxes
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000", // Shadow effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    color: "#fff", // Input text color
    fontSize: 16, // Input text size
  },
  registerButtonView: {
    marginTop: 30,
    width: "90%", // Width of the register button
  },
  registerButtonTouchableOpacity: {
    width: "100%",
    backgroundColor: "#3098ca", // Button background color
    padding: 10,
    borderRadius: 10,
    alignItems: "center", // Center button text
    shadowColor: "#000", // Shadow effect
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
    color: "#fff", // Button text color
  },
  signupView: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center", // Center the signup text
  },
  signupText: {
    color: "white",
    fontSize: 14, // Signup text size
  },
  spinner: {
    marginTop: 20, // Space above the loading spinner
  },
});

// Export the Register component
export default Register;
