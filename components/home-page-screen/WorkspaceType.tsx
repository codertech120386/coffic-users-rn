import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { IWorkspaceTypeProps } from "../../ts-types";
import { TYPE } from "../../queries";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import WorkspaceTypeSpacesList from "./WorkspaceTypeSpacesList";
import { FONTSTYLES } from "../../constants";

const WorkspaceType = ({
  type,
  filters,
  searchTerm,
  latLong,
  onNoResultsExploreButtonClicked,
  showDetailsClicked,
}: IWorkspaceTypeProps) => {
  const typeVariablesObject = {
    id: +type.id,
    search: searchTerm,
    offset: 0,
    take: 10,
    filters: { ...filters, latLong },
  };

  const { loading, error, data } = useQuery(TYPE, {
    variables: typeVariablesObject,
  });

  if (loading)
    return <CustomText style={defaultStyles.h2Text}>Loading...</CustomText>;
  if (error)
    return (
      <CustomText style={defaultStyles.h2Text}>
        Error! ${error.message}
      </CustomText>
    );

  const name = type && type.displayName ? type.displayName : type.name;

  const onViewAllCardClickListener = () => {
    // history.push({
    //   pathname: `/workspace-type/${type.id}/view-all`,
    //   state: {
    //     data: {
    //       latLong,
    //     },
    //   },
    // });
  };

  const showWorkspaceTypeSpacesList = () => {
    if (data && data.type && data.type.workspaces.length) {
      return (
        <>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <CustomText
              style={{ ...defaultStyles.h6Text, textTransform: "capitalize" }}
            >
              {name}
            </CustomText>
            <CustomText
              style={{
                ...defaultStyles.small,
                color: Colors.primary,
                fontFamily: FONTSTYLES.semiBold,
              }}
              onClick={onViewAllCardClickListener}
            >
              View all
            </CustomText>
          </View>
          <WorkspaceTypeSpacesList
            workspaces={data.type.workspaces}
            type={type}
            showDetailsClicked={showDetailsClicked}
          />
        </>
      );
    }
  };

  return <View style={styles.container}>{showWorkspaceTypeSpacesList()}</View>;
};
export default WorkspaceType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
});
