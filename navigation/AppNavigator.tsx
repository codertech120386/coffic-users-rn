import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { FinalNavigator } from "./CofficNavigator";

export const AppNavigator = (props: any) => {
  return (
    <NavigationContainer>
      <FinalNavigator />
    </NavigationContainer>
  );
};
