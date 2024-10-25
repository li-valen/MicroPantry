import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for button styling
import { useShoppingList } from './ShoppingListContent'; // Import shopping list context
import { useRoute } from '@react-navigation/native'; // Import useRoute for navigation

// Main functional component for the shopping list
export default function ShoppingList() {
  // Destructure shopping list functions from context
  const { shoppingList, addItem, toggleComplete, deleteItem } = useShoppingList();
  const [newItem, setNewItem] = useState<string>(''); // State for the new item input
  
  const route = useRoute(); // Get the current route
  const scannedItem = route.params?.scannedItem; // Retrieve scanned item from route parameters

  // Effect to add the scanned item to the shopping list when available
  useEffect(() => {
    if (scannedItem) {
      addItem(scannedItem); // Automatically add scanned item to the list
    }
  }, [scannedItem]);

  // Function to handle adding a new item
  const handleAddItem = () => {
    if (newItem.trim() === '') {
      Alert.alert('Error', 'Please enter a valid item'); // Alert if input is empty
      return;
    }
    addItem(newItem); // Add the new item to the shopping list
    setNewItem(''); // Clear the input field after adding
  };

  // Render each item in the shopping list
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Checkbox for marking item as completed */}
      <TouchableOpacity onPress={() => toggleComplete(item.id)}>
        <Ionicons name={item.completed ? 'checkbox-outline' : 'square-outline'} size={24} color={item.completed ? '#fff' : '#ccc'} />
      </TouchableOpacity>
      {/* Item title */}
      <Text style={[styles.itemText, item.completed && styles.itemTextCompleted]}>{item.title}</Text>
      {/* Delete button */}
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0} // Adjusts for keyboard on iOS
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Shopping List</Text>
        <FlatList
          data={shoppingList} // Data for the FlatList
          keyExtractor={(item) => item.id.toString()} // Unique key for each item
          renderItem={renderItem} // Render each item using renderItem function
          ListEmptyComponent={<Text style={styles.emptyText}>No items in your list</Text>} // Message when list is empty
        />
        <View style={styles.addItemContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new item" // Placeholder text
            placeholderTextColor="#aaa" // Placeholder text color
            value={newItem} // Bind input value to state
            onChangeText={setNewItem} // Update state on input change
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            {/* Gradient button for adding new items */}
            <LinearGradient colors={['#3094c5', '#156bba']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientButton}>
              <Ionicons name="add" size={28} color="white" /> {/* Add icon */}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// Styles for the ShoppingList component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Set background color to black
  },
  innerContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between', // Space items evenly
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // Title color
    marginBottom: 20,
  },
  emptyText: {
    color: '#aaa', // Color for empty list message
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row', // Horizontal layout for items
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Space items evenly
    backgroundColor: '#1a1a1a', // Dark background for items
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
    flex: 1, // Allow text to grow and fill space
    marginLeft: 10,
    color: '#fff', // Item text color
  },
  itemTextCompleted: {
    textDecorationLine: 'line-through', // Style for completed items
    color: '#aaa', // Color for completed item text
  },
  addItemContainer: {
    flexDirection: 'row', // Horizontal layout for input and button
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1, // Allow input to grow and fill space
    backgroundColor: '#1a1a1a', // Dark background for input
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    fontSize: 16,
    color: '#fff', // Input text color
  },
  addButton: {
    marginLeft: 10,
  },
  gradientButton: {
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
