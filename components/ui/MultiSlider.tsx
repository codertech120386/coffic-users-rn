import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { CustomText } from "./CustomText";
import { Colors } from "../../AppCss";

const Slider = ({ onRangeListener, lower, upper, step, type }: any) => {
  const [multiSliderValue, setMultiSliderValue] = React.useState([
    lower,
    upper,
  ]);

  const multiSliderValuesChange = (values: any) => {
    setMultiSliderValue(values);
    onRangeListener({ lower: values[0], upper: values[1] }, type);
  };

  return (
    <View style={styles.container}>
      <MultiSlider
        values={[multiSliderValue[0], multiSliderValue[1]]}
        sliderLength={175}
        onValuesChange={multiSliderValuesChange}
        min={lower}
        max={upper}
        step={step}
        isMarkersSeparated={true}
        trackStyle={styles.trackStyle}
        selectedStyle={{ backgroundColor: Colors.primary }}
        markerStyle={{ backgroundColor: Colors.primary }}
        pressedMarkerStyle={{ backgroundColor: "white" }}
      />
    </View>
  );
};
export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  trackStyle: {
    backgroundColor: Colors.primary,
  },
});
