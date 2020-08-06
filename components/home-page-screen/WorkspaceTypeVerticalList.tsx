import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { IWorkspaceTypeProps } from "../../ts-types";
import { useQuery } from "@apollo/react-hooks";
import { TYPE } from "../../queries";
import { CustomText } from "../ui/CustomText";
import defaultStyles from "../../AppCss";
import WorkspacesTypeSpacesVerticalList from "./WorkspacesTypeSpacesVerticalList";
import NoResultsFound from "./NoResultsFound";

const WorkspaceTypeVerticalList = ({
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

  const { loading, error, data, refetch: fetchTypes } = useQuery(TYPE, {
    variables: typeVariablesObject,
  });

  useEffect(() => {
    fetchTypes(typeVariablesObject);
  }, [fetchTypes, filters, searchTerm, type.id, typeVariablesObject]);

  if (loading)
    return <CustomText style={defaultStyles.h2Text}>Loading...</CustomText>;
  if (error)
    return (
      <CustomText style={defaultStyles.h2Text}>
        Error! ${error.message}
      </CustomText>
    );

  return (
    <View style={styles.container}>
      {data && data.type && data.type.workspaces.length ? (
        <WorkspacesTypeSpacesVerticalList
          workspaces={data.type.workspaces}
          showDetailsClicked={showDetailsClicked}
        />
      ) : (
        <NoResultsFound buttonClicked={onNoResultsExploreButtonClicked} />
      )}
    </View>
  );
};
export default WorkspaceTypeVerticalList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
