import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { ICouponCodesListProps } from "../../ts-types";
import CouponCodeCard from "./CouponCodeCard";

const CouponCodesList = (props: ICouponCodesListProps) => (
  <View style={styles.container}>
    {props &&
      props.couponCodes &&
      props.couponCodes.map((couponCode: any) => (
        <CouponCodeCard key={couponCode.id} couponCode={couponCode} />
      ))}
  </View>
);
export default CouponCodesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
