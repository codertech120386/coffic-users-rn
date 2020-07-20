import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RecentSearchesScreen = (props: any) => (
  <View style={styles.container}>
    <Text>RecentSearchesScreen</Text>
  </View>
);
export default RecentSearchesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
