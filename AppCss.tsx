import { StyleSheet } from "react-native";

export const Colors = {
  primary: "#61C6BB",
  danger: "red",
  disabled: "#B6B6B6",
};

const defaultStyles = StyleSheet.create({
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
    fontFamily: "montserrat-italic",
  },
  h2Text: {
    fontSize: 20,
  },
  h3Text: {
    fontSize: 18,
  },
  h4Text: {
    fontSize: 17,
  },
  h5Text: {
    fontSize: 16,
  },
  h6Text: {
    fontSize: 15,
  },
  small: {
    fontSize: 13,
  },
});

export default defaultStyles;
