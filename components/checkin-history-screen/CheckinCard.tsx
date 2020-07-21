import React from "react";
import moment from "moment";

import { ICheckinCardProps } from "../../ts-types";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import { Ionicons } from "@expo/vector-icons";

const CheckinCard = (props: ICheckinCardProps) => {
  const createdAtTime = moment(
    props && props.data && props.data.created_at
  ).format("LT");

  const createdAtDate = moment(
    props && props.data && props.data.created_at
  ).format("DD MMMM YYYY");

  const workspace = props && props.data && props.data.workspace;
  const workspaceImage =
    workspace && workspace.images && workspace.images[0].image_url;
  console.log("worspace", workspace);
  return (
    <View style={{ ...defaultStyles.container, ...styles.container }}>
      <View style={{ width: "90%", marginBottom: 10 }}>
        <CustomText
          style={{
            ...defaultStyles.littleSmall,
            ...styles.text,
            ...styles.daysText,
          }}
        >
          {createdAtDate}
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
          <CustomText
            style={{
              ...defaultStyles.small,
              ...styles.text,
              fontFamily: "montserrat-bold",
            }}
          >
            Checked in at {workspace && workspace.name}
          </CustomText>
          <CustomText style={{ ...defaultStyles.extraSmall, ...styles.text }}>
            {createdAtTime}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default CheckinCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    padding: 25,
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
