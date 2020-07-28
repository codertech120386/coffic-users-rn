import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { ICouponCodeProps } from "../../ts-types";

const CouponCode = (props: ICouponCodeProps) => {
  return (
    <View style={styles.container}>
      <Text>CouponCode</Text>
    </View>
  );
};
export default CouponCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
