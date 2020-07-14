import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { CustomText } from "../../components/ui/CustomText";
import defaultStyles from "../../AppCss";
import { SignedUpThumbsUp } from "../../icons";

export default function VerificationMailSentScreen() {
  return (
    <View style={styles.container}>
      {/* <SignedUpThumbsUp /> */}
      <CustomText style={{ ...defaultStyles.h2Text, ...styles.h2Text }}>
        Email Verification mail sent
      </CustomText>

      <CustomText style={{ ...defaultStyles.h5Text, ...styles.h5Text }}>
        Verification Email has been sent on your ID . Please click to link to
        verify . If done please wait it might take few seconds .
      </CustomText>

      {/* Pending the resend implementation */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  h2Text: {
    marginTop: 15,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  h5Text: {
    paddingHorizontal: 20,
  },
});
