import React from "react";
import { View, StyleSheet } from "react-native";

import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import { TouchableOpacity } from "react-native-gesture-handler";

const FAQPageTabs = (props: any) => {
  const { selectedTab, onTabChange } = props;

  return (
    <View style={styles.tabContainer}>
      {selectedTab === "for users" ? (
        <View style={styles.selectedTab}>
          <CustomText style={styles.selectedForUsersStyle}>
            {" "}
            For users
          </CustomText>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.normalTab}
          onPress={() => onTabChange("for users")}
        >
          <CustomText style={styles.forUsersStyle}> For users</CustomText>
        </TouchableOpacity>
      )}
      {selectedTab === "for spaces" ? (
        <View style={styles.selectedTab}>
          <CustomText style={styles.selectedForSpacesStyle}>
            {" "}
            For spaces
          </CustomText>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.normalTab}
          onPress={() => onTabChange("for spaces")}
        >
          <CustomText style={styles.forSpacesStyle}> For spaces</CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default FAQPageTabs;

const styles = StyleSheet.create({
  tabContainer: {
    width: "80%",
    height: 30,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: 10,
    marginVertical: 20,
    marginLeft: "10%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
  },
  tabText: { marginLeft: 30, fontFamily: "montserrat" },
  normalTab: {
    width: 110,
    height: 30,
    paddingBottom: 10,
  },
  selectedTab: {
    width: 110,
    height: 30,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
  },
  forUsersStyle: {
    ...defaultStyles.h6Text,
    marginLeft: 10,
    fontFamily: "montserrat",
  },
  selectedForUsersStyle: {
    ...defaultStyles.h6Text,
    marginLeft: 10,
    fontFamily: "montserrat-semi-bold",
  },
  selectedForSpacesStyle: {
    ...defaultStyles.h6Text,
    marginLeft: 10,
    fontFamily: "montserrat-semi-bold",
  },
  forSpacesStyle: {
    ...defaultStyles.h6Text,
    marginLeft: 20,
    fontFamily: "montserrat",
  },
});
