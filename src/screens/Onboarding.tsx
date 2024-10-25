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
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";

interface Item {
  image: any;
  title: string;
  id: number;
}

interface RenderItemProps {
  item: Item;
  index: number;
}

const Onboarding = ({ navigation }: { navigation: any }) => {
  const [items, setItems] = useState<Item[]>([
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
    {
      image: require("../../assets/images/providers/costco.png"),
      title: "Costco",
      id: 3,
    },
    {
      image: require("../../assets/images/providers/albertson.png"),
      title: "Albertsons",
      id: 4,
    },
    {
      image: require("../../assets/images/providers/whole_foods.png"),
      title: "Whole Foods Market",
      id: 5,
    },
    {
      image: require("../../assets/images/providers/trader_joes.png"),
      title: "Trader Joe's",
      id: 6,
    },
    {
      image: require("../../assets/images/providers/sams_club.png"),
      title: "Sam's Club",
      id: 7,
    },
    {
      image: require("../../assets/images/providers/shoprite.png"),
      title: "ShopRite",
      id: 8,
    },
    {
      image: require("../../assets/images/providers/kroger.png"),
      title: "Kroger",
      id: 9,
    },
    {
      image: require("../../assets/images/providers/bjs.png"),
      title: "Bj's",
      id: 10,
    },
    {
      image: require("../../assets/images/providers/safeway.png"),
      title: "SafeWay",
      id: 11,
    },
    {
      image: require("../../assets/images/providers/wegmans.png"),
      title: "Wegmans",
      id: 12,
    },
    {
      image: require("../../assets/images/providers/publix.png"),
      title: "Publix",
      id: 13,
    },
    {
      image: require("../../assets/images/providers/aldi.png"),
      title: "Aldi",
      id: 14,
    },
  ]);

  // Get user data
  const user = FIREBASE_AUTH.currentUser;

  // If user is not logged in, redirect to login screen
  useEffect(() => {
    const checkUserOnboarding = async () => {
      if (!user) {
        // Redirect to login screen
        navigation.navigate("Login");
      } else {
        // Check if user is onboarded
        if (user.uid) {
          const userRef = doc(FIRESTORE_DB, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData && userData.onboarded) {
              // Redirect to home screen
              navigation.navigate("Home");
            }
          }
        }
      }
    };
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [numColumns, setNumColumns] = useState<number>(1);

  const handleCardPress = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else if (selectedItems.length < 3) {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleContinuePress = async () => {
   
    navigation.navigate("Home");
  };

  const _renderItem = ({ item, index }: RenderItemProps) => {
    const isSelected = selectedItems.includes(index);
    const isDisabled = selectedItems.length >= 3 && !isSelected;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard,
          isDisabled && styles.disabledCard,
        ]}
        onPress={() => handleCardPress(index)}
        disabled={isDisabled}
        activeOpacity={0.75}
      >
        <Image
          style={styles.cardImage}
          source={item.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const updateNumColumns = () => {
      const screenWidth = Dimensions.get("window").width;
      const cardWidth = 120; 
      const calculatedColumns = Math.floor(screenWidth / cardWidth);
      setNumColumns(calculatedColumns);
    };

    updateNumColumns();
    const subscription = Dimensions.addEventListener(
      "change",
      updateNumColumns
    );

    return () => {
      subscription?.remove();
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderItem}
        numColumns={numColumns}
        key={numColumns}
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
          disabled={selectedItems.length === 0}
          onPress={handleContinuePress}
          style={styles.continueButtonContent} 
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

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
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333", 
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    paddingVertical: 20,
    alignItems: "center",
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
