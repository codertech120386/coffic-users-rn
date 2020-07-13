import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
} from "native-base";

import { CustomText } from "../../components/ui/CustomText";
import { SIGNUP } from "../../mutations";

import { validateInputs } from "../../helper_functions";

import defaultStyles, { Colors } from "../../AppCss";

export default function RegisterScreen(props: any) {
  const [signUp, {}] = useMutation(SIGNUP);
  const [formValues, setFormValues] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<any>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string>("");

  const showToastBox = (message: string) => {
    setShowToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const onSignupFormSubmitListener = () => {
    const newPhone =
      formValues && formValues.phone && formValues.phone.length === 10
        ? `91${formValues.phone}`
        : formValues.phone;

    const [isValid, errors] = validateInputs(
      {
        name: ["required", "maxLength:50:characters"],
        email: ["required", "email"],
        password: ["required", "minLength:6:characters"],
        phone: ["required", "matchLength:10:digits"],
      },
      formValues
    );

    if (isValid) {
      try {
        signUp({
          variables: { ...formValues, phone: newPhone },
        })
          .then(() => {
            props.navigation.navigate("VerificationMailSent");
          })
          .catch((e) => {
            showToastBox(
              "Please check your email and phone number and try again"
            );
          });
      } catch (e) {
        showToastBox("Something went wrong .. Please try again later");
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
  };

  const onShowPasswordClickListener = () => {
    setShowPassword(!showPassword);
  };

  const checkFormValues = () => {
    return (
      formValues &&
      formValues.name &&
      formValues.email &&
      formValues.phone &&
      formValues.password
    );
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

  return (
    <Container>
      <Content style={styles.container}>
        <Form>
          {/* ----- Name ------ */}
          <Item floatingLabel>
            <Label style={styles.floatingLabel}>Name</Label>
            <Input
              onChangeText={(val) =>
                setFormValues({ ...formValues, name: val })
              }
              onFocus={() => onInputFocusListener("name")}
            />
          </Item>

          {validationErrors &&
            validationErrors["name"] &&
            validationErrors["name"].length > 0 && (
              <Text
                style={{
                  ...defaultStyles.danger,
                  ...defaultStyles.dangerItalic,
                  ...styles.errorText,
                }}
              >
                {validationErrors["name"].join(" and ")}
              </Text>
            )}

          {/* ----- Email ------ */}
          <Item floatingLabel last>
            <Label style={styles.floatingLabel}>Email</Label>
            <Input
              keyboardType="email-address"
              onChangeText={(val) =>
                setFormValues({ ...formValues, email: val })
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
                  ...styles.errorText,
                }}
              >
                {validationErrors["email"].join(" and ")}
              </Text>
            )}

          {/* ----- Password ------ */}
          <Item floatingLabel last>
            <Label style={styles.floatingLabel}>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(val) =>
                setFormValues({ ...formValues, password: val })
              }
              onFocus={() => onInputFocusListener("password")}
            />
          </Item>

          {validationErrors &&
            validationErrors["password"] &&
            validationErrors["password"].length > 0 && (
              <Text
                style={{
                  ...defaultStyles.danger,
                  ...defaultStyles.dangerItalic,
                  ...styles.errorText,
                }}
              >
                {validationErrors["password"].join(" and ")}
              </Text>
            )}

          {/* ----- Phone Number ------ */}
          <Item floatingLabel last>
            <Label style={styles.floatingLabel}>Phone Number</Label>
            <Input
              keyboardType="phone-pad"
              onChangeText={(val) =>
                setFormValues({ ...formValues, phone: val })
              }
              onFocus={() => onInputFocusListener("phone")}
            />
          </Item>

          {validationErrors &&
            validationErrors["phone"] &&
            validationErrors["phone"].length > 0 && (
              <Text
                style={{
                  ...defaultStyles.danger,
                  ...defaultStyles.dangerItalic,
                  ...styles.errorText,
                }}
              >
                {validationErrors["phone"].join(" and ")}
              </Text>
            )}
        </Form>
        <Button
          small
          style={{ ...styles.registerButtonContainer, ...checkDisabled() }}
          onPress={onSignupFormSubmitListener}
          disabled={!checkFormValues()}
        >
          <CustomText style={styles.registerButtonText}>Register</CustomText>
        </Button>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <CustomText>
            Already have an account?{" "}
            <Text style={defaultStyles.link}>Log in</Text>
          </CustomText>
        </View>
        {showToast && (
          <View style={styles.toast}>
            <Text>{toastMessage}</Text>
          </View>
        )}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  floatingLabel: {
    fontFamily: "montserrat",
  },
  registerButtonContainer: {
    maxWidth: "60%",
    marginTop: 40,
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: "20%",
  },
  registerButtonText: {
    fontFamily: "montserrat-bold",
    color: "white",
    textAlign: "center",
    paddingLeft: "30%",
    fontSize: 17,
  },
  errorText: {
    fontSize: 14,
  },
  toast: {
    backgroundColor: "yellow",
    marginTop: "30%",
    padding: 10,
  },
});
