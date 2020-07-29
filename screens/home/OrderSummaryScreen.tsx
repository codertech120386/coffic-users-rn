import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { WebView } from "react-native-webview";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";

import { GET_PLAN_DETAILS } from "../../queries";
import { CREATE_ORDER_v1, UPDATE_ORDER } from "../../mutations";
import { CustomText } from "../../components/ui/CustomText";
import { getUrl } from "../../config";
import defaultStyles, { Colors } from "../../AppCss";

let paymentDetails: {
  orderId?: string;
  amount?: number;
  custId?: string;
  planId?: number;
  subscriptionId?: number;
} = {};

const OrderSummaryScreen = (props: any) => {
  const [isShowPayTmModalOpen, setIsShowPayTmModalOpen] = useState<boolean>(
    false
  );
  const stateData =
    props && props.route && props.route.params && props.route.params;

  const startDate = stateData && stateData.startDate;
  const endDate = stateData && stateData.endDate;
  const numberOfSeats = stateData && stateData.numberOfSeats;
  let planId;

  const duration =
    moment(endDate, "DD-MM-YYYY").diff(
      moment(startDate, "DD-MM-YYYY"),
      "days"
    ) + 1;

  const { loading, error, data } = useQuery(GET_PLAN_DETAILS, {
    variables: {
      id: +props.route.params.planId,
    },
  });

  const plan = data && data.plan;
  const workspace = plan && plan.workspace;
  const workspaceName = workspace && workspace.name;

  const [createOrder, { data: orderData }] = useMutation(CREATE_ORDER_v1);
  const [updateOrder, { data: paymentData }] = useMutation(UPDATE_ORDER);

  const purchaseDetailsRow = (
    label: string,
    value: any,
    currency: boolean = false
  ) => {
    return (
      <View style={styles.purchaseDetailsRow}>
        <View style={styles.purchaseDetailsColumn}>
          <CustomText style={defaultStyles.small}>{label}</CustomText>
        </View>
        <View style={styles.purchaseDetailsColumn}>
          {currency ? (
            <CustomText
              style={{
                ...defaultStyles.small,
                fontFamily: "montserrat-semi-bold",
                textAlign: "right",
              }}
            >
              &#8377; {value}
            </CustomText>
          ) : (
            <CustomText
              style={{
                ...defaultStyles.small,
                fontFamily: "montserrat-semi-bold",
                textAlign: "right",
              }}
            >
              {value}
            </CustomText>
          )}
        </View>
      </View>
    );
  };

  const onPurchasePlanClickListener = async () => {
    planId = data && data.plan && data.plan.id;
    const variables = {
      planId: planId ? +planId : null,
      numberOfSeats: +numberOfSeats,
      couponCode: "abc",
      gateway: "paytm",
      startDate,
      endDate,
    };
    let result;
    try {
      // send a request to the server with the plan id and coupon code if any
      result = await createOrder({
        variables,
      });
    } catch (e) {
      console.log(e);
    }
    const resultData = result && result.data && result.data.createOrderV1;

    const subscriptionId = resultData && resultData.subscription_id;
    if (resultData && resultData.amount && resultData.amount != 0) {
      paymentDetails.orderId = resultData && resultData.order_id;
      paymentDetails.amount =
        resultData && resultData.amount && resultData.amount > 0
          ? resultData.amount / 100
          : 0;
      paymentDetails.planId = planId;
      paymentDetails.subscriptionId = subscriptionId;
      setIsShowPayTmModalOpen(true);
    } else {
      // history.push(`/workspace/${subscriptionId}/purchased`);
    }
  };

  return (
    <View style={styles.container}>
      {plan && (
        <>
          {purchaseDetailsRow("Workspace:", workspaceName)}
          {purchaseDetailsRow("Plan Type:", plan.space_type)}
          {purchaseDetailsRow("Membership Plan:", plan.title)}
          {purchaseDetailsRow("Start Date:", startDate)}
          {purchaseDetailsRow("End Date:", endDate)}
          {purchaseDetailsRow("Number of Days:", duration)}

          <View style={styles.cardBottomBorder} />

          {purchaseDetailsRow("Cost of Plan:", data.plan.cost / 100, true)}
          {purchaseDetailsRow("Number of Plans:", numberOfSeats)}
          {purchaseDetailsRow(
            "Sub Total:",
            (plan.cost / 100) * numberOfSeats,
            true
          )}
          {purchaseDetailsRow(
            "GST(18%):",
            (plan.cost / 100) * numberOfSeats * (18 / 100)
          )}
          {purchaseDetailsRow(
            "To Pay:",
            (plan.cost / 100) * numberOfSeats +
              (plan.cost / 100) * numberOfSeats * (18 / 100),
            true
          )}
        </>
      )}

      {/* ----- Subscription Action Button ------ */}
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            width: "50%",
          }}
        >
          <CustomText
            onPress={onPurchasePlanClickListener}
            style={{
              ...defaultStyles.h6Text,
              paddingHorizontal: 25,
              paddingVertical: 10,
              color: "white",
              textAlign: "center",
            }}
          >
            Proceed to pay
          </CustomText>
        </TouchableOpacity>
      </View>

      {/* ----- PayTm Modal ------ */}
      <Modal
        isVisible={isShowPayTmModalOpen}
        onBackButtonPress={() => setIsShowPayTmModalOpen(false)}
        onBackdropPress={() => setIsShowPayTmModalOpen(false)}
      >
        <WebView
          source={{
            uri: `${getUrl()}/api/paytm/request?ORDER_ID=${
              paymentDetails.orderId
            }&TXN_AMOUNT=${paymentDetails.amount}&PLAN_ID=${
              paymentDetails.planId
            }&SUBS_ID=${paymentDetails.subscriptionId}`,
          }}
          injectedJavaScript={`document.getElementById('ORDER_ID').value = "${paymentDetails.orderId}"; document.getElementById('TXN_AMOUNT').value = "${paymentDetails.amount}";document.f1.submit()`}
          onNavigationStateChange={(data: any) => {
            if (data.title === "true") {
              setIsShowPayTmModalOpen(false);
              props.navigation.navigate("WorkspaceSubscriptionPurchased", {
                id: paymentDetails.subscriptionId,
              });
            }
          }}
        />
      </Modal>
    </View>
  );
};
export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 30,
    marginLeft: "5%",
    alignItems: "center",
  },
  cardBottomBorder: {
    width: "100%",
    height: 1,
    textAlign: "center",
    backgroundColor: "#ccc",
    marginTop: 10,
    marginBottom: 20,
  },
  purchaseDetailsRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  purchaseDetailsColumn: {
    width: "45%",
  },
});
