import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PurchaseCard from "./PurchaseCard";

import { IPurchasesListProps } from "../../ts-types";
import { FlatList } from "react-native-gesture-handler";

const PurchasesList = (props: IPurchasesListProps) => {
  const renderPurchase = ({ item }: any) => {
    return (
      <PurchaseCard
        purchase={item}
        key={item.id}
        redirectToPurchaseDetail={props.redirectToPurchaseDetail}
      />
    );
  };
  return (
    <FlatList
      style={styles.container}
      data={props && props.purchases}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={renderPurchase}
    />
  );
};
export default PurchasesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
