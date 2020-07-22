import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CheckinCard from "./CheckinCard";
import { ICheckinListProps } from "../../ts-types";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { commonAuthStyles } from "../../styles/CommonAuthStyles";

const CheckinList = (props: ICheckinListProps) => {
  return (
    <ScrollView style={styles.container}>
      {props.userCheckinHistory &&
        props.userCheckinHistory.map((data: any, i: number) => {
          if (props.showLimited) {
            if (i < 3) return <CheckinCard key={i} data={data} />;
          } else {
            return <CheckinCard key={i} data={data} />;
          }
        })}
      {props.userCheckinHistory &&
      props.userCheckinHistory.length > 3 &&
      props.showLimited ? (
        <TouchableOpacity onPress={props.onViewAllClicked}>
          <View style={commonAuthStyles.registerButtonContainer}>
            <Text style={commonAuthStyles.registerButtonText}>View All</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
};
export default CheckinList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  forwardIconContainer: {
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    width: 15,
  },
});
