import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../AppCss";

interface IRadioButtonProps {
  isSelectedProp: string | number;
  item: string | number;
  radioChanged: any;
}

const DurationRadioButton = ({
  isSelectedProp,
  item,
  radioChanged,
}: IRadioButtonProps) => {
  const toggleSelected = () => {
    radioChanged(item, "duration");
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
export default DurationRadioButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
