import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import { IPurchaseCardProps } from "../../ts-types";

import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";

const PurchaseCard = (props: IPurchaseCardProps) => {
  const purchase = props && props.purchase;
  const plan = purchase && purchase.plan;
  const workspace = plan && plan.workspace;
  const workspaceName = workspace && workspace.name;
  const firstImage =
    workspace &&
    workspace.images &&
    workspace.images[0] &&
    workspace.images[0].image_url;
  const purchasedAt = moment(
    purchase && purchase.created_at,
    "YYYY-MM-DD"
  ).format("DD MMMM YYYY");

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
          {purchasedAt}
        </CustomText>
      </View>
      <View style={styles.cardContainer}>
        <View>
          <Image
            style={styles.workspaceImage}
            source={{ uri: firstImage, width: 60, height: 60 }}
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
            {plan && plan.space_type} at {workspaceName}
          </CustomText>
          <CustomText style={{ ...defaultStyles.extraSmall, ...styles.text }}>
            {plan && plan.title} Plan
          </CustomText>
        </View>
        <TouchableOpacity
          style={styles.forwardIconContainer}
          onPress={() =>
            props.redirectToPurchaseDetail(purchase && purchase.id)
          }
        >
          <Ionicons name="ios-arrow-forward" size={23} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PurchaseCard;

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
