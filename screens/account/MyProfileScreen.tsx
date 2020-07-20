import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyProfileScreen = (props: any) => (
  <View style={styles.container}>
    <Text>MyProfileScreen</Text>
  </View>
);
export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
