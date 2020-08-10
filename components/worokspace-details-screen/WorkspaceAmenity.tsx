import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "native-base";
import Image from "react-native-remote-svg";

import { IWorkspaceAmenityProps } from "../../ts-types";
import { CustomText } from "../ui/CustomText";
import defaultStyles from "../../AppCss";

const WorkspaceAmenity = (props: IWorkspaceAmenityProps) => {
  const amenity = props.amenity;
  return (
    <View style={styles.container}>
      <View
        style={{
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Icon
          type={amenity.icon_provider}
          name={amenity.icon_name}
          style={{ fontSize: 20, color: "black", marginLeft: 5 }}
        />
      </View>
      {/* <Image
        source={{ uri: amenity.icon_url }}
        style={{
          width: 10,
          height: 10,
          color: "black",
        }}
      /> */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: 8,
          flex: 1,
          marginRight: 5,
        }}
      >
        <CustomText style={defaultStyles.extraSmall}>{amenity.name}</CustomText>
      </View>
    </View>
  );
};
export default WorkspaceAmenity;

const styles = StyleSheet.create({
  container: {
    width: "30%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 10,
    marginBottom: 10,
    height: 50,
    alignItems: "center",
  },
});
