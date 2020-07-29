import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import {
  USER_PROFESSIONAL_DETAILS,
  USER_PERSONAL_DETAILS,
} from "../../queries";

import UserProfilePageTabs from "../../components/my-profile-screen/UserProfilePageTabs";
import UserProfessionalDetails from "../../components/my-profile-screen/UserProfessionalDetails";
import UserPersonalDetails from "../../components/my-profile-screen/UserPersonalDetails";

const MyProfileScreen = (props: any) => {
  const [selectedTab, setSelectedTab] = useState<string>("personal");

  console.log(props.route.params);

  const {
    loading: professionalLoading,
    error: professionalError,
    data: professionalData,
  } = useQuery(USER_PROFESSIONAL_DETAILS);

  const {
    loading: personalLoading,
    error: personalError,
    data: personalData,
  } = useQuery(USER_PERSONAL_DETAILS);

  const routeParams = props && props.route && props.route.params;
  const profileImageUrl = routeParams && routeParams.profileImageUrl;
  const name = routeParams && routeParams.name;

  const onTabChangeClicked = (tabName: string) => {
    setSelectedTab(tabName);
  };

  console.log("professionalData", professionalData);
  console.log("personalData", personalData);

  return (
    <View style={styles.container}>
      <UserProfilePageTabs
        onTabChange={onTabChangeClicked}
        selectedTab={selectedTab}
      />
      {selectedTab === "professional" ? (
        <UserProfessionalDetails
          details={professionalData}
          profileImageUrl={profileImageUrl}
          name={name}
        />
      ) : selectedTab === "personal" && personalData ? (
        <UserPersonalDetails
          details={personalData}
          profileImageUrl={profileImageUrl}
          name={name}
        />
      ) : null}
    </View>
  );
};
export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
