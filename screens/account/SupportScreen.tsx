import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SupportScreen = (props: any) => (
  <View style={styles.container}>
    <Text>SupportScreen</Text>
  </View>
);
export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
