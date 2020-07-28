import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AuthScreen from "../screens/auth/AuthScreen";
import AuthPhoneScreen from "../screens/auth/AuthPhoneScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import VerificationMailSentScreen from "../screens/auth/VerificationMailSentScreen";
import VerifyMailScreen from "../screens/auth/VerifyMailScreen";
import ChangePasswordScreen from "../screens/auth/ChangePasswordScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import HomeScreen from "../screens/home/HomeScreen";
import AccountScreen from "../screens/account/AccountScreen";
import MySpacesScreen from "../screens/my-spaces/MySpacesScreen";

import { AuthContext } from "../context/AuthContext";
import MyProfileScreen from "../screens/account/MyProfileScreen";
import RecentSearchesScreen from "../screens/account/RecentSearches";
import CheckinHistoryScreen from "../screens/account/CheckinHistoryScreen";
import CheckinMonthlyListScreen from "../screens/account/CheckinMonthlyListScreen";
import PurchaseHistoryScreen from "../screens/account/PurchaseHistoryScreen";
import PurchaseDetailsScreen from "../screens/account/PurchaseDetailsScreen";
import SupportScreen from "../screens/account/SupportScreen";
import FaqScreen from "../screens/account/FaqScreen";
import CouponCodesScreen from "../screens/account/CouponCodesScreen";
import SignoutScreen from "../screens/account/SignOutScreen";
import MySpacesSubscriptionDetails from "../screens/my-spaces/MySpacesSubscriptionDetailsScreen";
import defaultStyles, { Colors } from "../AppCss";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import WorkspaceDetailsScreen from "../screens/home/WorkspaceDetailsScreen";
import CheckinSuccessScreen from "../screens/home/CheckinSuccessScreen";
import WorkspaceAmenitiesScreen from "../screens/home/WorkspaceAmenitiesScreen";
import OrderSummaryScreen from "../screens/home/OrderSummaryScreen";
import WorkspaceSubscriptionPurchasedScreen from "../screens/home/WorkspaceSubscriptionPurchasedScreen";

// ----------- Auth Stack Navigator ----------------
const AuthStackNavigator = createStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator headerMode="screen">
      <AuthStackNavigator.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ title: "Getting Started", headerTitleAlign: "center" }}
      />
      <AuthStackNavigator.Screen
        name="AuthPhone"
        component={AuthPhoneScreen}
        options={{ title: "Add Phone Number", headerTitleAlign: "center" }}
      />
      <AuthStackNavigator.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: "Password Reset", headerTitleAlign: "center" }}
      />
      <AuthStackNavigator.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: "Enter new password", headerTitleAlign: "center" }}
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
        options={{ title: "Verifying your email", headerTitleAlign: "center" }}
      />
      <AuthStackNavigator.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
        options={{ title: "Terms and Conditions", headerTitleAlign: "center" }}
      />
      <AuthStackNavigator.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: "Privacy Policy", headerTitleAlign: "center" }}
      />
    </AuthStackNavigator.Navigator>
  );
};

// ----------- Home Stack Navigator ----------------
const HomeStackNavigator = createStackNavigator();
const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator headerMode="screen">
      <HomeStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStackNavigator.Screen
        name="WorkspaceDetails"
        component={WorkspaceDetailsScreen}
        options={{ title: "Workspace Details" }}
      />
      <HomeStackNavigator.Screen
        name="CheckinSuccess"
        component={CheckinSuccessScreen}
        options={{ title: "Checkin Success" }}
      />
      <HomeStackNavigator.Screen
        name="WorkspaceAmenities"
        component={WorkspaceAmenitiesScreen}
        options={{ title: "Workspace Amenities" }}
      />
      <HomeStackNavigator.Screen
        name="OrderSummary"
        component={OrderSummaryScreen}
        options={{ title: "Order Summary" }}
      />
      <HomeStackNavigator.Screen
        name="WorkspaceSubscriptionPurchased"
        component={WorkspaceSubscriptionPurchasedScreen}
        options={{ headerShown: false }}
      />
    </HomeStackNavigator.Navigator>
  );
};

// ----------- My Spaces Stack Navigator ----------------
const MySpacesStackNavigator = createStackNavigator();
const MySpacesNavigator = () => {
  return (
    <MySpacesStackNavigator.Navigator headerMode="screen">
      <MySpacesStackNavigator.Screen
        name="MySpaces"
        component={MySpacesScreen}
        options={{ title: "My Spaces" }}
      />
      <MySpacesStackNavigator.Screen
        name="MySpacesSubscriptionDetail"
        component={MySpacesSubscriptionDetails}
        options={{ title: "Subscription Details" }}
      />
    </MySpacesStackNavigator.Navigator>
  );
};

// ----------- Account Stack Navigator ----------------
const AccountStackNavigator = createStackNavigator();
const AccountNavigator = () => {
  return (
    <AccountStackNavigator.Navigator headerMode="screen">
      <AccountStackNavigator.Screen
        name="MyAccount"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <AccountStackNavigator.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{ title: "My Profile" }}
      />
      <AccountStackNavigator.Screen
        name="RecentSearches"
        component={RecentSearchesScreen}
        options={{ title: "Recent Searches" }}
      />
      <AccountStackNavigator.Screen
        name="CheckinHistory"
        component={CheckinHistoryScreen}
        options={{ title: "Checkin History" }}
      />
      <AccountStackNavigator.Screen
        name="CheckinMonthlyList"
        component={CheckinMonthlyListScreen}
        options={{ title: "Checkin History" }}
      />
      <AccountStackNavigator.Screen
        name="PurchaseHistory"
        component={PurchaseHistoryScreen}
        options={{ title: "Purchase History" }}
      />
      <AccountStackNavigator.Screen
        name="PurchaseDetails"
        component={PurchaseDetailsScreen}
        options={{ title: "Purchase Details" }}
      />
      <AccountStackNavigator.Screen
        name="Support"
        component={SupportScreen}
        options={{ title: "Support" }}
      />
      <AccountStackNavigator.Screen
        name="Faq"
        component={FaqScreen}
        options={{ title: "FAQ" }}
      />
      <AccountStackNavigator.Screen
        name="CouponCodes"
        component={CouponCodesScreen}
        options={{ title: "Coupon Codes" }}
      />
      <AccountStackNavigator.Screen
        name="SignOut"
        component={SignoutScreen}
        options={{ title: "Sign Out" }}
      />
    </AccountStackNavigator.Navigator>
  );
};

// ----------- Bottom Tabs Navigator ----------------
const BottomTabNavigator = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: "#ccc",
        safeAreaInsets: { bottom: 10 },
        labelStyle: {
          ...defaultStyles.small,
          fontFamily: "montserrat-semi-bold",
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let finalComponent;

          if (route.name === "Home") {
            finalComponent = focused ? (
              <MaterialIcons name="explore" size={24} color={Colors.primary} />
            ) : (
              <MaterialIcons name="explore" size={24} color="#ccc" />
            );
          } else if (route.name === "MySpaces") {
            finalComponent = focused ? (
              <MaterialIcons name="person" size={24} color={Colors.primary} />
            ) : (
              <MaterialIcons name="person" size={24} color="#ccc" />
            );
          } else if (route.name === "Account") {
            finalComponent = focused ? (
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color={Colors.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                ccolor="#ccc"
              />
            );
          }

          // You can return any component that you like here!
          return finalComponent;
        },
      })}
    >
      <BottomTabNavigator.Screen name="Home" component={HomeNavigator} />
      <BottomTabNavigator.Screen
        name="MySpaces"
        component={MySpacesNavigator}
        options={{ tabBarLabel: "My Spaces" }}
      />
      <BottomTabNavigator.Screen name="Account" component={AccountNavigator} />
    </BottomTabNavigator.Navigator>
  );
};

// ----------- Final Stack Navigator ----------------
const FinalStackNavigator = createStackNavigator();
export const FinalNavigator = () => {
  const authContext = useContext(AuthContext);
  return (
    <FinalStackNavigator.Navigator>
      {authContext.isLoggedIn ? (
        <FinalStackNavigator.Screen
          name="Account"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <FinalStackNavigator.Screen name="Auth" component={AuthNavigator} />
      )}
    </FinalStackNavigator.Navigator>
  );
};
