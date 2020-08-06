import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import defaultStyles, { Colors } from "../../AppCss";
import { CustomText } from "./CustomText";
import { FONTSTYLES } from "../../constants";

const Chip = ({ item, onCloseListener, stylesProp }: any) => {
  return (
    <View style={{ ...styles.container, ...stylesProp }}>
      <CustomText
        style={{
          ...defaultStyles.small,
          color: "white",
          fontFamily: FONTSTYLES.semiBold,
        }}
      >
        {item}
      </CustomText>
      <View style={{ marginLeft: 5 }}>
        <Feather
          name="x"
          size={20}
          color="white"
          onPress={() => onCloseListener(item)}
        />
      </View>
    </View>
  );
};
export default Chip;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.primary,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
  },
});
