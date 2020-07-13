import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/auth/AuthScreen";
import AuthPhoneScreen from "../screens/auth/AuthPhoneScreen";
import ChangePasswordScreen from "../screens/auth/ChangePasswordScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import VerificationMailSentScreen from "../screens/auth/VerificationMailSentScreen";
import VerifyMailScreen from "../screens/auth/VerifyMailScreen";

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} />
      <AuthStackNavigator.Screen name="AuthPhone" component={AuthPhoneScreen} />
      <AuthStackNavigator.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <AuthStackNavigator.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStackNavigator.Screen name="Login" component={LoginScreen} />
      <AuthStackNavigator.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Sign up to continue" }}
      />
      <AuthStackNavigator.Screen
        name="VerificationMailSent"
        component={VerificationMailSentScreen}
      />
      <AuthStackNavigator.Screen
        name="VerifyMail"
        component={VerifyMailScreen}
      />
    </AuthStackNavigator.Navigator>
  );
};
