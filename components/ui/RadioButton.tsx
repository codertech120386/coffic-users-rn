import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../AppCss";

const RadioButton = ({ isSelectedProp, plan, radioChanged }: any) => {
  const planDuration = `${plan.id}-${plan.duration}`;

  const toggleSelected = () => {
    radioChanged(plan);
  };

  return (
    <View style={styles.container}>
      {planDuration === isSelectedProp ? (
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
export default RadioButton;

const styles = StyleSheet.create({
  container: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
});
