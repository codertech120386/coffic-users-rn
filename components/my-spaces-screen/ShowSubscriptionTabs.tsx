import React from "react";
import { View, TouchableOpacity } from "react-native";
import { commonTabStyles } from "../../styles/CommonTabsStyles";
import { CustomText } from "../ui/CustomText";

const ShowSubscriptionTabs = ({ selectedTab, onTabChange }: any) => {
  return (
    <View style={commonTabStyles.tabContainer}>
      {selectedTab === "active" ? (
        <View style={commonTabStyles.selectedTab}>
          <CustomText style={commonTabStyles.selectedForUsersStyle}>
            {" "}
            Active
          </CustomText>
        </View>
      ) : (
        <TouchableOpacity
          style={commonTabStyles.normalTab}
          onPress={() => onTabChange("active")}
        >
          <CustomText style={commonTabStyles.forUsersStyle}> Active</CustomText>
        </TouchableOpacity>
      )}
      {selectedTab === "expired" ? (
        <View style={commonTabStyles.selectedTab}>
          <CustomText style={commonTabStyles.selectedForSpacesStyle}>
            {" "}
            Expired
          </CustomText>
        </View>
      ) : (
        <TouchableOpacity
          style={commonTabStyles.normalTab}
          onPress={() => onTabChange("expired")}
        >
          <CustomText style={commonTabStyles.forSpacesStyle}>
            {" "}
            Expired
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ShowSubscriptionTabs;
