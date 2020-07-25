import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { commonAuthStyles } from "../../styles/CommonAuthStyles";
import ShowRecentlySearchedWorkspaces from "./ShowRecentlySearchedWorkspaces";
import { CustomText } from "../ui/CustomText";
import defaultStyles from "../../AppCss";

const NoSubscriptionsFoundExplore = ({
  workspaceData,
  exploreWorkspacesClicked,
}: any) => {
  const onExploreWorkspacesClicked = () => {
    exploreWorkspacesClicked;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <CustomText
          style={{ ...defaultStyles.small, marginBottom: 10, lineHeight: 20 }}
        >
          The elite spots in the city where you prefer to spend your time
          hustling with your business and meeting awesome people. When you are
          ready start your hustle with us, we are ready with a workspace for
          you.
        </CustomText>
        <CustomText style={{ ...defaultStyles.small, lineHeight: 20 }}>
          Can’t find your workspace booking here? Visit the Support Centre.
        </CustomText>
        <TouchableOpacity onPress={onExploreWorkspacesClicked}>
          <View
            style={{
              ...commonAuthStyles.registerButtonContainer,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                ...commonAuthStyles.registerButtonText,
                ...defaultStyles.small,
                fontFamily: "montserrat-bold",
              }}
            >
              Explore Workspaces
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {workspaceData &&
        workspaceData.recentlySearchedWorkspaces &&
        workspaceData.recentlySearchedWorkspaces.length > 0 && (
          <ShowRecentlySearchedWorkspaces
            workspaces={workspaceData.recentlySearchedWorkspaces}
          />
        )}
    </ScrollView>
  );
};
export default NoSubscriptionsFoundExplore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
