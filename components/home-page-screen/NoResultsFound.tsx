import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";

const NoResultsFound = ({ buttonClicked }: any) => {
  return (
    <View style={styles.container}>
      <CustomText style={defaultStyles.h2Text}>No Results found</CustomText>

      {/* ----- Explore Button ------ */}
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            width: "50%",
          }}
        >
          <CustomText
            onPress={buttonClicked}
            style={{
              ...defaultStyles.h6Text,
              paddingHorizontal: 25,
              paddingVertical: 10,
              color: "white",
              textAlign: "center",
            }}
          >
            Explore
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default NoResultsFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
