import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PurchaseDetailsScreen = (props: any) => (
  <View style={styles.container}>
    <Text>PurchaseDetailsScreen</Text>
  </View>
);
export default PurchaseDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
