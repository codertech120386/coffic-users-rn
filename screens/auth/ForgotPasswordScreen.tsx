import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { Container, Content, Form, Item, Label, Input } from "native-base";

import { FORGOT_PASSWORD } from "../../mutations";

import { validateInputs } from "../../helper_functions";

import defaultStyles, { Colors } from "../../AppCss";
import { commonAuthStyles } from "../../styles/CommonAuthStyles";

export default function ForgotPasswordScreen(props: any) {
  const [forgotPassword, {}] = useMutation(FORGOT_PASSWORD);

  const [formValues, setFormValues] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<any>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [focussedItem, setFocussedItem] = useState<string | null>(null);

  const checkFormValues = () => {
    return formValues && formValues.email;
  };

  const checkDisabled = () => {
    if (checkFormValues()) {
      return {
        backgroundColor: Colors.primary,
        color: "white",
      };
    }
    return defaultStyles.disabled;
  };

  const showToastBox = (message: string) => {
    setShowToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const onEmailFormSubmitListener = async () => {
    const [isValid, errors] = validateInputs(
      {
        email: ["required", "email"],
      },
      formValues
    );

    if (isValid) {
      try {
        forgotPassword({
          variables: formValues,
        })
          .then(() => {
            showToastBox("Reset Email sent to your email address .. ");
            setTimeout(() => {
              props.navigation.navigate("Auth");
            }, 3000);
          })
          .catch((e) => {
            showToastBox("Please check your email and try again");
          });
      } catch (e) {
        showToastBox("Something went wrong .. Please try again later");
        return;
      }
    } else {
      setValidationErrors(errors);
      return false;
    }
  };

  const onInputFocusListener = (field: string) => {
    const oldErrors: any = { ...validationErrors };
    delete oldErrors[field];
    setValidationErrors(oldErrors);
    setFocussedItem(field);
  };

  return (
    <Container>
      <Content style={commonAuthStyles.container}>
        <Form>
          {/* ----- Email ------ */}
          <Item floatingLabel last>
            <Label
              style={
                focussedItem === "email"
                  ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                  : commonAuthStyles.floatingLabel
              }
            >
              Email
            </Label>
            <Input
              keyboardType="email-address"
              onChangeText={(val) =>
                setFormValues({ ...formValues, email: val.toLowerCase() })
              }
              onFocus={() => onInputFocusListener("email")}
            />
          </Item>

          {validationErrors &&
            validationErrors["email"] &&
            validationErrors["email"].length > 0 && (
              <Text
                style={{
                  ...defaultStyles.danger,
                  ...defaultStyles.dangerItalic,
                  ...commonAuthStyles.errorText,
                }}
              >
                {validationErrors["email"].join(" and ")}
              </Text>
            )}
        </Form>

        {/* ----- Form Submit Button ------ */}
        <TouchableOpacity
          onPress={onEmailFormSubmitListener}
          disabled={!checkFormValues()}
        >
          <View
            style={{
              ...commonAuthStyles.registerButtonContainer,
              ...checkDisabled(),
            }}
          >
            <Text style={commonAuthStyles.registerButtonText}>Submit</Text>
          </View>
        </TouchableOpacity>

        {/* ----- Error Toast Messages ------ */}
        {showToast && (
          <View style={commonAuthStyles.toast}>
            <Text>{toastMessage}</Text>
          </View>
        )}
      </Content>
    </Container>
  );
}
