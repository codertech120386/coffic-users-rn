import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PurchaseHistoryScreen = (props: any) => (
  <View style={styles.container}>
    <Text>PurchaseHistoryScreen</Text>
  </View>
);
export default PurchaseHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
