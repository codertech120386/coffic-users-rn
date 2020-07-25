import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import SubscriptionCard from "./SubscriptionCard";

const SubscriptionCardList = ({
  subscriptions,
  checkInFailed,
  subscriptonCardButtonClicked,
}: any) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {subscriptions.map((subscription: any) => (
        <SubscriptionCard
          subscription={subscription}
          key={subscription.id}
          showBottomOptions={true}
          checkinFailed={checkInFailed}
          subscriptonCardButtonClicked={subscriptonCardButtonClicked}
        />
      ))}
    </ScrollView>
  );
};
export default SubscriptionCardList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
