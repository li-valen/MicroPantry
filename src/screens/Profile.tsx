import React, { useState } from 'react'; // Import necessary modules and hooks from React
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'; // Import React Native components
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo

// Define the ProfileScreen functional component
export default function ProfileScreen() {
  // State variables for storing name, email, and editing mode
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [editing, setEditing] = useState(false); // Editing mode is initially off

  // Function to handle saving the profile
  const handleSave = () => {
    Alert.alert('Profile Updated', 'Your profile information has been updated.'); // Alert user upon saving
    setEditing(false); // Exit editing mode
  };

  return (
    // Use KeyboardAvoidingView to adjust the view when the keyboard appears
    <KeyboardAvoidingView
      style={styles.container} // Apply styles to the container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Offset for keyboard appearance
    >
      <View style={styles.innerContainer}> {/* Inner container for layout */}
        <Text style={styles.title}>Profile</Text> {/* Profile title */}

        {/* Name input field */}
        <TextInput
          style={styles.input} // Apply input styles
          placeholder="Name" // Placeholder text for the input
          placeholderTextColor="#aaa" // Color of placeholder text
          value={name} // Bind state value to input
          onChangeText={setName} // Update state on text change
          editable={editing} // Input is editable only in editing mode
        />

        {/* Email input field */}
        <TextInput
          style={styles.input} // Apply input styles
          placeholder="Email" // Placeholder text for the input
          placeholderTextColor="#aaa" // Color of placeholder text
          value={email} // Bind state value to input
          onChangeText={setEmail} // Update state on text change
          editable={editing} // Input is editable only in editing mode
        />

        {/* Conditional button rendering based on editing state */}
        {editing ? (
          <TouchableOpacity style={styles.button} onPress={handleSave}> {/* Save button */}
            <Text style={styles.buttonText}>Save</Text> {/* Button text */}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}> {/* Edit button */}
            <Text style={styles.buttonText}>Edit</Text> {/* Button text */}
          </TouchableOpacity>
        )}

        {/* Logout button with icon */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Logged out')}>
          <Ionicons name="log-out-outline" size={24} color="#ff6b6b" /> {/* Logout icon */}
          <Text style={styles.logoutText}> Logout</Text> {/* Logout text */}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    backgroundColor: '#000', // Black background
    padding: 20, // Padding around the container
  },
  innerContainer: {
    flex: 1, // Fill the available space
    justifyContent: 'center', // Center content vertically
  },
  title: {
    fontSize: 28, // Title font size
    fontWeight: 'bold', // Bold text
    color: '#fff', // White text color
    marginBottom: 20, // Space below title
  },
  input: {
    backgroundColor: '#1a1a1a', // Dark background for input
    borderRadius: 10, // Rounded corners
    padding: 15, // Padding inside the input
    marginBottom: 15, // Space below the input
    color: '#fff', // White text color
  },
  button: {
    backgroundColor: '#3094c5', // Button background color
    borderRadius: 10, // Rounded corners
    padding: 15, // Padding inside the button
    alignItems: 'center', // Center text horizontally
    marginBottom: 10, // Space below the button
  },
  buttonText: {
    color: '#fff', // White text color for button
    fontSize: 16, // Button text size
    fontWeight: 'bold', // Bold text
  },
  logoutButton: {
    flexDirection: 'row', // Arrange icon and text in a row
    alignItems: 'center', // Center vertically
    marginTop: 20, // Space above logout button
  },
  logoutText: {
    color: '#ff6b6b', // Red text color for logout
    fontSize: 16, // Logout text size
    marginLeft: 10, // Space between icon and text
  },
});
