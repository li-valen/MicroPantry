import React from "react";
import { SafeAreaView, StyleSheet, View,Platform } from "react-native";
import { Text } from "react-native";
import Login from "./screens/Login";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./screens/HomePage";
import ShoppingListScreen from "./screens/ShoppingList";
import Scanner from "./screens/Scanner";
import RecipesScreen from "./screens/Recipes";
import ProfileScreen from "./screens/Profile";
const homeName = "Home";
const shoppingListsName = "Shopping Lists";
const cameraName = "Camera";
const recipesName = "Recipes";
const mealPlansName = "Meal Plans";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

const HomePage = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000', // Black background for the tab bar
          borderTopColor: '#000', // No visible border
          height: Platform.OS === 'android' ? 50 : 80,
        },
        // Customizing the tab label (text) color
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#fff', // Active tab text color (white)
        tabBarInactiveTintColor: '#a1a1a1', // Inactive tab text color (gray)
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === shoppingListsName) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (rn === cameraName) {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (rn === recipesName) {
            iconName = focused ? 'book' : 'book-outline';
          } else if (rn === mealPlansName) {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return the icon component with the appropriate color
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={shoppingListsName} component={ShoppingListScreen} />
      <Tab.Screen name={cameraName} component={Scanner} />
      <Tab.Screen name={recipesName} component={RecipesScreen} />
      <Tab.Screen name={mealPlansName} component={Home} />
      <Tab.Screen name={profileName} component={ProfileScreen} />
    </Tab.Navigator>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Ensuring the background of the screen matches the theme
  },
  tabBar: {
    backgroundColor: '#000', // Black background for the tab bar
    borderTopColor: '#000', // Black border at the top of the tab bar
    borderTopWidth: 1, // Border width (optional)
  },
  tabNavigator: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height:30

  },
});

export default HomePage;