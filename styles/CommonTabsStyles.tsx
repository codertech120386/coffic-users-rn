import { StyleSheet } from "react-native";
import defaultStyles, { Colors } from "../AppCss";

export const commonTabStyles = StyleSheet.create({
  tabContainer: {
    width: "80%",
    height: 30,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: 10,
    marginVertical: 20,
    marginLeft: "10%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
  },
  tabText: { marginLeft: 30, fontFamily: "montserrat" },
  normalTab: {
    width: 110,
    height: 30,
    paddingBottom: 10,
  },
  selectedTab: {
    width: 110,
    height: 30,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
  },
  forUsersStyle: {
    ...defaultStyles.h6Text,
    marginLeft: 10,
    fontFamily: "montserrat",
  },
  selectedForUsersStyle: {
    ...defaultStyles.h6Text,
    marginLeft: 10,
    fontFamily: "montserrat-semi-bold",
  },
  selectedForSpacesStyle: {
    ...defaultStyles.h6Text,
    marginLeft: 10,
    fontFamily: "montserrat-semi-bold",
  },
  forSpacesStyle: {
    ...defaultStyles.h6Text,
    marginLeft: 20,
    fontFamily: "montserrat",
  },
});
