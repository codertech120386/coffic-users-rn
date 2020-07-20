import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CheckinHistoryScreen = (props: any) => (
  <View style={styles.container}>
    <Text>CheckinHistory</Text>
  </View>
);
export default CheckinHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
