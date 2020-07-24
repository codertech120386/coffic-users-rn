import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import FAQPageTabs from "../../components/faq-screen/FAQPageTabs";
import FAQUsersTab from "../../components/faq-screen/FAQUsersTab";
import FAQSpacesTab from "../../components/faq-screen/FAQSpacesTab";

const FaqScreen = (props: any) => {
  const [selectedTab, setSelectedTab] = useState<string>("for spaces");

  const onTabChange = (tabSelected: string) => {
    setSelectedTab(tabSelected);
  };

  return (
    <View style={styles.container}>
      <FAQPageTabs onTabChange={onTabChange} selectedTab={selectedTab} />
      {selectedTab === "for users" && <FAQUsersTab />}
      {selectedTab === "for spaces" && <FAQSpacesTab />}
    </View>
  );
};
export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
