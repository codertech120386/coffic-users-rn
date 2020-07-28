import React from "react";
import { View, StyleSheet } from "react-native";
import Image from "react-native-remote-svg";

import { IWorkspaceAmenityProps } from "../../ts-types";
import { CustomText } from "../ui/CustomText";
import defaultStyles from "../../AppCss";

const WorkspaceAmenity = (props: IWorkspaceAmenityProps) => {
  const amenity = props.amenity;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: amenity.icon_url }}
        style={{
          width: 30,
          height: 30,
          backgroundColor: "red",
          color: "black",
        }}
      />
      <CustomText style={defaultStyles.extraSmall}>{amenity.name}</CustomText>
    </View>
  );
};
export default WorkspaceAmenity;

const styles = StyleSheet.create({
  container: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
});
