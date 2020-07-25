import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import moment from "moment";

import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import { Ionicons } from "@expo/vector-icons";

const ShowRecentlySearchedWorkspaces = (props: any) => (
  <View style={styles.container}>
    <CustomText style={defaultStyles.h5Text}>Recent Searches</CustomText>
    {props &&
      props.workspaces &&
      props.workspaces.map((workspace: any, id: number) => {
        console.log("wk", workspace);
        const updatedAtDate = moment(workspace && workspace.updated_at).format(
          "DD MMMM YYYY"
        );

        const today = moment();
        const diffInDays = today.diff(updatedAtDate, "days");
        const workspaceImage =
          workspace &&
          workspace.workspace &&
          workspace.workspace.images &&
          workspace.workspace.images[0].image_url;

        return (
          <View
            style={{ ...defaultStyles.container, ...styles.container }}
            key={id}
          >
            <View style={{ width: "90%", marginBottom: 10 }}>
              <CustomText
                style={{
                  ...defaultStyles.small,
                  ...styles.text,
                  ...styles.daysText,
                }}
              >
                {diffInDays === 1
                  ? "1 day ago"
                  : diffInDays === 0
                  ? "today"
                  : `${diffInDays} days ago`}
              </CustomText>
            </View>
            <View style={styles.cardContainer}>
              <View>
                <Image
                  style={styles.workspaceImage}
                  source={{ uri: workspaceImage, width: 60, height: 60 }}
                />
              </View>
              <View style={styles.cardTextContainer}>
                <CustomText style={{ ...defaultStyles.h5Text, ...styles.text }}>
                  {workspace && workspace.workspace && workspace.workspace.name}
                </CustomText>
                <CustomText
                  style={{ ...defaultStyles.littleSmall, ...styles.text }}
                >
                  {workspace &&
                    workspace.workspace &&
                    workspace.workspace.addresses &&
                    workspace.workspace.addresses[0].short_address}
                </CustomText>
              </View>
              <TouchableOpacity
                style={styles.forwardIconContainer}
                onPress={() => {
                  props.onRedirectToIconClicked(props.redirectPath);
                }}
              >
                <Ionicons
                  name="ios-arrow-forward"
                  size={23}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
  </View>
);
export default ShowRecentlySearchedWorkspaces;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    marginVertical: 25,
  },
  daysText: {
    fontFamily: "montserrat-bold",
    color: Colors.primary,
    alignSelf: "flex-start",
  },
  workspaceImage: {
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 30,
  },
  cardContainer: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginLeft: 20,
  },
  text: {
    color: "#202020",
  },
  forwardIconContainer: {
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    width: 15,
  },
});
