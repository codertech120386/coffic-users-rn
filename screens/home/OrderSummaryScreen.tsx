import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderSummaryScreen = (props: any) => {
  console.log("props", props);
  return (
    <View style={styles.container}>
      <Text>OrderSummaryScreen</Text>
    </View>
  );
};
export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
