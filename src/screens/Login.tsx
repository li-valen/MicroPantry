import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"; // Safe area for handling notch and status bar
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
  ActivityIndicator,
} from "react-native"; // Basic React Native components
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig"; // Firebase configuration
import { signInWithEmailAndPassword } from "firebase/auth"; // Function to sign in with email and password
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions for document operations
import { LinearGradient } from "expo-linear-gradient"; // For creating a gradient background

// Functional component for the login screen
const Login = ({ navigation }: { navigation: any }) => {
  // State variables for email, password, and loading status
  const [email, setEmail] = useState(""); // Email input state
  const [password, setPassword] = useState(""); // Password input state
  const [isLoading, setIsLoading] = useState(false); // Loading state for the login process

  // Effect hook to check if the user is already logged in
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (FIREBASE_AUTH.currentUser) {
        navigation.navigate("Onboarding"); // Redirect to Onboarding if user is logged in
      }
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, [navigation]);

  // Function to handle user login
  const loginFunction = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      // Attempt to sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user: any = userCredential.user; // Get user object from credential
      setIsLoading(false); // Reset loading state

      // Check if user email is verified
      if (!user.emailVerified) {
        throw new Error("Email not verified"); // Throw error if email is not verified
      }

      const userRef: any = doc(FIRESTORE_DB, "users", user.uid); // Reference to the user's document in Firestore

      // Check if user document exists in Firestore
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData: any = userDoc.data(); // Get user data from Firestore
        if (!userData.onboarded) {
          console.log("User is not onboarded, redirecting to onboarding");
          navigation.navigate("Onboarding"); // Redirect to Onboarding if not onboarded
        } else {
          console.log("User is onboarded, redirecting to home");
          navigation.navigate("Home"); // Redirect to Home if onboarded
        }
      } else {
        // Create a new user document with default values if it does not exist
        await setDoc(userRef, {
          email: user.email,
          username: user.email.split("@")[0], // Extract username from email
          pantry: null,
          preferredProviders: [],
          onboarded: false,
          onboardDate: null,
        });

        console.log("User is not onboarded, redirecting after creating user");
        navigation.navigate("Onboarding"); // Redirect to Onboarding after creating user
      }
    } catch (error) {
      setIsLoading(false); // Reset loading state on error
      // Check for common error cases
      if (error.code === "auth/user-not-found") {
        alert("User not found"); // Alert if user not found
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email"); // Alert for invalid email
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password"); // Alert for wrong password
      } else if (error.code === "auth/email-not-verified") {
        alert("Email not verified"); // Alert for unverified email
      } else if (error.code === "auth/too-many-requests") {
        alert("Too many requests"); // Alert for too many requests
      } else if (error.code === "auth/invalid-credential") {
        alert("Invalid credential. Are your email and password correct?"); // Alert for invalid credentials
      } else {
        let errorMessage = ""; // Generic error message
        if (error instanceof Error) {
          errorMessage = error.message; // Get error message if it's an instance of Error
        }

        // Clean up error message for better readability
        errorMessage = errorMessage.replace("Firebase: Error: ", "");
        errorMessage = errorMessage.replace("(", "").replace(")", "");
        errorMessage = errorMessage.replace("auth/", "");

        alert(errorMessage); // Show alert with error message
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#156bba", "#4e4e4e"]}
        style={styles.backgroundGradient}
      >
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require("../../assets/istockphoto-1318452948-612x612.jpg")} // Image used as a background
            style={styles.image}
          >
            <LinearGradient
              colors={["transparent", "#23649f"]}
              style={styles.imageOverlay} // Gradient overlay for better text visibility
            />
          </ImageBackground>
        </View>

        <View style={styles.titleFormContainer}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Welcome Back!</Text> 
            <Text style={styles.tagline}>
              Your go-to app for delicious recipes 
            </Text>
          </View>
        </View>

        {/* Form for user input */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email" // Placeholder for email input
              placeholderTextColor={"rgba(255, 255, 255, 0.5)"} // Placeholder text color
              autoCapitalize="none" // Disable auto-capitalization
              onChangeText={(text) => setEmail(text)} // Update email state
              style={styles.textInput} // Text input styles
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Password" // Placeholder for password input
              placeholderTextColor={"rgba(255, 255, 255, 0.5)"} // Placeholder text color
              secureTextEntry={true} // Mask password input
              autoCapitalize="none" // Disable auto-capitalization
              onChangeText={(text) => setPassword(text)} // Update password state
              style={styles.textInput} // Text input styles
            />
          </View>
          <View style={styles.loginButtonView}>
            <TouchableOpacity
              style={styles.loginButtonTouchableOpacity}
              onPress={loginFunction} // Trigger login function on press
              disabled={isLoading} // Disable button when loading
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {isLoading && (
            <ActivityIndicator
              size="large" // Spinner size
              color="#3098ca" // Spinner color
              style={styles.spinner} // Spinner styles
            />
          )}

          <View style={styles.signupView}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={[styles.signupText, { color: "#64c2ec" }]}>
                {" "}
                Register 
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.forgotPasswordView}>
            <TouchableOpacity>
              <Text style={[styles.signupText, { color: "#64c2ec" }]}>
                {" "}
                Forgot Password 
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
    flex: 1, // Allow the gradient to fill the whole screen
    padding: 0,
  },
  container: {
    height: "100%", // Full height of the screen
    backgroundColor: "#000", // Background color for the container
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Adjust padding for Android status bar
  },
  imageContainer: {
    width: "100%", // Full width of the image container
    height: 200, // Height of the image container
    overflow: "hidden", // Hide overflow
    position: "relative", // Relative positioning for the overlay
  },
  image: {
    width: "100%", // Full width of the image
    height: "100%", // Full height of the image
  },
  imageOverlay: {
    position: "absolute", // Absolute positioning to overlay gradient
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  titleFormContainer: {
    flex: 1, // Flexible height to adapt to content
    justifyContent: "space-around", // Space out children evenly
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleView: {
    alignItems: "center", // Center align title view
  },
  title: {
    color: "#fff", // Title color
    fontWeight: "bold", // Bold font
    letterSpacing: 2, // Letter spacing
    fontSize: 42, // Title font size
  },
  form: {
    flex: 1, // Flexible height to adapt to content
    alignItems: "center", // Center align form elements
    justifyContent: "center", // Center elements vertically
  },
  inputBox: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
    borderColor: "#3098ca", // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Rounded corners
    width: "95%", // Input box width
    marginBottom: 20, // Space between input boxes
    paddingHorizontal: 15, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2, // Vertical shadow offset
    },
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5, // Elevation for Android
  },
  textInput: {
    color: "#fff", // Text color
    fontSize: 16, // Text font size
  },
  loginButtonView: {
    marginTop: 30, // Space above the login button
    width: "90%", // Width of the button container
  },
  loginButtonTouchableOpacity: {
    width: "100%", // Full width for button
    backgroundColor: "#3098ca", // Button background color
    padding: 10, // Button padding
    borderRadius: 10, // Rounded button corners
    alignItems: "center", // Center align text in button
    shadowColor: "#000", // Shadow color for button
    shadowOffset: {
      width: 0,
      height: 2, // Vertical shadow offset
    },
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5, // Elevation for Android
  },
  loginButtonText: {
    fontSize: 20, // Font size for button text
    fontWeight: "bold", // Bold font for button text
    color: "#fff", // Text color for button
  },
  signupView: {
    flexDirection: "row", // Horizontal layout for signup prompt
    marginTop: 10, // Space above the prompt
    justifyContent: "center", // Center align the prompt
  },
  signupText: {
    color: "white", // Text color for signup prompt
    fontSize: 14, // Font size for signup text
  },
  forgotPasswordView: {
    flexDirection: "row", // Horizontal layout for forgot password prompt
    marginTop: 4, // Space above the prompt
    justifyContent: "center", // Center align the prompt
  },
  spinner: {
    marginTop: 20, // Space above the spinner
  },
  tagline: {
    color: "#fff", // Tagline text color
    fontSize: 16, // Tagline font size
    textAlign: "center", // Center align tagline text
    paddingHorizontal: 20, // Horizontal padding for tagline
  },
});

export default Login; // Export the Login component
