import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { GET_SPACE_FAQs } from "../../queries";

import FAQCard from "./FAQCard";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";

const FAQSpacesTab = (props: any) => {
  const { loading, error, data } = useQuery(GET_SPACE_FAQs);

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
        data.spaceFaqs &&
        data.spaceFaqs.recommended_faqs &&
        data.spaceFaqs.recommended_faqs.map((faq: any) => (
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
        data.spaceFaqs &&
        data.spaceFaqs.normal_faqs &&
        data.spaceFaqs.normal_faqs.map((faq: any) => (
          <FAQCard faq={faq} key={faq.id} />
        ))}
    </ScrollView>
  );
};
export default FAQSpacesTab;

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
