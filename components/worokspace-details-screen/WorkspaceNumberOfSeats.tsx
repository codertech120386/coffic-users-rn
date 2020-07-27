import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { IWorkspaceNumberOfSeatsProps } from "../../ts-types";
import { CustomText } from "../ui/CustomText";
import defaultStyles from "../../AppCss";
import { Ionicons } from "@expo/vector-icons";
import { FONTSTYLES } from "../../constants";

const WorkspaceNumberOfSeats = ({
  removeSeat,
  addSeat,
  numberOfSeats,
}: IWorkspaceNumberOfSeatsProps) => {
  const removeSeatClickListener = () => {
    // TODO ensure number of seats does not go below 1
    removeSeat();
  };

  const addSeatClickListener = () => {
    addSeat();
  };

  return (
    <View style={styles.container}>
      <CustomText
        style={{
          ...defaultStyles.h6Text,
          fontFamily: FONTSTYLES.normal,
          marginLeft: 10,
        }}
      >
        No. of seats
      </CustomText>
      <View
        style={{
          flexDirection: "row",
          width: 100,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="ios-remove-circle-outline"
          size={24}
          color="#3f3f3f"
          onPress={removeSeatClickListener}
        />
        <CustomText
          style={{ ...defaultStyles.h6Text, fontFamily: FONTSTYLES.normal }}
        >
          {numberOfSeats}
        </CustomText>
        <Ionicons
          name="ios-add-circle-outline"
          size={24}
          color="#3f3f3f"
          onPress={addSeatClickListener}
        />
      </View>
    </View>
  );
};
export default WorkspaceNumberOfSeats;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginLeft: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
});
