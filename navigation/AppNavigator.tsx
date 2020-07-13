import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigator } from "./CofficNavigator";

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};
