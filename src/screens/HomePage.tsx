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

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Pantry</Text>
          <Ionicons name="person-circle-outline" size={30} color="#3094c5" />
        </View>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search items..."
          placeholderTextColor="#ccc"
        />

        {/* Recipe Suggestions */}
        <Text style={styles.sectionTitle}>Recipe Suggestions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recipes.map((recipe) => (
            <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
              <Image source={recipe.image} style={styles.recipeImage} />
              <View style={styles.recipeContent}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeDescription}>
                  {recipe.description}
                </Text>
                <LinearGradient
                  colors={["#3094c5", "#156bba"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ borderRadius: 5 }}
                >
                  <TouchableOpacity style={styles.viewRecipeButton}>
                    <Text style={styles.buttonText}>View Recipe</Text>
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
              <Image source={item.image} style={styles.pantryImage} />
              <View style={styles.pantryContent}>
                <Text style={styles.pantryTitle}>{item.title}</Text>
                <Text style={styles.pantryQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Shopping Alerts */}
        <View style={styles.alerts}>
          <Text style={styles.alertText}>Low stock: Milk, Eggs</Text>
        </View>

        {/* Recent Activities */}
        <View style={styles.activities}>
          <Text style={styles.activityText}>You added 3 items today.</Text>
        </View>

        {/* Tips Section */}

        <LinearGradient
          colors={["#3094c5", "#156bba"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.tips}
        >
          <Text style={styles.tipsText}>
            Tip: Plan meals ahead to save time!
          </Text>
        </LinearGradient>
      </ScrollView>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate('Scanner')}      >
        <MaterialIcons name="qr-code-scanner" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3094c5",
  },
  searchBar: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 10,
    color: "white",
    marginBottom: 20,
  },
  quickAccess: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quickButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  quickButtonText: {
    color: "white",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  recipeCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginRight: 10,
    width: 200,
    height: 250,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  recipeImage: {
    width: "100%",
    height: 120,
  },
  recipeContent: {
    padding: 10,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  recipeDescription: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 10,
  },
  viewRecipeButton: {
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  alerts: {
    backgroundColor: "#FFCC00",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  alertText: {
    color: "black",
  },
  activities: {
    marginVertical: 10,
  },
  activityText: {
    color: "white",
  },
  tips: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  tipsText: {
    color: "white",
  },
  pantryCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginRight: 10,
    width: 120,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  pantryImage: {
    width: "100%",
    height: 80,
  },
  pantryContent: {
    padding: 10,
  },
  pantryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  pantryQuantity: {
    color: "#ccc",
    fontSize: 12,
  },
  scanButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 100,
    alignItems: "center",
    width: 70,
    height: 70,
    flex: 1,
    justifyContent: "center",
  },
  scanButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
