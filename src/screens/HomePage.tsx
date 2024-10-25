import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

// Sample data for recipes
const recipes = [
  {
    id: 1,
    title: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish.",
    image: require("../../assets/best-zucchini-slice-recipe-close-up-196308-1.jpg"), // Using the specified image
  },
  {
    id: 2,
    title: "Chicken Curry",
    description: "A spicy and flavorful dish.",
    image: require("../../assets/Easy-Dinner-Ideas-H.jpg"), // Using the specified image
  },
  {
    id: 3,
    title: "Caesar Salad",
    description: "A fresh and crisp salad.",
    image: require("../../assets/maxresdefault.jpg"), 
  },
];

// Sample data for pantry items
const pantryItems = [
  {
    id: 1,
    title: "Milk",
    quantity: 2,
    image: require("../../assets/81mcmdJ196L.jpg"), 
  },
  {
    id: 2,
    title: "Eggs",
    quantity: 12,
    image: require("../../assets/1.webp"), 
  },
  {
    id: 3,
    title: "Butter",
    quantity: 1,
    image: require("../../assets/Butter.webp"), 
  },
  {
    id: 4,
    title: "Bread",
    quantity: 1,
    image: require("../../assets/modest-slices-sesame-covered-bread-marble-table_114579-56646.avif"), 
  },
  {
    id: 5,
    title: "Cheese",
    quantity: 5,
    image: require("../../assets/Pizza-Cheese-Block-200-gm-Box-1.webp"), 
  },
];

// Main functional component for HomeScreen
export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>My Pantry</Text> {/* Title of the app */}
          <Ionicons name="person-circle-outline" size={30} color="#3094c5" /> {/* User icon */}
        </View>

        {/* Search Bar for pantry items */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search items..."
          placeholderTextColor="#ccc" // Placeholder text color
        />

        {/* Recipe Suggestions Section */}
        <Text style={styles.sectionTitle}>Recipe Suggestions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recipes.map((recipe) => (
            <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
              <Image source={recipe.image} style={styles.recipeImage} /> {/* Recipe image */}
              <View style={styles.recipeContent}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text> {/* Recipe title */}
                <Text style={styles.recipeDescription}>
                  {recipe.description} {/* Recipe description */}
                </Text>
                {/* Button to view recipe details */}
                <LinearGradient
                  colors={["#3094c5", "#156bba"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ borderRadius: 5 }}
                >
                  <TouchableOpacity style={styles.viewRecipeButton}>
                    <Text style={styles.buttonText}>View Recipe</Text> {/* Button text */}
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Pantry Items Section */}
        <Text style={styles.sectionTitle}>Pantry Items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pantryItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.pantryCard}>
              <Image source={item.image} style={styles.pantryImage} /> {/* Pantry item image */}
              <View style={styles.pantryContent}>
                <Text style={styles.pantryTitle}>{item.title}</Text> {/* Pantry item title */}
                <Text style={styles.pantryQuantity}>
                  Quantity: {item.quantity} {/* Quantity of the pantry item */}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Shopping Alerts Section */}
        <View style={styles.alerts}>
          <Text style={styles.alertText}>Low stock: Milk, Eggs</Text> {/* Alert for low stock items */}
        </View>

        {/* Recent Activities Section */}
        <View style={styles.activities}>
          <Text style={styles.activityText}>You added 3 items today.</Text> {/* Recent activity message */}
        </View>

        {/* Tips Section */}
        <LinearGradient
          colors={["#3094c5", "#156bba"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.tips}
        >
          <Text style={styles.tipsText}>
            Tip: Plan meals ahead to save time! {/* Meal planning tip */}
          </Text>
        </LinearGradient>
      </ScrollView>
      {/* Floating button to navigate to scanner screen */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate('Scanner')} // Navigate to scanner screen
      >
        <MaterialIcons name="qr-code-scanner" size={24} color="#007AFF" /> {/* QR code scanner icon */}
      </TouchableOpacity>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // Dark background color
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10, // Padding for status bar
  },
  header: {
    flexDirection: "row", // Align header items in a row
    justifyContent: "space-between", // Space between title and user icon
    alignItems: "center", // Center items vertically
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3094c5", // Title color
  },
  searchBar: {
    backgroundColor: "#1E1E1E", // Search bar background
    borderRadius: 10,
    padding: 10,
    color: "white", // Text color in search bar
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white", // Section titles color
    marginBottom: 10,
  },
  recipeCard: {
    backgroundColor: "#1E1E1E", // Recipe card background
    borderRadius: 10,
    marginRight: 10,
    width: 200, // Width of recipe card
    height: 250, // Height of recipe card
    overflow: "hidden",
    shadowColor: "#000", // Shadow properties for the recipe card
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  recipeImage: {
    width: "100%",
    height: 120, // Height of recipe image
  },
  recipeContent: {
    padding: 10, // Padding inside recipe card
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // Recipe title color
    marginBottom: 5,
  },
  recipeDescription: {
    color: "#ccc", // Description text color
    fontSize: 14,
    marginBottom: 10,
  },
  viewRecipeButton: {
    borderRadius: 5,
    padding: 5,
    alignItems: "center", // Center align button text
  },
  buttonText: {
    color: "white",
    fontWeight: "bold", // Button text weight
  },
  alerts: {
    backgroundColor: "#FFCC00", // Alert background color
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  alertText: {
    color: "black", // Alert text color
  },
  activities: {
    marginVertical: 10,
  },
  activityText: {
    color: "white", // Recent activities text color
  },
  tips: {
    backgroundColor: "#007AFF", // Tips section background color
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  tipsText: {
    color: "white", // Tips text color
  },
  pantryCard: {
    backgroundColor: "#1E1E1E", // Pantry card background color
    borderRadius: 10,
    marginRight: 10,
    width: 120, // Width of pantry card
    overflow: "hidden",
    shadowColor: "#000", // Shadow properties for the pantry card
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  pantryImage: {
    width: "100%",
    height: 80, // Height of pantry item image
  },
  pantryContent: {
    padding: 10, // Padding inside pantry card
  },
  pantryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white", // Pantry item title color
  },
  pantryQuantity: {
    color: "#ccc", // Quantity text color
    fontSize: 12,
  },
  scanButton: {
    position: "absolute",
    bottom: 20, // Positioning of the scan button
    right: 20,
    backgroundColor: "#fff", // Scan button background color
    borderRadius: 100, // Round button
    alignItems: "center",
    width: 70, // Button width
    height: 70, // Button height
    flex: 1,
    justifyContent: "center", // Center icon in button
  },
});
