import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/react-hooks";

import { SIGNUP } from "../../mutations";

import { password } from "../../constants";
import { Container, Content, Form, Item, Label, Input } from "native-base";
import defaultStyles, { Colors } from "../../AppCss";
import { commonAuthStyles } from "../../styles/CommonAuthStyles";

export default function AuthPhoneScreen(props: any) {
  const [signUp, {}] = useMutation(SIGNUP);
  const params = props && props.route && props.route.params;

  const [email, setEmail] = useState<string>(params && params.email);
  const [name, setName] = useState<string>(
    `${params && params.givenName} ${params && params.familyName}`
  );

  console.log("email name", email, name);
  const [phone, setPhone] = useState<string>("");
  const [isPhoneError, setIsPhoneError] = useState<boolean>(false);
  const [phoneErrorText, setPhoneErrorText] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const showToastBox = (message: string) => {
    setShowToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const onPhoneSubmitListener = () => {
    const newPhone = phone.length === 10 ? `91${phone}` : phone;
    setPhone(newPhone);
    validateInputs(newPhone);

    if (validateInputs(newPhone)) {
      const apiData = {
        name,
        email,
        phone: newPhone,
        password,
      };

      try {
        signUp({
          variables: apiData,
        })
          .then(() => {
            props.navigation.navigate("VerificationMailSent");
          })
          .catch((e) => {
            showToastBox("Please check the details entered and try again");
          });
      } catch (e) {
        showToastBox("Something went wrong .. Please try again later");
      }
    } else {
      setIsPhoneError(true);
      return false;
    }
  };

  const onPhoneNumberChangeListener = (e) => {
    setPhone(e.detail.value);
  };

  const onPhoneNumberFocusListener = () => {
    setIsPhoneError(false);
    setPhoneErrorText([]);
  };

  const validateInputs = (phone: string) => {
    if (!(phone.trim().length === 12)) {
      setPhoneErrorText(["Please enter a 10 digit phone number"]);
      return false;
    }
    return true;
  };

  const termsClicked = () => {};
  const privacyPolicyClicked = () => {};

  const checkDisabled = () => {
    if (phone.length > 0) {
      return {
        backgroundColor: Colors.primary,
        color: "white",
      };
    }
    return defaultStyles.disabled;
  };

  return (
    <Container>
      <Content style={commonAuthStyles.container}>
        <Form>
          {/* ----- Phone Number ------ */}
          <Item floatingLabel last>
            <Label style={commonAuthStyles.floatingLabel}>Phone Number</Label>
            <Input
              keyboardType="phone-pad"
              onChangeText={(val: string) => setPhone(val)}
              onFocus={() => onPhoneNumberFocusListener()}
            />
          </Item>

          {isPhoneError && (
            <Text
              style={{
                ...defaultStyles.danger,
                ...defaultStyles.dangerItalic,
                ...commonAuthStyles.errorText,
              }}
            >
              {phoneErrorText}
            </Text>
          )}
        </Form>

        {/* ----- Form Submit Button ------ */}
        <TouchableOpacity
          onPress={onPhoneSubmitListener}
          disabled={phone.length === 0}
        >
          <View
            style={{
              ...commonAuthStyles.registerButtonContainer,
              ...checkDisabled(),
            }}
          >
            <Text style={commonAuthStyles.registerButtonText}>Register</Text>
          </View>
        </TouchableOpacity>

        {/* ----- Terms and Privacy ------ */}
        <View style={styles.authFooter}>
          <Text>
            By continuing you agree to our{" "}
            <Text onPress={termsClicked} style={defaultStyles.link}>
              Terms of services
            </Text>{" "}
            &{" "}
            <Text onPress={privacyPolicyClicked} style={defaultStyles.link}>
              {" "}
              Privacy policy
            </Text>
          </Text>
        </View>

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

const styles = StyleSheet.create({
  authFooter: {
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
});
