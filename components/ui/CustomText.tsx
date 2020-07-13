import React from "react";
import { StyleSheet, Text } from "react-native";

export const CustomText = (props: any) => {
  return (
    <Text style={{ ...styles.textStyle, ...props.style }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "montserrat",
    fontSize: 18,
  },
});
