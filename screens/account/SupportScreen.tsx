import React from "react";
import { View, StyleSheet, ScrollView, Platform, Linking } from "react-native";

import SupportOptions from "../../components/support-screen/SupportOptions";
import { CustomText } from "../../components/ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import { TouchableOpacity } from "react-native-gesture-handler";

const SupportScreen = (props: any) => {
  const redirectTo = (location: string) => {
    props.navigation.navigate(location);
  };

  const purchaseDetailsRow = (label: string, value: any) => {
    return (
      <View style={styles.purchaseDetailsRow}>
        <View style={styles.purchaseDetailsColumn}>
          <CustomText style={defaultStyles.h6Text}>{label}</CustomText>
        </View>
        <View style={styles.purchaseDetailsColumn}>
          <TouchableOpacity
            style={{ width: "100%", marginLeft: 20 }}
            onPress={() => (label === "Call on" ? makeCall() : "")}
            disabled={label === "Call on" ? false : true}
          >
            <CustomText
              style={{
                ...defaultStyles.small,
                fontFamily: "montserrat-semi-bold",
                color: Colors.primary,
              }}
            >
              {value}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const makeCall = () => {
    let phoneNumber = "9785840004";
    let callingNumber;

    if (Platform.OS === "android") {
      callingNumber = `tel:${phoneNumber}`;
    } else {
      callingNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(callingNumber);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.mainContentContainer}
    >
      <View style={styles.textContainer}>
        <CustomText style={{ ...defaultStyles.h3Text, ...styles.mainText }}>
          ABOUT COFFIC
        </CustomText>
        <CustomText>
          Coffic is an application that allows subscribers to work from creative
          workcafes all over the country. Our aim is to eradicate the cumbersome
          process of monthly rents, travel costs & other operational expenses
          while giving you the perfect opportunity to work from different
          workcafes every day. Upon downloading the application, users can opt
          from daily, weekly or monthly subscriptions and check-in to either of
          our listed workcafes at a convenient time.{" "}
        </CustomText>
      </View>
      <View style={styles.redirectContainer}>
        <SupportOptions redirectTo={redirectTo} />
      </View>
      <View style={styles.contactContainer}>
        <CustomText style={{ ...defaultStyles.h4Text, ...styles.mainText }}>
          CONTACT US
        </CustomText>
        {purchaseDetailsRow("Email at", "hello@coffic.com")}
        {purchaseDetailsRow("Call on", "+91-9785840004")}
        {purchaseDetailsRow("Whatsapp", "+91-9785840004")}
      </View>
    </ScrollView>
  );
};
export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  mainContentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginTop: -40,
    minHeight: "40%",
    alignItems: "center",
    paddingBottom: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  mainText: {
    color: Colors.primary,
    marginBottom: 20,
  },
  redirectContainer: {
    marginTop: -20,
    width: "100%",
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  contactContainer: {
    width: "90%",
    marginTop: 20,
    alignItems: "center",
  },
  purchaseDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  purchaseDetailsColumn: {
    width: "50%",
    alignItems: "flex-start",
  },
});
