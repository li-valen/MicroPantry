import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

// Import screens
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { ShoppingListProvider } from './src/screens/ShoppingListContent'; // Import the context
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import HomePage from "./src/HomePage";
import Home from "./src/screens/HomePage";
import Scanner from "./src/screens/Scanner";
import Onboarding from "./src/screens/Onboarding";
import ShoppingList from "./src/screens/ShoppingList";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("User state changed: ", user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ShoppingListProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ presentation: "modal" }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
