import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useQuery } from "@apollo/react-hooks";
import { Ionicons } from "@expo/vector-icons";

import { GET_WORKSPACE_TODAYS_SCHEDULE } from "../../queries";

import WorkspaceWeeklySchedule from "./WorkspaceWeeklySchedule";
import { CustomText } from "../ui/CustomText";

import { convertTimeTo12HourFormat } from "../../helper_functions";
import { IWorkspaceScheduleProps } from "../../ts-types";
import defaultStyles, { Colors } from "../../AppCss";

const WorkspaceSchedule = (props: IWorkspaceScheduleProps) => {
  const [showWeeklySchedulePopup, setShowWeeklySchedulePopup] = useState(false);

  var today = new Date();
  var todaysDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const { loading, error, data: todaysSchedule } = useQuery(
    GET_WORKSPACE_TODAYS_SCHEDULE,
    {
      variables: {
        workspace_id: props.workspaceId,
        date: todaysDate,
      },
    }
  );
  if (loading)
    return (
      <CustomText style={defaultStyles.h2Text}>Loading Schedule</CustomText>
    );
  if (error) return <CustomText style={defaultStyles.h2Text}>Error</CustomText>;

  let isOpen = "CLOSED";
  let openingTime, closingTime;

  if (
    todaysSchedule &&
    todaysSchedule.getSchedule &&
    todaysSchedule.getSchedule.opens_at
  ) {
    isOpen = "OPEN";
    openingTime = convertTimeTo12HourFormat(
      todaysSchedule.getSchedule.opens_at
    );
    closingTime = convertTimeTo12HourFormat(
      todaysSchedule.getSchedule.closes_at
    );
  }

  const onShowWeeklySchedulePopupListener = () => {
    setShowWeeklySchedulePopup(true);
  };

  return (
    <View style={styles.container}>
      <CustomText style={{ ...defaultStyles.small, marginRight: 10 }}>
        {isOpen}
      </CustomText>
      {isOpen == "OPEN" && (
        <CustomText style={{ ...defaultStyles.littleSmall, marginRight: 10 }}>
          {openingTime} - {closingTime}
        </CustomText>
      )}
      <Ionicons
        name="ios-arrow-down"
        size={23}
        color={Colors.primary}
        onPress={onShowWeeklySchedulePopupListener}
      />

      {/* Show Weekly Schedule Modal   */}
      <Modal
        isVisible={showWeeklySchedulePopup}
        onBackButtonPress={() => setShowWeeklySchedulePopup(false)}
        onBackdropPress={() => setShowWeeklySchedulePopup(false)}
        style={styles.modal}
      >
        <WorkspaceWeeklySchedule workspaceId={props.workspaceId} />
      </Modal>
    </View>
  );
};
export default WorkspaceSchedule;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  modal: {
    marginBottom: "50%",
  },
});
