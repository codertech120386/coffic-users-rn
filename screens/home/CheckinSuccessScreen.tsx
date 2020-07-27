import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CheckinSuccessScreen = (props: any) => (
  <View style={styles.container}>
    <Text>CheckinSuccessScreen</Text>
  </View>
);
export default CheckinSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
