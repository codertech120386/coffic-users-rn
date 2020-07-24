import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import defaultStyles, { Colors } from "../../AppCss";
import { CustomText } from "../ui/CustomText";

const SupportOptions = (props: any) => {
  const options = ["Reset Password", "FAQ", "Terms", "Privacy Policy"];
  const redirects = [
    "ResetPassword",
    "Faq",
    "TermsAndConditions",
    "PrivacyPolicy",
  ];

  return (
    <View style={styles.container}>
      {options.map((option, i) => (
        <View style={styles.redirectContainer} key={i}>
          <CustomText style={defaultStyles.h6Text}>{option}</CustomText>
          <View style={{ alignItems: "center" }}>
            <CustomText onPress={() => props.redirectTo(redirects[i])}>
              <Ionicons
                name="ios-arrow-forward"
                size={23}
                color={Colors.primary}
              />
            </CustomText>
          </View>
        </View>
      ))}
    </View>
  );
};
export default SupportOptions;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  redirectContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
