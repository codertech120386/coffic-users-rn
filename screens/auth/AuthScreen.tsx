import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";

import defaultStyles from "../../AppCss";
import { CofficBigLogo } from "../../icons";

const AuthScreen = (props: any) => {
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "288660621120-iu1r6dfllqummha4iio3nouiq539n37f.apps.googleusercontent.com",
        iosClientId:
          "288660621120-oojvna4l1nvrfhgeoura7cejel7cia5u.apps.googleusercontent.com",
        iosStandaloneAppClientId:
          "83725301118-omlsjuf2ukiqi116opsst3dbt1i2omnl.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        props.navigation.navigate("AuthPhone", {
          email: result.user.email,
          givenName: result.user.givenName,
          familyName: result.user.familyName,
        });
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  const signUp = () => {
    props.navigation.navigate("Register");
  };

  const login = () => {
    props.navigation.navigate("Login");
  };

  const termsClicked = () => {
    props.navigation.navigate("TermsAndConditions");
  };
  const privacyPolicyClicked = () => {
    props.navigation.navigate("PrivacyPolicy");
  };

  return (
    <View>
      <View style={styles.pageLogin}>
        <View style={styles.cofficLogo}>
          <CofficBigLogo />
        </View>
        <View style={styles.vCenter}>
          {/* <View style={{ ...defaultStyles.textCenter, ...styles.logoLogin }}> */}
          <Text style={styles.logoLoginText}>
            The Largest Network of Spaces you can instantly start working in
            India
          </Text>
          {/* </View> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={signInWithGoogleAsync}>
              <View
                // onPress={() => ()}
                style={{ ...styles.loginButton, ...styles.loginWithGoogle }}
              >
                <Ionicons name="logo-google" size={23} color="white" />
                <Text style={styles.buttonText}>Login with Google</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={login}>
              <View style={{ ...styles.loginButton, ...styles.loginWithEmail }}>
                <MaterialIcons name="mail-outline" size={23} color="white" />
                <Text style={styles.buttonText}>Sign in with email</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={signUp}>
              <View
                style={{ ...styles.loginButton, ...styles.loginWithAccount }}
              >
                <View>
                  <MaterialIcons
                    name="person-outline"
                    size={23}
                    color="white"
                  />
                </View>
                <Text style={styles.buttonText}>Create new account</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageLogin: {
    paddingTop: 80,
    paddingBottom: 100,
    position: "relative",
    height: "100%",
  },
  cofficLogo: {
    marginTop: Platform.OS === "android" ? 60 : 30,
    marginBottom: Platform.OS === "android" ? 10 : 20,
  },
  vCenter: {
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
  },
  logoLogin: {
    marginVertical: Platform.OS === "android" ? 60 : 30,
    maxWidth: 250,
    alignItems: "center",
  },
  logoLoginText: {
    width: "80%",
    marginTop: Platform.OS === "android" ? 50 : 30,
    marginBottom: 80,
    fontFamily: "montserrat",
    fontStyle: "normal",
    fontSize: 15,
    lineHeight: 18,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#4184f3",
    lineHeight: 17,
    color: "#fff",
    width: "100%",
    marginVertical: 15,
    borderRadius: 6,
  },
  loginWithGoogle: {
    backgroundColor: "#4184f3",
  },
  loginWithEmail: {
    backgroundColor: "#61c6bb",
  },
  loginWithAccount: {
    backgroundColor: "#61c6bb",
  },
  buttonText: {
    marginLeft: 25,
    fontFamily: "montserrat-bold",
    fontStyle: "normal",
    fontSize: 17,
    color: "white",
  },
  authFooter: {
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
});

export default AuthScreen;
