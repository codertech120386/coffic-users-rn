import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CustomText } from "../ui/CustomText";
import { IFAQCardProps } from "../../ts-types";
import defaultStyles, { Colors } from "../../AppCss";

const FAQCard = (props: IFAQCardProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const { faq } = props;

  return (
    <View style={styles.container}>
      {faq && (
        <View style={styles.FaqCardContainer}>
          <View style={styles.questionContainer}>
            <CustomText
              style={{
                ...defaultStyles.h6Text,
                ...styles.questionText,
              }}
            >
              {faq.question}
            </CustomText>
            {showAnswer ? (
              <Ionicons
                name="ios-arrow-down"
                size={23}
                color={Colors.primary}
                onPress={() => setShowAnswer(false)}
              />
            ) : (
              <Ionicons
                name="ios-arrow-forward"
                size={23}
                color={Colors.primary}
                onPress={() => setShowAnswer(true)}
              />
            )}
          </View>
          {showAnswer && (
            <CustomText
              style={{ ...defaultStyles.small, ...styles.answerText }}
            >
              {faq.answer}
            </CustomText>
          )}
        </View>
      )}
    </View>
  );
};
export default FAQCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  FaqCardContainer: {
    width: "90%",
    marginBottom: 10,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  questionText: {
    width: "90%",
    fontFamily: "montserrat-semi-bold",
  },
  answerText: {
    marginVertical: 10,
  },
});
