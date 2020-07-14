import React from "react";
import { CustomText } from "../components/ui/CustomText";
import { View, StyleSheet } from "react-native";

import defaultStyles from "../AppCss";
import { Colors } from "../AppCss";
import { ScrollView } from "react-native-gesture-handler";

export default function TermsAndConditionsScreen() {
  return (
    <ScrollView style={{ ...defaultStyles.container, ...styles.container }}>
      <CustomText style={{ ...defaultStyles.h3Text, ...styles.headingText }}>
        TERMS AND CONDITIONS
      </CustomText>
      <CustomText style={{ ...defaultStyles.small, ...styles.termsText }}>
        Coffic is an application that allows subscribers to work from creative
        workcafes all over the country. Our aim is to eradicate the cumbersome
        process of monthly rents, travel costs & other operational expenses
        while giving you the perfect opportunity to work from different
        workcafes every day. Upon downloading the application, users can opt
        from daily, weekly or monthly subscriptions and check-in to either of
        our listed workcafes at a convenient time. Coffic is an application that
        allows subscribers to work from creative workcafes all over the country.
        Our aim is to eradicate the cumbersome process of monthly rents, travel
        costs & other operational expenses while giving you the perfect
        opportunity to work from different workcafes every day. Upon downloading
        the application, users can opt from daily, weekly or monthly
        subscriptions and check-in to either of our listed workcafes at a
        convenient time. Coffic is an application that allows subscribers to
        work from creative workcafes all over the country. Our aim is to
        eradicate the cumbersome process of monthly rents, travel costs & other
        operational expenses while giving you the perfect opportunity to work
        from different workcafes every day. Upon downloading the application,
        users can opt from daily, weekly or monthly subscriptions and check-in
        to either of our listed workcafes at a convenient time. Coffic is an
        application that allows subscribers to work from creative workcafes all
        over the country. Our aim is to eradicate the cumbersome process of
        monthly rents, travel costs & other operational expenses while giving
        you the perfect opportunity to work from different workcafes every day.
        Upon downloading the application, users can opt from daily, weekly or
        monthly subscriptions and check-in to either of our listed workcafes at
        a convenient time.{" "}
      </CustomText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  headingText: {
    marginTop: 5,
    color: Colors.primary,
    textAlign: "center",
  },
  termsText: {
    marginTop: 10,
  },
});
