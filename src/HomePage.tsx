import React from "react"; // Import React
import { SafeAreaView, StyleSheet, View, Platform } from "react-native"; // Import core components from React Native
import { Text } from "react-native"; // Import Text component
import Login from "./screens/Login"; // Import Login screen component

// Navigation components
import { NavigationContainer } from "@react-navigation/native"; // Import Navigation Container for navigation management
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Import Bottom Tab Navigator
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons for icon rendering

// Importing screens for navigation
import Home from "./screens/HomePage"; // Import Home screen
import ShoppingListScreen from "./screens/ShoppingList"; // Import Shopping List screen
import Scanner from "./screens/Scanner"; // Import Scanner screen
import RecipesScreen from "./screens/Recipes"; // Import Recipes screen
import ProfileScreen from "./screens/Profile"; // Import Profile screen

// Define names for the different tabs
const homeName = "Home";
const shoppingListsName = "Shopping Lists";
const cameraName = "Camera";
const recipesName = "Recipes";
const mealPlansName = "Meal Plans"; // Note: Currently points to Home component
const profileName = "Profile";

const Tab = createBottomTabNavigator(); // Create the Tab Navigator

// Main HomePage component
const HomePage = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}> {/* SafeAreaView for proper padding on iOS devices */}
      <Tab.Navigator
        initialRouteName={homeName} // Set the initial tab to Home
        screenOptions={({ route }) => ({
          headerShown: false, // Hide the header
          tabBarStyle: {
            backgroundColor: '#000', // Black background for the tab bar
            borderTopColor: '#000', // No visible border
            height: Platform.OS === 'android' ? 50 : 80, // Adjust height for different platforms
          },
          // Customizing the tab label (text) color
          tabBarLabelStyle: {
            fontSize: 12, // Font size for tab labels
            fontWeight: 'bold', // Bold font weight
          },
          tabBarActiveTintColor: '#fff', // Active tab text color (white)
          tabBarInactiveTintColor: '#a1a1a1', // Inactive tab text color (gray)
          tabBarIcon: ({ focused, color, size }) => { // Render icons based on tab state
            let iconName;
            let rn = route.name; // Current route name

            // Determine the icon name based on the current route
            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline'; // Home icon
            } else if (rn === shoppingListsName) {
              iconName = focused ? 'list' : 'list-outline'; // Shopping list icon
            } else if (rn === cameraName) {
              iconName = focused ? 'camera' : 'camera-outline'; // Camera icon
            } else if (rn === recipesName) {
              iconName = focused ? 'book' : 'book-outline'; // Recipes icon
            } else if (rn === mealPlansName) {
              iconName = focused ? 'calendar' : 'calendar-outline'; // Meal plans icon
            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline'; // Profile icon
            }

            // Return the icon component with the appropriate color
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        {/* Define the different tabs and their corresponding screens */}
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={shoppingListsName} component={ShoppingListScreen} />
        <Tab.Screen name={cameraName} component={Scanner} />
        <Tab.Screen name={recipesName} component={RecipesScreen} />
        <Tab.Screen name={mealPlansName} component={Home} /> {/* Temporary assignment */}
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    backgroundColor: '#000', // Black background for the entire container
  },
  tabBar: {
    backgroundColor: '#000', // Black background for the tab bar
    borderTopColor: '#000', // Black border at the top of the tab bar
    borderTopWidth: 1, // Optional border width (not visible)
  },
  tabNavigator: {
    position: "absolute", // Absolute positioning to overlay on top of other components
    bottom: 0, // Align at the bottom
    width: "100%", // Full width
    height: 30 // Height of the tab navigator
  },
});

// Export HomePage component as default
export default HomePage;
