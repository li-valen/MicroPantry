import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
} from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is logged in. If so, redirect to onboarding
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (FIREBASE_AUTH.currentUser) {
        navigation.navigate("Onboarding");
      }
    });

    return unsubscribe;
  }, [navigation]);

  const loginFunction = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user: any = userCredential.user;
      setIsLoading(false);

      // Check if user is verified
      if (!user.emailVerified) {
        throw new Error("Email not verified");
      }

      const userRef: any = doc(FIRESTORE_DB, "users", user.uid);

      // Check if user is onboarded
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData: any = userDoc.data();
        if (!userData.onboarded) {
          console.log("User is not onboarded, redirecting to onboarding");
          navigation.navigate("Onboarding");
        } else {
          console.log("User is onboarded, redirecting to home");
          navigation.navigate("Home");
        }
      } else {
        // Create user with default values
        await setDoc(userRef, {
          email: user.email,
          username: user.email.split("@")[0],
          pantry: null,
          preferredProviders: [],
          onboarded: false,
          onboardDate: null,
        });

        console.log("User is not onboarded, redirecting after creating user");
        navigation.navigate("Onboarding");
      }
    } catch (error) {
      setIsLoading(false);
      // Check for common errors
      if (error.code === "auth/user-not-found") {
        alert("User not found");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password");
      } else if (error.code === "auth/email-not-verified") {
        alert("Email not verified");
      } else if (error.code === "auth/too-many-requests") {
        alert("Too many requests");
      } else if (error.code === "auth/invalid-credential") {
        alert("Invalid credential. Are your email and password correct?");
      } else {
        let errorMessage = "";
        if (error instanceof Error) {
          errorMessage = error.message;
        }

        errorMessage = errorMessage.replace("Firebase: Error: ", "");
        errorMessage = errorMessage.replace("(", "").replace(")", "");
        errorMessage = errorMessage.replace("auth/", "");

        alert(errorMessage);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* background gradient */}
      <LinearGradient
        colors={["#156bba", "#4e4e4e"]}
        style={styles.backgroundGradient}
      >
        {/* Image Above Title */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require("../../assets/istockphoto-1318452948-612x612.jpg")} // Update with your image path
            style={styles.image}
            // resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "#23649f"]}
              style={styles.imageOverlay}
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

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.loginButtonView}>
            <TouchableOpacity
              style={styles.loginButtonTouchableOpacity}
              // onPress={loginFunction}
              onPress={() => navigation.navigate("Onboarding")}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Loading Spinner */}
          {isLoading && (
            <ActivityIndicator
              size="large"
              color="#3098ca"
              style={styles.spinner}
            />
          )}

          {/* Signup */}
          <View style={styles.signupView}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={[styles.signupText, { color: "#64c2ec" }]}>
                {" "}
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
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
    width: "100%",
    height: 200, // Adjust as needed for your layout
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  titleFormContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
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
  loginButtonView: {
    marginTop: 30,
    width: "90%",
  },
  loginButtonTouchableOpacity: {
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
  loginButtonText: {
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
  forgotPasswordView: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "center",
  },
  spinner: {
    marginTop: 20,
  },
  tagline: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default Login;
