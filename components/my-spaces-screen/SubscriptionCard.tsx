import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";

import { CHECKIN } from "../../mutations";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";

const SubscriptionCard = ({
  subscription,
  showBottomOptions,
  checkinFailed,
  subscriptonCardButtonClicked,
  showBottomBorder,
  styleProps,
}: any) => {
  const [checkin, {}] = useMutation(CHECKIN);

  const [isShowBottomBorder, setIsShowBottomBorder] = useState<boolean>(
    showBottomBorder !== undefined || showBottomBorder !== null
      ? showBottomBorder
      : true
  );

  const payment = subscription && subscription.payment;
  const plan = payment && payment.plan;
  const workspace = plan && plan.workspace;
  const workspaceName = workspace && workspace.name;
  const images = workspace && workspace.images;
  const firstImage = images && images[0].image_url;
  const shortAddress =
    workspace &&
    workspace.addresses &&
    workspace.addresses[0] &&
    workspace.addresses[0].short_address;

  const buttonClicked = (checkInButtonText: string) => {
    if (checkInButtonText === "Check Status") {
      subscriptonCardButtonClicked(checkInButtonText, subscription.id);
      //TODO redirect to subscription details screen
      //   history.push(`/my-spaces/subscription-details/${subscription.id}`);
    } else if (checkInButtonText === "Check In") {
      try {
        checkin({
          variables: {
            workspaceId: workspace && workspace.id,
          },
        }).then((responseData) =>
          //   history.push(
          //     `/checkin-success/${
          //       responseData &&
          //       responseData.data &&
          //       responseData.data.checkin &&
          //       responseData.data.checkin.id
          //     }`
          //   )
          //TODO redirect to checkin success screen
          console.log("responseData", responseData)
        );
      } catch {
        checkinFailed({
          error: true,
          message: "Something went wrong .. please try again later",
        });
      }
    } else if (checkInButtonText === "Purchase Again") {
      //TODO redirect to workspace details page
    } else {
      //TODO redirect to support screen
    }
  };

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

  const status = subscription && subscription.status;
  const start_date = subscription && subscription.start_date;
  const subscriptionStartDate = moment(
    subscription && subscription.start_date,
    "YYYY-MM-DD"
  ).format("DD MMMM");
  const subscriptionEndDate = moment(
    subscription && subscription.end_date,
    "YYYY-MM-DD"
  ).format("DD MMMM YYYY");
  const end_date = subscription && subscription.end_date;
  const now = moment();

  if (status === "confirmed") {
    console.log("subscription", subscription);
  }

  const checkInButtonText =
    status === "confirmed" && moment(end_date).isBefore(now)
      ? "Purchase Again"
      : status === "confirmed"
      ? "Check In"
      : status === "pending"
      ? "Check Status"
      : "Contact Support";

  const statusText =
    status === "confirmed" && moment(end_date).isBefore(now)
      ? "Expired"
      : status === "confirmed" && moment(start_date).isAfter(now)
      ? "Upcoming"
      : status === "confirmed" && moment(start_date).isBefore(now)
      ? "Active"
      : status === "pending"
      ? "Pending"
      : "Contact Support";

  const isButtonDisabled =
    (status === "confirmed" && moment(start_date).isBefore(now)) ||
    (status === "confirmed" && moment(end_date).isBefore(now)) ||
    status === "pending"
      ? false
      : true;

  const checkInClass = isButtonDisabled ? "greyed-out" : "success";

  const bodyClass = statusText === "Expired" ? "greyed-out" : "white";

  return (
    <View style={styles.container}>
      <View style={{ ...styles.planContainer, ...styleProps }}>
        <View style={styles.cardContainer}>
          <View style={{ alignSelf: "center" }}>
            <Image
              style={styles.workspaceImage}
              source={{ uri: firstImage, width: 50, height: 50 }}
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
        {isShowBottomBorder && <View style={styles.cardBottomBorder} />}
        <View
          style={{
            marginVertical: 10,
            borderTopColor: "#ccc",
            borderTopWidth: 1,
            paddingTop: 15,
            paddingBottom: isShowBottomBorder ? 15 : 5,
            borderBottomColor: "#ccc",
            borderBottomWidth: isShowBottomBorder ? 1 : 0,
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
        <View>
          {showBottomOptions && (
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 5,
              }}
            >
              <CustomText
                style={{
                  ...defaultStyles.h6Text,
                  fontFamily: "montserrat-semi-bold",
                  color: Colors.primary,
                }}
              >
                {statusText}
              </CustomText>

              {/* ----- Subscription Action Button ------ */}
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.primary,
                    borderRadius: 5,
                    marginLeft: checkInButtonText !== "Check In" ? 50 : 70,
                  }}
                >
                  <CustomText
                    onPress={() => buttonClicked(checkInButtonText)}
                    style={{
                      ...defaultStyles.h6Text,
                      paddingHorizontal:
                        checkInButtonText !== "Check In" ? 10 : 25,
                      paddingVertical: 5,
                      color: "white",
                    }}
                  >
                    {checkInButtonText}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default SubscriptionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
  cardBottomBorder: {
    width: "100%",
    height: 1,
    textAlign: "center",
    backgroundColor: "#ccc",
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
  buttonStyles: {
    backgroundColor: Colors.primary,
    maxWidth: "100%",
  },
});
