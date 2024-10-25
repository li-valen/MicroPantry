import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'; // Import barcode scanner from Expo
import { useShoppingList } from './ShoppingListContent'; // Import shopping list context

// Get the width of the device window to calculate square size for the scanner overlay
const { width } = Dimensions.get('window');
const squareSize = width * 0.7; // Set the size of the scanning area

// Main functional component for barcode scanning
export default function Scanner() {
  // State to manage camera permission and scanned state
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { addItem } = useShoppingList(); // Get the addItem function from shopping list context

  // Request camera permissions when the component mounts
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync(); // Request camera permission
      setHasPermission(status === 'granted'); // Set permission state
    })();
  }, []);

  // Handle barcode scan event
  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true); // Set scanned to true to prevent multiple scans
    addItem(data); // Add the scanned item directly to the shopping list
  };

  // Render different content based on permission status
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>; // Inform user that permission is being requested
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>; // Inform user that camera access is denied
  }

  return (
    <View style={styles.container}>
      {/* BarCodeScanner component to scan barcodes */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Disable scanning if already scanned
        style={StyleSheet.absoluteFillObject} // Fill the entire view with the scanner
      />
      <View style={styles.overlay}>
        <Text style={styles.instructionText}>Align the barcode within the square</Text> {/* Instruction text */}
        <View style={styles.scanArea}></View> {/* Scanning area overlay */}
      </View>
      {/* Button to scan again after a successful scan */}
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

// Styles for the Scanner component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Full height and width of the container
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: 'black', // Background color of the container
  },
  overlay: {
    flex: 1, // Full height and width for overlay
    justifyContent: 'center', // Center overlay content
    alignItems: 'center', // Center overlay content
  },
  instructionText: {
    color: 'white', // Instruction text color
    fontSize: 16, // Instruction text size
    marginBottom: 20, // Space below the instruction text
    textAlign: 'center', // Center the instruction text
  },
  scanArea: {
    width: squareSize, // Width of the scanning area
    height: squareSize, // Height of the scanning area
    borderWidth: 2, // Border width of the scanning area
    borderColor: 'white', // Border color of the scanning area
    borderRadius: 10, // Rounded corners for the scanning area
    backgroundColor: 'transparent', // Transparent background for the scanning area
  },
});
