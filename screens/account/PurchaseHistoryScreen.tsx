import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { USER_PAYMENTS } from "../../queries";
import PurchasesList from "../../components/purchase-history-screen/PurchasesList";
import NoPurchases from "../../components/purchase-history-screen/NoPurchases";

const PurchaseHistoryScreen = (props: any) => {
  const { loading, error, data } = useQuery(USER_PAYMENTS);

  const redirectToPurchaseDetail = (id: number) => {
    props.navigation.navigate("PurchaseDetails", {
      id,
    });
  };

  return (
    <View style={styles.container}>
      {data && data.userPayments && data.userPayments.length ? (
        <PurchasesList
          purchases={data && data.userPayments}
          redirectToPurchaseDetail={redirectToPurchaseDetail}
        />
      ) : (
        <NoPurchases />
      )}
    </View>
  );
};
export default PurchaseHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
