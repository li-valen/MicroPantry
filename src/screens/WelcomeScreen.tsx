import React, { useEffect } from "react";
import { SafeAreaView, View, Text, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
// import { useNavigation } from "@react-navigation/native";

export const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  // const navigation = useNavigation();

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;

    const springConfig = {
      stiffness: 105, // Increase stiffness for more rigid spring
      damping: 10, // Decrease damping for more bounce
      mass: 1.1,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    };

    setTimeout(
      () =>
        (ring1Padding.value = withSpring(
          ring1Padding.value + hp(5),
          springConfig
        )),
      100
    );
    setTimeout(
      () =>
        (ring2Padding.value = withSpring(
          ring2Padding.value + hp(5),
          springConfig
        )),
      300
    );

    setTimeout(() => navigation.navigate("Login"), 2500); // Signup / Login screen, OAuth, etc. (not implemented)
  }, []);

  const ring1Style = useAnimatedStyle(() => {
    return {
      padding: ring1Padding.value,
    };
  });

  const ring2Style = useAnimatedStyle(() => {
    return {
      padding: ring2Padding.value,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <Animated.View style={[styles.outerView, ring1Style]}>
          <Animated.View style={[styles.innerView, ring2Style]}>
          <Image 
          source={require('../../assets/micro-pantry-logo.png')} 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outerView: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 9999,
    // padding: hp("4%"),
  },
  innerView: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 9999,
    // padding: hp("4.5%"),
  },
  image: {
    width: hp("20%"),
    height: hp("20%"),
    borderRadius: 100,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30, // Adjust as needed to position text below the image
  },
  title: {
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2, // tracking-widest equivalent
    fontSize: 48, // text-6xl equivalent
    // set width to 80% of screen width
    width: wp("90%"),
    // center align text
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "500", // font-medium equivalent
    color: "white",
    letterSpacing: 2, // tracking-widest equivalent
    fontSize: 20, // text-lg equivalent
  },
});

export default WelcomeScreen;
