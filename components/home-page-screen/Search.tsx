import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

import { SearchPageCofficLogo } from "../../icons";
import { SearchTermContext } from "../../context/SearchTermContext";
import { Colors } from "../../AppCss";

const Search = (props: any) => {
  const [search, setSearch] = useState<string>("Hyderabad");
  const searchTermContext = useContext(SearchTermContext);

  const onSearchInputChangeListener = (text: string) => {
    setSearch(text);
    setTimeout(() => {
      searchTermContext.changeSearchTerm(text);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <SearchPageCofficLogo />
      </View>
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          borderColor: "#ccc",
          borderWidth: 1,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="ios-search" size={24} color="#ccc" />
        </View>
        <TextInput
          style={{ height: 40, flex: 5 }}
          onChangeText={(text) => onSearchInputChangeListener(text)}
          value={search}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Feather
            name="x"
            size={24}
            color="#ccc"
            onPress={() => setSearch("")}
          />
        </View>
      </View>
    </View>
  );
};
export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingTop: 40,
    paddingBottom: 30,
  },
});
