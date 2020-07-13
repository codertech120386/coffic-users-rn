import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Icon,
} from "native-base";

import { LOGIN } from "../../mutations";
import { validateInputs } from "../../helper_functions";
import { AuthContext } from "../../context/AuthContext";
import { CustomText } from "../../components/ui/CustomText";

import defaultStyles, { Colors } from "../../AppCss";

export default function LoginScreen(props: any) {
  const [login, {}] = useMutation(LOGIN);
  const [formValues, setFormValues] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<any>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const authContext = useContext(AuthContext);

  const checkFormValues = () => {
    return formValues && formValues.email && formValues.password;
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

  const onLoginFormSubmitListener = () => {
    const newPhone =
      formValues && formValues.phone && formValues.phone.length === 10
        ? `91${formValues.phone}`
        : formValues.phone;
    setFormValues({ ...formValues, phone: newPhone });
    const [isValid, errors] = validateInputs(
      {
        email: ["required", "email"],
        password: ["required", "minLength:6:characters"],
      },
      formValues
    );

    if (isValid) {
      try {
        console.log("form", { ...formValues, phone: newPhone });
        login({
          variables: { ...formValues, phone: newPhone },
        })
          .then((result) => {
            authContext.changeCofficToken(result.data.login.token);

            if (result.data.login.email_verified_at) {
              authContext.changeIsEmailVerified(true);

              console.log("here");
            } else {
              props.navigation.navigate("VerificationMailSent");
              // history.push({
              //   pathname: "/verification-mail-sent",
              //   state: { data: { isLoggedIn: true } },
              // });
            }
          })
          .catch((e) => {
            console.log("catch 1", e);
            showToastBox("Please check your email and password and try again");
          });
      } catch (e) {
        console.log("catch 2", e);
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

  return (
    <Container>
      <Content style={styles.container}>
        <Form>
          {/* ----- Email ------ */}
          <Item floatingLabel last>
            <Label style={styles.floatingLabel}>Email</Label>
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
                  ...styles.errorText,
                }}
              >
                {validationErrors["password"].join(" and ")}
              </Text>
            )}
        </Form>

        {/* ----- Form Submit Button ------ */}
        <TouchableOpacity
          onPress={onLoginFormSubmitListener}
          disabled={!checkFormValues()}
        >
          <View style={{ ...styles.loginButtonContainer, ...checkDisabled() }}>
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </TouchableOpacity>

        {/* <Button
          small
          style={{ ...styles.loginButtonContainer, ...checkDisabled() }}
          onPress={onLoginFormSubmitListener}
          disabled={!checkFormValues()}
        >
          <CustomText style={styles.loginButtonText}>Login</CustomText>
        </Button> */}
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
  loginButtonContainer: {
    maxWidth: "50%",
    marginTop: 40,
    paddingVertical: 10,
    marginLeft: "25%",
    borderRadius: 8,
  },
  loginButtonText: {
    fontFamily: "montserrat-bold",
    color: "white",
    textAlign: "center",
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
