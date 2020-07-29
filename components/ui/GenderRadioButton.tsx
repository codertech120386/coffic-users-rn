import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../AppCss";

const GenderRadioButton = ({ isSelectedProp, item, radioChanged }: any) => {
  const toggleSelected = () => {
    radioChanged(item);
  };

  return (
    <View style={styles.container}>
      {item === isSelectedProp ? (
        <Ionicons
          name="ios-radio-button-on"
          size={24}
          color={Colors.primary}
          onPress={toggleSelected}
        />
      ) : (
        <Ionicons
          name="ios-radio-button-off"
          size={24}
          color={Colors.primary}
          onPress={toggleSelected}
        />
      )}
    </View>
  );
};
export default GenderRadioButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
