import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CustomText } from "../ui/CustomText";
import defaultStyles from "../../AppCss";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface IAccountPageCardProps {
  icon: any;
  title: string;
  subTitle: string;
  redirectPath: string;
  onRedirectToIconClicked: any;
}

export const AccountPageCard = (props: IAccountPageCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{props.icon}</View>
      <View style={styles.cardTextContainer}>
        <CustomText style={{ ...defaultStyles.h4Text, ...styles.text }}>
          {props.title}
        </CustomText>
        <CustomText style={{ ...defaultStyles.extraSmall, ...styles.text }}>
          {props.subTitle}
        </CustomText>
      </View>
      <TouchableOpacity
        style={styles.forwardIconContainer}
        onPress={() => {
          props.onRedirectToIconClicked(props.redirectPath);
        }}
      >
        <Ionicons name="ios-arrow-forward" size={23} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    height: 45,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
  },
  iconContainer: {
    width: 35,
    justifyContent: "center",
  },
  text: {
    fontFamily: "montserrat-bold",
    color: "white",
  },
  forwardIconContainer: {
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    width: 15,
  },
});
