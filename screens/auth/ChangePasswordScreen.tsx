import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Icon,
} from "native-base";

import { CHANGE_PASSWORD } from "../../mutations";

import { validateInputs } from "../../helper_functions";

import defaultStyles, { Colors } from "../../AppCss";
import { commonAuthStyles } from "../../styles/CommonAuthStyles";

export default function ChangePasswordScreen(props: any) {
  const [changePassword, {}] = useMutation(CHANGE_PASSWORD);

  const [formValues, setFormValues] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<any>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  const onChangePasswordFormSubmitListener = async () => {
    const [isValid, errors] = validateInputs(
      {
        password: ["required", "minLength:6:characters"],
      },
      formValues
    );

    if (isValid) {
      const code =
        props && props.route && props.route.params && props.route.params.code;
      try {
        changePassword({
          variables: { ...formValues, code },
        })
          .then(() => {
            showToastBox("Your Password has been successfully reset .. ");
            setTimeout(() => {
              props.navigation.navigate("Login");
            }, 3000);
          })
          .catch((e) => {
            showToastBox("Please enter a minimum 6 character password");
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

  const onShowPasswordClickListener = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <Content style={commonAuthStyles.container}>
        <Form>
          {/* ----- Password ------ */}
          <Item floatingLabel last>
            <Label
              style={
                focussedItem === "password"
                  ? { ...commonAuthStyles.floatingLabel, color: Colors.primary }
                  : commonAuthStyles.floatingLabel
              }
            >
              Password
            </Label>
            <Input
              secureTextEntry={showPassword ? false : true}
              onChangeText={(val) =>
                setFormValues({ ...formValues, password: val })
              }
              onFocus={() => onInputFocusListener("password")}
            />
            {showPassword ? (
              <Icon
                name={"eye-off-outline"}
                onPress={onShowPasswordClickListener}
              />
            ) : (
              <Icon
                name={"eye-outline"}
                type="MaterialCommunityIcons"
                onPress={onShowPasswordClickListener}
              />
            )}
          </Item>

          {validationErrors &&
            validationErrors["password"] &&
            validationErrors["password"].length > 0 && (
              <Text
                style={{
                  ...defaultStyles.danger,
                  ...defaultStyles.dangerItalic,
                  ...commonAuthStyles.errorText,
                }}
              >
                {validationErrors["password"].join(" and ")}
              </Text>
            )}
        </Form>

        {/* ----- Form Submit Button ------ */}
        <TouchableOpacity
          onPress={onChangePasswordFormSubmitListener}
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
