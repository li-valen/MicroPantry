import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  Text,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig"; // Firebase imports
import { doc, getDoc } from "firebase/firestore"; // Import only the necessary Firebase functions
import { LinearGradient } from "expo-linear-gradient";

interface Item {
  image: any; // Consider changing to a more specific type if possible
  title: string;
  id: number;
}

interface RenderItemProps {
  item: Item;
  index: number;
}

const Onboarding = ({ navigation }: { navigation: any }) => {
  // Items array for the retailers
  const [items, setItems] = useState<Item[]>([
    // Define the list of retailers here
    {
      image: require("../../assets/images/providers/walmart.png"),
      title: "Walmart",
      id: 1,
    },
    {
      image: require("../../assets/images/providers/target.png"),
      title: "Target",
      id: 2,
    },
    // Additional items...
  ]);

  const user = FIREBASE_AUTH.currentUser; // Get current user

  // User onboarding check
  useEffect(() => {
    const checkUserOnboarding = async () => {
      if (!user) {
        navigation.navigate("Login"); // Redirect to login if not logged in
      } else {
        if (user.uid) {
          const userRef = doc(FIRESTORE_DB, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData && userData.onboarded) {
              navigation.navigate("Home"); // Redirect to home if onboarded
            }
          }
        }
      }
    };
    checkUserOnboarding(); // Ensure the check is called
  }, [user, navigation]); // Include dependencies for useEffect

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [numColumns, setNumColumns] = useState<number>(1);

  const handleCardPress = (index: number) => {
    // Handle card selection logic
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index)); // Deselect
    } else if (selectedItems.length < 3) {
      setSelectedItems([...selectedItems, index]); // Select if less than 3
    }
  };

  const handleContinuePress = async () => {
    // Continue button handler
    navigation.navigate("Home");
  };

  const _renderItem = ({ item, index }: RenderItemProps) => {
    const isSelected = selectedItems.includes(index); // Check if selected
    const isDisabled = selectedItems.length >= 3 && !isSelected; // Check if disabled

    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard,
          isDisabled && styles.disabledCard,
        ]}
        onPress={() => handleCardPress(index)} // Handle card press
        disabled={isDisabled}
        activeOpacity={0.75}
      >
        <Image
          style={styles.cardImage}
          source={item.image} // Display image
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const updateNumColumns = () => {
      const screenWidth = Dimensions.get("window").width; // Get screen width
      const cardWidth = 120; // Card width
      const calculatedColumns = Math.floor(screenWidth / cardWidth); // Calculate number of columns
      setNumColumns(calculatedColumns);
    };

    updateNumColumns(); // Initial calculation
    const subscription = Dimensions.addEventListener(
      "change",
      updateNumColumns // Update on screen dimension change
    );

    return () => {
      subscription?.remove(); // Cleanup subscription
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.title}>
        Select <Text style={styles.bold}>up to three</Text> retailers where you
        <Text style={styles.bold}> shop</Text> for food
      </Text>
      <FlatList
        style={styles.container}
        data={items}
        keyExtractor={(item, index) => index.toString()} // Use unique keys
        renderItem={_renderItem}
        numColumns={numColumns} // Dynamic column count
        contentContainerStyle={styles.contentContainer}
      />
      <LinearGradient
        colors={["#3094c5", "#156bba"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.continueButton,
          selectedItems.length === 0 && styles.disabledButton,
        ]}
      >
        <TouchableOpacity
          disabled={selectedItems.length === 0} // Disable button if no selection
          onPress={handleContinuePress}
          style={styles.continueButtonContent}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

// Define styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    marginTop: 50,
    backgroundColor: "#000",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    paddingBottom: 0,
  },
  title: {
    fontSize: 24,
    color: "#8fd3f1",
    textAlign: "center",
    marginVertical: 20,
    width: "80%",
    marginLeft: "10%",
  },
  bold: {
    fontWeight: "bold",
    color: "#70c7ee",
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    marginHorizontal: "2%",
    width: 120,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectedCard: {
    borderColor: "#7bcbef",
    borderWidth: 2,
  },
  disabledCard: {
    opacity: 0.5,
  },
  cardImage: {
    width: "80%",
    height: 80,
  },
  continueButton: {
    backgroundColor: "#70c7ee",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "75%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf: "center",
  },
  disabledButton: {
    backgroundColor: "#b0c4de",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Onboarding;
