import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";

import defaultStyles, { Colors } from "../../AppCss";
import { CustomText } from "./CustomText";
import { ICheckboxProps } from "../../ts-types";

const Checkbox = ({
  isChecked,
  text,
  value,
  type,
  checkboxChangedListener,
}: ICheckboxProps) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(isChecked);

  const onCheckboxChanged = () => {
    setToggleCheckBox(!toggleCheckBox);
    checkboxChangedListener(!toggleCheckBox, value, type);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onCheckboxChanged}
        style={styles.checkBoxContainer}
      >
        {toggleCheckBox ? (
          <Fontisto name="checkbox-active" size={24} color={Colors.primary} />
        ) : (
          <Fontisto name="checkbox-passive" size={24} color={Colors.primary} />
        )}

        <CustomText style={{ ...defaultStyles.small, marginLeft: 20 }}>
          {text}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
export default Checkbox;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    marginLeft: "10%",
    borderBottomColor: "#ccc",
    borderEndWidth: 1,
  },
  checkBoxContainer: {
    flexDirection: "row",
    paddingVertical: 5,
  },
});
