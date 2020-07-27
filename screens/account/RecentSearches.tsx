import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import RecentlySearchedWorkspacesList from "../../components/recently-searched-workspace-screen/RecentlySearchedWorkspacesList";
import NoRecentlySearchedWorkspaces from "../../components/recently-searched-workspace-screen/NoRecentlySearchedWorkspaces";

import { RECENTLY_SEARCH_WORKSPACES } from "../../queries";

const RecentSearchesScreen = (props: any) => {
  const { loading, error, data } = useQuery(RECENTLY_SEARCH_WORKSPACES);

  const redirectToWorkspaceDetails = (id: number) => {
    props.navigation.navigate("WorkspaceDetails", {
      id,
    });
  };

  return (
    <View style={styles.container}>
      {data &&
      data.recentlySearchedWorkspaces &&
      data.recentlySearchedWorkspaces.length ? (
        <RecentlySearchedWorkspacesList
          workspaces={data && data.recentlySearchedWorkspaces}
          onRedirectToIconClicked={redirectToWorkspaceDetails}
        />
      ) : (
        <NoRecentlySearchedWorkspaces />
      )}
    </View>
  );
};
export default RecentSearchesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
