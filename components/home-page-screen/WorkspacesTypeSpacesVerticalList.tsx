import React from "react";
import { View, StyleSheet } from "react-native";

import WorkspaceCard from "./WorkspaceCard";

import { IWorkspace, IWorkspaceProps } from "../../ts-types";

const WorkspacesTypeSpacesVerticalList = ({
  workspaces,
  showDetailsClicked,
}: IWorkspaceProps) => {
  const showWorkspaceCard = () => {
    if (workspaces) {
      if (workspaces.length > 1) {
        return workspaces.map((workspace: any) => (
          <WorkspaceCard
            workspace={workspace}
            key={workspace.id}
            single={true}
            alone={false}
            showDetailsClicked={showDetailsClicked}
          />
        ));
      } else {
        return (
          <WorkspaceCard
            workspace={workspaces[0]}
            key={workspaces[0].id}
            single={true}
            alone={false}
            showDetailsClicked={showDetailsClicked}
          />
        );
      }
    }
  };

  return <View style={styles.container}>{showWorkspaceCard()}</View>;
};
export default WorkspacesTypeSpacesVerticalList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
