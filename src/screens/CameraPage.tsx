import React from 'react';
import { StyleSheet, View } from 'react-native';
import CameraScreen from '../../components/CameraScreen';

export default function CameraPage() {
  return (
    <View style={styles.container}>
      <CameraScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
