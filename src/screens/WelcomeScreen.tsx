import React, { useEffect } from "react";
import { SafeAreaView, View, Text, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"; // Import responsive dimensions
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated"; // Import animated features from Reanimated
// import { useNavigation } from "@react-navigation/native"; // Uncomment to use navigation

// WelcomeScreen component definition
export const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  // Shared values for animated padding of rings
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  // Uncomment to use navigation hook
  // const navigation = useNavigation();

  useEffect(() => {
    // Reset initial padding values for both rings
    ring1Padding.value = 0;
    ring2Padding.value = 0;

    // Configuration for spring animation
    const springConfig = {
      stiffness: 105, // Stiffness of the spring for more rigidity
      damping: 10, // Damping factor for bounce effect
      mass: 1.1, // Mass of the spring
      overshootClamping: false, // Allow overshooting
      restDisplacementThreshold: 0.01, // Threshold for rest state
      restSpeedThreshold: 0.01, // Threshold for speed in rest state
    };

    // Animate the first ring's padding after 100ms
    setTimeout(
      () =>
        (ring1Padding.value = withSpring(
          ring1Padding.value + hp(5), // Increase padding by 5% of height
          springConfig
        )),
      100 // Delay for animation start
    );

    // Animate the second ring's padding after 300ms
    setTimeout(
      () =>
        (ring2Padding.value = withSpring(
          ring2Padding.value + hp(5), // Increase padding by 5% of height
          springConfig
        )),
      300 // Delay for animation start
    );

    // Navigate to Login screen after 2500ms
    setTimeout(() => navigation.navigate("Login"), 2500); // Adjust this to your desired navigation target
  }, []); // Empty dependency array means this runs once after the first render

  // Animated styles for the first ring
  const ring1Style = useAnimatedStyle(() => {
    return {
      padding: ring1Padding.value, // Use shared value for animated padding
    };
  });

  // Animated styles for the second ring
  const ring2Style = useAnimatedStyle(() => {
    return {
      padding: ring2Padding.value, // Use shared value for animated padding
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <Animated.View style={[styles.outerView, ring1Style]}>
          <Animated.View style={[styles.innerView, ring2Style]}>
            <Image 
              source={require('../../assets/micro-pantry-logo.png')} // Import logo image
              style={styles.image} 
            />
          </Animated.View>
        </Animated.View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Micro Pantry</Text>
          <Text style={styles.subtitle}></Text> 
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: "#000", // Black background
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  outerView: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background for outer ring
    borderRadius: 9999, // Fully rounded corners
    // padding: hp("4%"), // Uncomment for padding
  },
  innerView: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background for inner ring
    borderRadius: 9999, // Fully rounded corners
    // padding: hp("4.5%"), // Uncomment for padding
  },
  image: {
    width: hp("20%"), // Set image width to 20% of height
    height: hp("20%"), // Set image height to 20% of height
    borderRadius: 100, // Fully rounded image
  },
  textContainer: {
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    marginTop: 30, // Margin above text
  },
  title: {
    fontWeight: "bold", // Bold text
    color: "white", // White text color
    letterSpacing: 2, // Space between letters
    fontSize: 48, // Large font size for title
    width: wp("90%"), // Set width to 90% of screen width
    textAlign: "center", // Center align text
  },
  subtitle: {
    fontWeight: "500", // Medium font weight
    color: "white", // White text color
    letterSpacing: 2, // Space between letters
    fontSize: 20, // Smaller font size for subtitle
  },
});

// Export the WelcomeScreen component as default
export default WelcomeScreen;
