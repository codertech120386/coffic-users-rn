import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { ApolloClient, InMemoryCache, from } from "apollo-client-preset";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import { AppNavigator } from "./navigation/AppNavigator";
import AuthContextProvider from "./context/AuthContext";

import { getUrl } from "./config";
import { getItem } from "./helper_functions";

const getToken = async () => {
  const token = await getItem("cofficToken");
  return token;
};

const authMiddleware = setContext((operation) =>
  getToken().then((token) => {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "text/plain",
        authorization: `Bearer ${token}` || null,
      },
      fetchOptions: {
        mode: "cors",
      },
    };
  })
);

const fetchFonts = () => {
  return Font.loadAsync({
    montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-italic": require("./assets/fonts/Montserrat-Italic.ttf"),
    "montserrat-bold-italic": require("./assets/fonts/Montserrat-BoldItalic.ttf"),
  });
};

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: `${getUrl()}/graphql`,
});

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
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
