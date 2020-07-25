import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ShowSubscriptionsProps } from "../../ts-types";
import ShowSubscriptionTabs from "./ShowSubscriptionTabs";
import SubscriptionCardList from "./SubscriptionCardList";
import defaultStyles from "../../AppCss";

const ShowSubscriptions = ({
  activeSubscriptions,
  expiredSubscriptions,
  subscriptonCardButtonClicked,
}: ShowSubscriptionsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("active");

  const onTabChangeClicked = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const checkInFailed = ({ error, message }: any) => {};

  return (
    <View style={defaultStyles.container}>
      <ShowSubscriptionTabs
        selectedTab={selectedTab}
        onTabChange={onTabChangeClicked}
      />
      {selectedTab === "active" ? (
        <SubscriptionCardList
          subscriptions={activeSubscriptions}
          checkInFailed={checkInFailed}
          subscriptonCardButtonClicked={subscriptonCardButtonClicked}
        />
      ) : (
        <SubscriptionCardList
          subscriptions={expiredSubscriptions}
          checkInFailed={checkInFailed}
          subscriptonCardButtonClicked={subscriptonCardButtonClicked}
        />
      )}
    </View>
  );
};
export default ShowSubscriptions;

const styles = StyleSheet.create({});
