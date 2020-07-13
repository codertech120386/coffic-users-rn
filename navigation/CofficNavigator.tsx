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
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={{ title: "Getting Started", headerTitleAlign: "center" }}
      />
      <AuthStackNavigator.Screen
        name="AuthPhone"
        component={AuthPhoneScreen}
        options={{ title: "Add Phone Number", headerTitleAlign: "center" }}
      />
      <AuthStackNavigator.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: "Change your password", headerTitleAlign: "center" }}
      />
      <AuthStackNavigator.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: "Forgot password", headerTitleAlign: "center" }}
      />
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login", headerTitleAlign: "center" }}
      />
      <AuthStackNavigator.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Sign up to continue", headerTitleAlign: "center" }}
      />
      <AuthStackNavigator.Screen
        name="VerificationMailSent"
        component={VerificationMailSentScreen}
        options={{
          title: "Verification mail sent",
          headerTitleAlign: "center",
        }}
      />
      <AuthStackNavigator.Screen
        name="VerifyMail"
        component={VerifyMailScreen}
        options={{ title: "Verify your email", headerTitleAlign: "center" }}
      />
    </AuthStackNavigator.Navigator>
  );
};
