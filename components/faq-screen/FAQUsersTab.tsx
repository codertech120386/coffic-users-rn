import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { GET_USER_FAQs } from "../../queries";

import FAQCard from "./FAQCard";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";

const FAQUsersTab = (props: any) => {
  const { loading, error, data } = useQuery(GET_USER_FAQs);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <CustomText
        style={{
          ...defaultStyles.small,
          ...styles.titleText,
        }}
      >
        RECOMMENDED TOPICS
      </CustomText>
      {data &&
        data.userFaqs &&
        data.userFaqs.recommended_faqs &&
        data.userFaqs.recommended_faqs.map((faq: any) => (
          <FAQCard faq={faq} key={faq.id} />
        ))}
      <CustomText
        style={{
          ...defaultStyles.small,
          marginTop: 30,
          ...styles.titleText,
        }}
      >
        OTHER TOPICS
      </CustomText>
      {data &&
        data.userFaqs &&
        data.userFaqs.normal_faqs &&
        data.userFaqs.normal_faqs.map((faq: any) => (
          <FAQCard faq={faq} key={faq.id} />
        ))}
    </ScrollView>
  );
};
export default FAQUsersTab;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  contentContainer: { alignItems: "flex-start" },
  titleText: {
    marginBottom: 25,
    color: Colors.primary,
    fontFamily: "montserrat-bold",
    marginLeft: "25%",
  },
});
