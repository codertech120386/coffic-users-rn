import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useMutation } from "@apollo/react-hooks";

import { VERIFY_EMAIL } from "../../mutations";

import { AuthContext } from "../../context/AuthContext";
import { Spinner } from "native-base";
import { Colors } from "../../AppCss";

export default function VerifyMailScreen(props: any) {
  const authContext = useContext(AuthContext);
  const [verifyEmail, { data }] = useMutation(VERIFY_EMAIL);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const showToastBox = (message: string) => {
    setShowToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    if (authContext.isEmailVerified !== true) {
      const code =
        props && props.match && props.match.params && props.match.params.code;

      verifyEmail({
        variables: {
          code,
        },
      })
        .then((data) => {
          authContext.changeIsEmailVerified(true);
          props.navigation.navigate("Login");
        })
        .catch((e) => {
          showToastBox("Something went wrong .. Please try again later");
        });
    }
  }, [authContext, history, props, verifyEmail]);

  if (!data) {
    return <Spinner color={Colors.primary} />;
  }
  return <View></View>;
}

const styles = StyleSheet.create({});
