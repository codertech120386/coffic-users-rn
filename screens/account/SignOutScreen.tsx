import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { AuthContext } from "../../context/AuthContext";
import { removeItem } from "../../helper_functions";

const SignoutScreen = (props: any) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    try {
      const removeStorageData = async () => {
        authContext.removeCofficToken();
        authContext.changeIsEmailVerified(false);
        await removeItem("cofficToken");
        await removeItem("isEmailVerified");
        props.navigation.navigate("Auth");
      };
      removeStorageData();
    } catch (e) {
      console.log("signout e", e);
    }
  }, [authContext, props]);

  return (
    <View style={styles.container}>
      <Text>SignoutScreen</Text>
    </View>
  );
};
export default SignoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
