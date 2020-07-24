import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { ALL_COUPON_CODES } from "../../queries";
import CouponCodesList from "../../components/coupon-codes-screen/CouponCodesList";
import { NoCouponCodesImage } from "../../icons/NoCouponCodesImage";
import { CustomText } from "../../components/ui/CustomText";
import defaultStyles from "../../AppCss";

const CouponCodesScreen = (props: any) => {
  const { loading, error, data } = useQuery(ALL_COUPON_CODES);

  return (
    <View style={styles.container}>
      {data && data.couponCodes && data.couponCodes.length ? (
        <CouponCodesList couponCodes={data && data.couponCodes} />
      ) : (
        <View style={{ ...defaultStyles.container, ...styles.container }}>
          <NoCouponCodesImage />
          <CustomText
            style={{ ...defaultStyles.h2Text, ...styles.noSearchesText }}
          >
            Coupon Codes Bank
          </CustomText>
          <CustomText
            style={{ ...defaultStyles.h5Text, ...styles.getStartedText }}
          >
            No coupons yet, please come back later
          </CustomText>
        </View>
      )}
    </View>
  );
};
export default CouponCodesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noSearchesText: {
    marginTop: 40,
    fontFamily: "montserrat-semi-bold",
  },
  getStartedText: {
    marginTop: 20,
    lineHeight: 20,
    fontFamily: "montserrat",
  },
});
