import { StyleSheet } from "react-native";
import { FONTSTYLES } from "./constants";

export const Colors = {
  primary: "#61C6BB",
  danger: "red",
  disabled: "#B6B6B6",
};

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  textCenter: {
    textAlign: "center",
  },
  link: {
    color: "blue",
  },
  danger: {
    color: Colors.danger,
  },
  disabled: {
    backgroundColor: Colors.disabled,
    color: "white",
  },
  dangerItalic: {
    fontFamily: FONTSTYLES.italic,
  },
  h2Text: {
    fontSize: 20,
  },
  h3Text: {
    fontFamily: FONTSTYLES.bold,
    fontSize: 18,
  },
  h4Text: {
    fontFamily: FONTSTYLES.bold,
    fontSize: 17,
  },
  h5Text: {
    fontFamily: FONTSTYLES.semiBold,
    fontSize: 16,
  },
  h6Text: {
    fontFamily: FONTSTYLES.semiBold,
    fontSize: 15,
  },
  small: {
    fontFamily: FONTSTYLES.normal,
    fontSize: 13,
  },
  littleSmall: {
    fontFamily: FONTSTYLES.normal,
    fontSize: 12,
  },
  extraSmall: {
    fontFamily: FONTSTYLES.normal,
    fontSize: 11,
  },
});

export default defaultStyles;
