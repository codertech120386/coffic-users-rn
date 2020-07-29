import { StyleSheet } from "react-native";
import defaultStyles, { Colors } from "../AppCss";

export const commonAuthStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  floatingLabel: {
    ...defaultStyles.littleSmall,
    fontFamily: "montserrat-semi-bold",
    marginBottom: 5,
  },
  registerButtonContainer: {
    maxWidth: "50%",
    marginTop: 40,
    paddingVertical: 10,
    marginLeft: "25%",
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  registerButtonText: {
    fontFamily: "montserrat-bold",
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
  errorText: {
    fontSize: 14,
  },
  toast: {
    backgroundColor: "yellow",
    marginTop: "30%",
    padding: 10,
  },
});
