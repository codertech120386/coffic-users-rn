import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { GET_SUBSCRIPTION } from "../../queries";
import { CustomText } from "../../components/ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const MySpacesSubscriptionDetails = (props: any) => {
  const { loading, error, data } = useQuery(GET_SUBSCRIPTION, {
    variables: {
      id: +props.route.params.id,
    },
  });

  const onChatClicked = () => {};

  const onWhatsappClicked = () => {};

  const onCallClicked = () => {};

  const purchaseDetailsRow = (label: string, value: any) => {
    return (
      <View style={styles.purchaseDetailsRow}>
        <View style={styles.purchaseDetailsColumn}>
          <CustomText style={defaultStyles.extraSmall}>{label}</CustomText>
        </View>
        <View style={styles.purchaseDetailsColumn}>
          <CustomText
            style={{
              ...defaultStyles.extraSmall,
              fontFamily: "montserrat-semi-bold",
            }}
          >
            {value}
          </CustomText>
        </View>
      </View>
    );
  };

  const subscription = data && data.subscription;
  const payment = subscription && subscription.payment;
  const plan = payment && payment.plan;
  const workspace = plan && plan.workspace;
  const workspaceName = workspace && workspace.name;
  const secondImageUrl = workspace && workspace.images[1].image_url;
  const shortAddress = workspace && workspace.addresses[0].short_address;
  const subscriptionStartDate = moment(
    subscription && subscription.start_date
  ).format("DD MMMM");
  const subscriptionEndDate = moment(
    subscription && subscription.end_date
  ).format("DD MMMM YYYY");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.planContainer}>
        <View style={styles.cardContainer}>
          <View style={{ alignSelf: "center" }}>
            <Image
              style={styles.workspaceImage}
              source={{ uri: secondImageUrl, width: 50, height: 50 }}
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
              {workspaceName}
            </CustomText>
            <CustomText
              style={{
                ...defaultStyles.extraSmall,
                ...styles.text,
                color: Colors.primary,
                fontFamily: "montserrat-semi-bold",
              }}
            >
              {shortAddress}
            </CustomText>
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            borderTopColor: "#ccc",
            borderTopWidth: 1,
            paddingVertical: 15,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
          }}
        >
          {purchaseDetailsRow("Package", plan && plan.location_type)}
          {purchaseDetailsRow("Package Type", plan && plan.space_type)}
          {purchaseDetailsRow("Duration", plan && plan.title)}
          {purchaseDetailsRow(
            "Date",
            `${subscriptionStartDate} to ${subscriptionEndDate}`
          )}
          {purchaseDetailsRow(
            "Number of Seats",
            payment && payment.number_of_seats
          )}
        </View>
        <CustomText style={{ ...defaultStyles.h6Text, marginBottom: 20 }}>
          Great, We have received your booking request!
        </CustomText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          <MaterialCommunityIcons
            name="clock-outline"
            size={24}
            color={Colors.primary}
          />
          <CustomText
            style={{
              ...defaultStyles.extraSmall,
              fontFamily: "montserrat-semi-bold",
              color: Colors.primary,
            }}
          >
            NOW CHECKING WITH THE WORKSPACE...
          </CustomText>
        </View>
        <CustomText
          style={{
            ...defaultStyles.extraSmall,
            fontFamily: "montserrat-italic",
            marginBottom: 10,
          }}
        >
          This generally takes 15 to 30 mins for the workspace to confirm.
        </CustomText>
        <CustomText
          style={{
            ...defaultStyles.extraSmall,
            fontFamily: "montserrat-italic",
            marginBottom: 10,
          }}
        >
          We will notify you once confirmed.
        </CustomText>
      </View>
      <CustomText
        style={{
          ...defaultStyles.small,
          fontFamily: "montserrat-semi-bold",
          alignSelf: "flex-start",
          marginLeft: 40,
          marginVertical: 10,
        }}
      >
        Taking too long?
      </CustomText>
      <CustomText
        style={{
          ...defaultStyles.extraSmall,
          marginHorizontal: 40,
          marginBottom: 10,
        }}
      >
        If it’s more than a week that no one has reached to you? or your
        naturally impatient and want to speed up the process. We request you to
        give a couple of more days or reach out to us using options given below:
      </CustomText>
    </ScrollView>
  );
};
export default MySpacesSubscriptionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  purchaseDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  purchaseDetailsColumn: {
    width: "50%",
    alignItems: "flex-start",
  },
  planContainer: {
    width: "80%",
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  cardContainer: {
    width: "80%",
    height: 55,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
  workspaceImage: {
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 25,
  },
  text: {
    color: "#202020",
    marginBottom: 5,
  },
});
