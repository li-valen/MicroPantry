import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ShoppingItem {
  id: number;
  title: string;
  completed: boolean;
}

interface ShoppingListContextType {
  shoppingList: ShoppingItem[];
  addItem: (item: string) => void;
  toggleComplete: (id: number) => void;
  deleteItem: (id: number) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  const addItem = (title: string) => {
    const newItem: ShoppingItem = { id: Date.now(), title, completed: false };
    setShoppingList((prevList) => [...prevList, newItem]);
  };

  const toggleComplete = (id: number) => {
    setShoppingList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const deleteItem = (id: number) => {
    setShoppingList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <ShoppingListContext.Provider value={{ shoppingList, addItem, toggleComplete, deleteItem }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};
