import React, { useState } from 'react'; // Import necessary modules and hooks from React
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'; // Import React Native components
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for gradient button styling

// Define the interface for recipe items
interface RecipeItem {
  id: number; // Unique identifier for each recipe
  title: string; // Title of the recipe
}

// Define the main functional component for the recipes screen
export default function RecipesScreen() {
  // State for managing the list of recipes and the input for a new recipe
  const [recipeList, setRecipeList] = useState<RecipeItem[]>([]);
  const [newRecipe, setNewRecipe] = useState<string>('');

  // Function to add a new recipe to the list
  const addRecipe = () => {
    // Check if the input is empty
    if (newRecipe.trim() === '') {
      Alert.alert('Error', 'Please enter a valid recipe name'); // Show an alert if empty
      return;
    }
    // Create a new recipe object
    const newRecipeObject: RecipeItem = {
      id: Date.now(), // Use current timestamp as a unique ID
      title: newRecipe, // Set the title from the input
    };
    // Update the recipe list state with the new recipe
    setRecipeList([...recipeList, newRecipeObject]);
    setNewRecipe(''); // Clear the input field
    Keyboard.dismiss(); // Dismiss the keyboard after adding
  };

  // Function to delete a recipe by its ID
  const deleteRecipe = (id: number) => {
    const updatedList = recipeList.filter((item) => item.id !== id); // Filter out the recipe to be deleted
    setRecipeList(updatedList); // Update the state with the new list
  };

  // Render function for each item in the FlatList
  const renderItem = ({ item }: { item: RecipeItem }) => (
    <View style={styles.itemContainer}> {/* Container for each recipe item */}
      <Text style={styles.itemText}>{item.title}</Text> {/* Display the recipe title */}
      <TouchableOpacity onPress={() => deleteRecipe(item.id)}> {/* Delete button */}
        <Ionicons name="trash-outline" size={24} color="#ff6b6b" /> {/* Trash icon */}
      </TouchableOpacity>
    </View>
  );

  return (
    // KeyboardAvoidingView to adjust view when keyboard is active
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Different behavior for iOS and Android
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Offset for iOS keyboard
    >
      <View style={styles.innerContainer}> {/* Inner container for layout */}
        <Text style={styles.title}>Recipes</Text> {/* Title of the screen */}

        {/* FlatList to render the list of recipes */}
        <FlatList
          data={recipeList} // Data source for the list
          keyExtractor={(item) => item.id.toString()} // Unique key for each item
          renderItem={renderItem} // Function to render each item
          ListEmptyComponent={<Text style={styles.emptyText}>No recipes added yet</Text>} // Message when list is empty
        />

        {/* Input area for adding new recipes */}
        <View style={styles.addItemContainer}>
          <TextInput
            style={styles.input} // Input field styles
            placeholder="Add new recipe" // Placeholder text
            placeholderTextColor="#aaa" // Color for placeholder text
            value={newRecipe} // Bind state value to input
            onChangeText={setNewRecipe} // Update state on text change
          />
          <TouchableOpacity style={styles.addButton} onPress={addRecipe}> {/* Button to add recipe */}
            <LinearGradient
              colors={['#3094c5', '#156bba']} // Gradient colors for the button
              start={{ x: 0, y: 0 }} // Start position for gradient
              end={{ x: 1, y: 0 }} // End position for gradient
              style={styles.gradientButton} // Styles for the gradient button
            >
              <Ionicons name="add" size={28} color="white" /> {/* Add icon */}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    backgroundColor: '#000', // Black background for the container
  },
  innerContainer: {
    padding: 20, // Padding around the inner container
    flex: 1, // Fill available space
    justifyContent: 'space-between', // Space elements evenly
  },
  title: {
    fontSize: 28, // Title font size
    fontWeight: 'bold', // Bold text
    color: '#fff', // White text color
    marginBottom: 20, // Space below title
  },
  emptyText: {
    color: '#aaa', // Gray text for empty state
    fontSize: 16, // Font size for empty state message
    textAlign: 'center', // Center the text
    marginTop: 50, // Space above empty state message
  },
  itemContainer: {
    flexDirection: 'row', // Arrange children in a row
    alignItems: 'center', // Center vertically
    justifyContent: 'space-between', // Space between item text and delete button
    backgroundColor: '#1a1a1a', // Dark background for item
    padding: 15, // Padding inside item container
    marginBottom: 10, // Space below item
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow color for item
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3, // Shadow radius
    elevation: 3, // Elevation for Android shadow
  },
  itemText: {
    fontSize: 18, // Font size for item text
    flex: 1, // Allow text to take remaining space
    marginLeft: 10, // Space between icon and text
    color: '#fff', // White text color
  },
  addItemContainer: {
    flexDirection: 'row', // Arrange input and button in a row
    alignItems: 'center', // Center vertically
    marginTop: 20, // Space above the input area
  },
  input: {
    flex: 1, // Allow input field to take remaining space
    backgroundColor: '#1a1a1a', // Dark background for input
    padding: 15, // Padding inside input
    borderRadius: 10, // Rounded corners for input
    shadowColor: '#000', // Shadow color for input
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3, // Shadow radius
    elevation: 3, // Elevation for Android shadow
    fontSize: 16, // Font size for input text
    color: '#fff', // White text color for input
  },
  addButton: {
    marginLeft: 10, // Space between input and button
  },
  gradientButton: {
    padding: 15, // Padding inside the button
    borderRadius: 50, // Circular button
    justifyContent: 'center', // Center content
    alignItems: 'center', // Center content horizontally
    shadowColor: '#000', // Shadow color for button
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Elevation for Android shadow
  },
});
