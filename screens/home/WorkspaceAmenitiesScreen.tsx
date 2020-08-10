import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { GET_WORKSPACE_AMENITIES } from "../../queries";
import { CustomText } from "../../components/ui/CustomText";
import defaultStyles from "../../AppCss";
import { IAmenity } from "../../ts-types";
import WorkspaceAmenity from "../../components/worokspace-details-screen/WorkspaceAmenity";

const WorkspaceAmenitiesScreen = (props: any) => {
  const workspaceId = props.route.params.id;

  const { loading, error, data } = useQuery(GET_WORKSPACE_AMENITIES, {
    variables: {
      id: +workspaceId,
    },
  });

  if (loading)
    return <CustomText style={defaultStyles.h2Text}>Loading...</CustomText>;
  if (error)
    return (
      <CustomText style={defaultStyles.h2Text}>
        Error! ${error.message}
      </CustomText>
    );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      {data &&
        data.workspace &&
        data.workspace.amenities &&
        data.workspace.amenities.map((amenity: IAmenity) => (
          <WorkspaceAmenity amenity={amenity} key={amenity.id} />
        ))}
    </ScrollView>
  );
};
export default WorkspaceAmenitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 50,
  },
  contentContainerStyle: {
    justifyContent: "center",
  },
});
