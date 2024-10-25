import { StatusBar } from "expo-status-bar"; // Import StatusBar for status bar management
import { StyleSheet } from "react-native"; // Import StyleSheet for styling
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Import stack navigator for screen transitions
import { NavigationContainer } from "@react-navigation/native"; // Import Navigation Container for managing navigation state
import { useEffect, useState } from "react"; // Import hooks from React
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase function to observe user authentication state
import { FIREBASE_AUTH } from "./FirebaseConfig"; // Import Firebase configuration and authentication instance

// Import screens for navigation
import { WelcomeScreen } from "./src/screens/WelcomeScreen"; // Welcome screen component
import { ShoppingListProvider } from './src/screens/ShoppingListContent'; // Import the Shopping List context provider
import Login from "./src/screens/Login"; // Login screen component
import Register from "./src/screens/Register"; // Register screen component
import HomePage from "./src/HomePage"; // Main HomePage component
import Home from "./src/screens/HomePage"; // Home component (could be different from HomePage)
import Scanner from "./src/screens/Scanner"; // Scanner screen component
import Onboarding from "./src/screens/Onboarding"; // Onboarding screen component
import ShoppingList from "./src/screens/ShoppingList"; // Shopping List screen component

// Create a Stack Navigator
const Stack = createNativeStackNavigator();

// Main App component
export default function App() {
  const [user, setUser] = useState<User | null>(null); // State to hold the current user

  useEffect(() => {
    // Set up Firebase authentication state listener
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("User state changed: ", user); // Log the user state change
      setUser(user); // Update the user state
    });
    
    // Cleanup function to unsubscribe from listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    // Provide Shopping List context to the component tree
    <ShoppingListProvider>
      {/* Navigation container to manage navigation state */}
      <NavigationContainer>
        {/* Stack Navigator for handling screen transitions */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Welcome" // Name of the screen
            component={WelcomeScreen} // Component to render for this screen
            options={{ presentation: "modal" }} // Presentation style for modal appearance
          />
          <Stack.Screen name="Login" component={Login} /> 
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={HomePage} /> 
          <Stack.Screen name="HomeReal" component={Home} />
          <Stack.Screen name="Onboarding" component={Onboarding} /> 
          <Stack.Screen name="Scanner" component={Scanner} /> 
          <Stack.Screen name="ShoppingList" component={ShoppingList} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </ShoppingListProvider>
  );
}

// Styles for the App component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Flexbox property to fill the entire screen
    backgroundColor: "#fff", // White background color
    alignItems: "center", // Center align items horizontally
    justifyContent: "center", // Center align items vertically
  },
});
