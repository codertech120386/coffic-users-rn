import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import WorkspaceCard from "./WorkspaceCard";

import { IWorkspaceProps } from "../../ts-types";

const WorkspaceTypeSpacesList = ({
  type,
  workspaces,
  showDetailsClicked,
}: IWorkspaceProps) => {
  const showSlider = () => {
    if (workspaces) {
      if (workspaces.length > 1) {
        return (
          <ScrollView
            scrollEventThrottle={16}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={{ paddingLeft: 20 }}
          >
            {workspaces.map((workspace: any) => (
              <WorkspaceCard
                workspace={workspace}
                single={false}
                alone={false}
                showDetailsClicked={showDetailsClicked}
                key={workspace.id}
              />
            ))}
          </ScrollView>
        );
      } else {
        let workspace = workspaces[0];
        return (
          <WorkspaceCard
            workspace={workspace}
            single={false}
            alone={true}
            key={workspace.id}
            showDetailsClicked={showDetailsClicked}
          />
        );
      }
    }
  };

  return <View style={styles.container}>{showSlider()}</View>;
};
export default WorkspaceTypeSpacesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
});
