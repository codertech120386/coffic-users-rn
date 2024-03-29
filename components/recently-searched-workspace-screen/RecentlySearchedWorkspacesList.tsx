import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

import { IRecentlySearchedWorkspacesListProps } from "../../ts-types";
import WorkspaceListCard from "./WorkspaceListCard";
import { View } from "native-base";

const RecentlySearchedWorkspacesList = (
  props: IRecentlySearchedWorkspacesListProps
) => (
  <ScrollView style={styles.container}>
    <View>
      {props &&
        props.workspaces &&
        props.workspaces.map((workspace: any, i: number) => (
          <View key={i}>
            <WorkspaceListCard
              workspace={workspace}
              onRedirectToIconClicked={props.onRedirectToIconClicked}
            />
            <View style={styles.horizontalDivider}></View>
          </View>
        ))}
    </View>
  </ScrollView>
);
export default RecentlySearchedWorkspacesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  horizontalDivider: {
    marginTop: 5,
    backgroundColor: "#ccc",
    height: 0.5,
  },
});
