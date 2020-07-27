import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { IWorkspaceDetailsAddress } from "../../ts-types";
import { CustomText } from "../ui/CustomText";
import defaultStyles from "../../AppCss";

const WorkspaceDetailsAddress = ({ address }: IWorkspaceDetailsAddress) => (
  <View style={styles.container}>
    <CustomText style={defaultStyles.littleSmall}>{address}</CustomText>
  </View>
);
export default WorkspaceDetailsAddress;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
});
