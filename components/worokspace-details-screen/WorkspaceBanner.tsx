import React from "react";
import { View, StyleSheet } from "react-native";

import { IWorkspaceBannerProps } from "../../ts-types";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import { FONTSTYLES } from "../../constants";

const WorkspaceBanner = (props: IWorkspaceBannerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.bannerInnerContainer}>
        <CustomText
          style={{ ...defaultStyles.small, fontFamily: FONTSTYLES.semiBold }}
        >
          {props.banner.title}
        </CustomText>
        <CustomText
          style={{ ...defaultStyles.extraSmall, color: Colors.primary }}
        >
          {props.banner.sub_title}
        </CustomText>
      </View>
    </View>
  );
};
export default WorkspaceBanner;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#E3E3E3",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingLeft: 5,
    paddingRight: 20,
    paddingVertical: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  bannerInnerContainer: {
    justifyContent: "space-around",
    marginLeft: 15,
    height: 40,
  },
});
