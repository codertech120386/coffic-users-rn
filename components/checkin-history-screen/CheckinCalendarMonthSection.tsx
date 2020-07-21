import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CustomText } from "../ui/CustomText";

import { ICheckinCalendarMonthSectionProps } from "../../ts-types";
import { Colors } from "../../AppCss";

const CheckinCalendarMonthSection = (
  props: ICheckinCalendarMonthSectionProps
) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="ios-arrow-back"
          size={30}
          color={Colors.primary}
          onPress={props.goToPrevMonth}
        />
      </View>
      <View style={styles.mth}>
        <CustomText style={styles.monthNameText}>
          {props.monthName} {props.year}
        </CustomText>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons
          name="ios-arrow-forward"
          size={30}
          color={Colors.primary}
          onPress={props.goToNextMonth}
        />
      </View>
    </View>
  );
};
export default CheckinCalendarMonthSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  mth: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: { justifyContent: "center" },
  monthNameText: {
    fontFamily: "montserrat-italic",
  },
});
