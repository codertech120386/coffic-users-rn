import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { AppNavigator } from "./navigation/AppNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
};

export default function App() {
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  if (!isDataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsDataLoaded(true)}
      />
    );
  }

  return <AppNavigator />;
}
