import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface RecipeItem {
  id: number;
  title: string;
}

export default function RecipesScreen() {
  const [recipeList, setRecipeList] = useState<RecipeItem[]>([]);
  const [newRecipe, setNewRecipe] = useState<string>('');

  // Function to add new recipes
  const addRecipe = () => {
    if (newRecipe.trim() === '') {
      Alert.alert('Error', 'Please enter a valid recipe name');
      return;
    }
    const newRecipeObject: RecipeItem = {
      id: Date.now(),
      title: newRecipe,
    };
    setRecipeList([...recipeList, newRecipeObject]);
    setNewRecipe(''); 
    Keyboard.dismiss(); 
  };

  const deleteRecipe = (id: number) => {
    const updatedList = recipeList.filter((item) => item.id !== id);
    setRecipeList(updatedList);
  };

  const renderItem = ({ item }: { item: RecipeItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
      <TouchableOpacity onPress={() => deleteRecipe(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Recipes</Text>

        <FlatList
          data={recipeList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No recipes added yet</Text>}
        />

        <View style={styles.addItemContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new recipe"
            placeholderTextColor="#aaa"
            value={newRecipe}
            onChangeText={setNewRecipe}
          />
          <TouchableOpacity style={styles.addButton} onPress={addRecipe}>
            <LinearGradient
              colors={['#3094c5', '#156bba']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
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
