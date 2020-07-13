import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import { AppNavigator } from "./navigation/AppNavigator";
import { getUrl } from "./config";
import AuthContextProvider from "./context/AuthContext";

const fetchFonts = () => {
  return Font.loadAsync({
    montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-italic": require("./assets/fonts/Montserrat-Italic.ttf"),
    "montserrat-bold-italic": require("./assets/fonts/Montserrat-BoldItalic.ttf"),
  });
};

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${getUrl()}/graphql`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "text/plain",
  },
  fetchOptions: {
    mode: "cors",
  },
});

const client = new ApolloClient({
  link,
  cache,
});

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

  return (
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </AuthContextProvider>
  );
}
