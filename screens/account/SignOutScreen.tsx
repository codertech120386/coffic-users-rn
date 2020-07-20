import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SignoutScreen = (props: any) => (
  <View style={styles.container}>
    <Text>SignoutScreen</Text>
  </View>
);
export default SignoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
