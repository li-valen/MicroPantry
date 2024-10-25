import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the structure of a shopping item
interface ShoppingItem {
  id: number; // Unique identifier for the item
  title: string; // Title or name of the item
  completed: boolean; // Indicates if the item is completed
}

// Define the structure of the shopping list context
interface ShoppingListContextType {
  shoppingList: ShoppingItem[]; // Array of shopping items
  addItem: (item: string) => void; // Function to add a new item
  toggleComplete: (id: number) => void; // Function to toggle completion status of an item
  deleteItem: (id: number) => void; // Function to delete an item from the list
}

// Create a context for the shopping list with an undefined initial value
const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

// Provider component that holds the shopping list state and functions
export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  // State to manage the list of shopping items
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  // Function to add a new item to the shopping list
  const addItem = (title: string) => {
    const newItem: ShoppingItem = { id: Date.now(), title, completed: false }; // Create a new item
    setShoppingList((prevList) => [...prevList, newItem]); // Update state with the new item
  };

  // Function to toggle the completion status of an item
  const toggleComplete = (id: number) => {
    setShoppingList((prevList) =>
      prevList.map((item) => 
        (item.id === id ? { ...item, completed: !item.completed } : item) // Toggle completed status
      )
    );
  };

  // Function to delete an item from the shopping list
  const deleteItem = (id: number) => {
    setShoppingList((prevList) => prevList.filter((item) => item.id !== id)); // Remove item by filtering out the deleted one
  };

  // Provide the shopping list state and functions to the context
  return (
    <ShoppingListContext.Provider value={{ shoppingList, addItem, toggleComplete, deleteItem }}>
      {children} 
    </ShoppingListContext.Provider>
  );
};

// Custom hook to use the shopping list context
export const useShoppingList = () => {
  const context = useContext(ShoppingListContext); // Get the context value
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider'); // Error if used outside the provider
  }
  return context; // Return the context value
};
