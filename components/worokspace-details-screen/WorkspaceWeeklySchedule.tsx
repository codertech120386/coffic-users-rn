import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { GET_WORKSPACE_WEEKLY_SCHEDULE } from "../../queries";
import { convertTimeTo12HourFormat } from "../../helper_functions";
import { IWorkspaceWeeklyScheduleProps } from "../../ts-types";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";

const WorkspaceWeeklySchedule = (props: IWorkspaceWeeklyScheduleProps) => {
  const { loading, error, data: weeklySchedule } = useQuery(
    GET_WORKSPACE_WEEKLY_SCHEDULE,
    {
      variables: {
        id: +props.workspaceId,
      },
    }
  );

  if (loading)
    return (
      <CustomText style={defaultStyles.h2Text}>
        Loading Weekly Schedules
      </CustomText>
    );
  if (error) return <CustomText style={defaultStyles.h2Text}>Error</CustomText>;

  return (
    <View style={styles.container}>
      {weeklySchedule &&
        weeklySchedule.workspace &&
        weeklySchedule.workspace.weekly_schedules.map((schedule: any) => {
          return (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                marginVertical: 5,
              }}
            >
              <CustomText
                style={{
                  ...defaultStyles.small,
                  width: 100,
                  textTransform: "capitalize",
                }}
              >
                {schedule.day}
              </CustomText>
              {schedule.opens_at && schedule.closes_at ? (
                <CustomText
                  style={{
                    ...defaultStyles.small,
                    flex: 1,
                    textTransform: "lowercase",
                    marginLeft: 10,
                    color: Colors.primary,
                  }}
                >
                  {convertTimeTo12HourFormat(schedule.opens_at)} -{" "}
                  {convertTimeTo12HourFormat(schedule.closes_at)}
                </CustomText>
              ) : (
                <CustomText
                  style={{
                    ...defaultStyles.small,
                    marginLeft: 10,
                    color: "red",
                  }}
                >
                  {" "}
                  Closed{" "}
                </CustomText>
              )}
            </View>
          );
        })}
    </View>
  );
};
export default WorkspaceWeeklySchedule;

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    marginLeft: "10%",
    width: "80%",
    backgroundColor: "white",
    paddingVertical: 10,
  },
});
