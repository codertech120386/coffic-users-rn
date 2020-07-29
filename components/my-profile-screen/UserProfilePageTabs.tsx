import React from "react";
import { View, TouchableOpacity } from "react-native";
import { commonTabStyles } from "../../styles/CommonTabsStyles";
import { CustomText } from "../ui/CustomText";

const UserProfilePageTabs = ({ selectedTab, onTabChange }: any) => {
  return (
    <View style={commonTabStyles.tabContainer}>
      {selectedTab === "professional" ? (
        <View style={commonTabStyles.selectedTab}>
          <CustomText style={commonTabStyles.selectedForUsersStyle}>
            {" "}
            Professional
          </CustomText>
        </View>
      ) : (
        <TouchableOpacity
          style={commonTabStyles.normalTab}
          onPress={() => onTabChange("professional")}
        >
          <CustomText style={commonTabStyles.forUsersStyle}>
            {" "}
            Professional
          </CustomText>
        </TouchableOpacity>
      )}
      {selectedTab === "personal" ? (
        <View style={{ ...commonTabStyles.selectedTab, marginLeft: 25 }}>
          <CustomText
            style={{
              ...commonTabStyles.selectedForSpacesStyle,
              marginLeft: 25,
            }}
          >
            {" "}
            Personal
          </CustomText>
        </View>
      ) : (
        <TouchableOpacity
          style={{ ...commonTabStyles.normalTab, marginLeft: 25 }}
          onPress={() => onTabChange("personal")}
        >
          <CustomText
            style={{ ...commonTabStyles.forSpacesStyle, marginLeft: 25 }}
          >
            {" "}
            Personal
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default UserProfilePageTabs;
