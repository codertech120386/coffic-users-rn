import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FaqScreen = (props: any) => (
  <View style={styles.container}>
    <Text>FaqScreen</Text>
  </View>
);
export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
