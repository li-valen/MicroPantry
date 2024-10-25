import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useShoppingList } from './ShoppingListContent'; // Make sure this import is correct
import { useRoute } from '@react-navigation/native';

export default function ShoppingList() {
  const { shoppingList, addItem, toggleComplete, deleteItem } = useShoppingList(); // Use the context
  const [newItem, setNewItem] = useState<string>('');
  
  const route = useRoute();
  const scannedItem = route.params?.scannedItem;

  useEffect(() => {
    if (scannedItem) {
      addItem(scannedItem); // Automatically add scanned item to the list
    }
  }, [scannedItem]);

  const handleAddItem = () => {
    if (newItem.trim() === '') {
      Alert.alert('Error', 'Please enter a valid item');
      return;
    }
    addItem(newItem);
    setNewItem('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)}>
        <Ionicons name={item.completed ? 'checkbox-outline' : 'square-outline'} size={24} color={item.completed ? '#fff' : '#ccc'} />
      </TouchableOpacity>
      <Text style={[styles.itemText, item.completed && styles.itemTextCompleted]}>{item.title}</Text>
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Shopping List</Text>
        <FlatList
          data={shoppingList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No items in your list</Text>}
        />
        <View style={styles.addItemContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new item"
            placeholderTextColor="#aaa"
            value={newItem}
            onChangeText={setNewItem}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <LinearGradient colors={['#3094c5', '#156bba']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientButton}>
              <Ionicons name="add" size={28} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },
  innerContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 20,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a', 
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
    flex: 1,
    marginLeft: 10,
    color: '#fff', 
  },
  itemTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  addItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a1a', 
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    fontSize: 16,
    color: '#fff', 
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
