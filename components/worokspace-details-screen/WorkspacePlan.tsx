import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { IWorkspacePlanProps, IWorkspacePlan } from "../../ts-types";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import { Ionicons } from "@expo/vector-icons";

const WorkspacePlan = (props: IWorkspacePlanProps) => {
  const plan = props.plan;
  const plans = props.plans;

  const durationMapping: any = {
    "1": "per day",
    "30": "per month",
    "90": "per 3 months",
    "180": "per 6 months",
    "365": "per year",
  };

  const onSpaceTypeClickListener = (spaceType: string) => {
    const newSpaceTypePlans =
      plans &&
      plans.filter((plan: IWorkspacePlan) => plan.space_type === spaceType);
    props.onSpaceTypeSelected(spaceType, newSpaceTypePlans);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSpaceTypeClickListener(plan.space_type)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          marginLeft: 15,
        }}
      >
        <CustomText
          style={{
            ...defaultStyles.small,
            marginBottom: 5,
            fontFamily: "montserrat-semi-bold",
          }}
        >
          {plan.space_type}
        </CustomText>
        <CustomText style={{ ...defaultStyles.small, color: Colors.primary }}>
          {plan.location_type}
        </CustomText>
      </View>
      <View style={{ paddingHorizontal: 5 }}>
        <CustomText
          style={{
            ...defaultStyles.extraSmall,
            color: Colors.primary,
            marginBottom: 3,
          }}
        >
          Starts from
        </CustomText>
        <CustomText
          style={{
            ...defaultStyles.h6Text,
            color: Colors.primary,
            fontFamily: "montserrat-bold",
          }}
        >
          &#8377; {plan.cost / 100}
        </CustomText>
        <CustomText
          style={{ ...defaultStyles.extraSmall, color: Colors.primary }}
        >
          {durationMapping[plan.duration.toString()]}
        </CustomText>
      </View>
      <View style={{ paddingLeft: 5 }}>
        <Ionicons name="ios-arrow-forward" size={23} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );
};
export default WorkspacePlan;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
    paddingLeft: 5,
    paddingRight: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
});
