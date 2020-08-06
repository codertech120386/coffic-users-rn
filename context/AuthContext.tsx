import React, { createContext, useState, useEffect } from "react";

import { setItem, getItem, removeItem } from "../helper_functions";

interface IAuthContextProps {
  isLoggedIn: boolean | null;
  cofficToken: string | null;
  isEmailVerified: boolean | null;
  isLoading: boolean;
  changeCofficToken: any;
  removeCofficToken: any;
  changeIsEmailVerified: any;
}

export const AuthContext = createContext({
  isLoggedIn: false,
  cofficToken: null,
  isEmailVerified: false,
  isLoading: true,
  changeCofficToken: (token: string) => {},
  removeCofficToken: () => {},
  changeIsEmailVerified: (value: boolean) => {},
} as IAuthContextProps);

const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [cofficToken, setCofficToken] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let cofficToken = null;
    let emailVerified = null;

    const checkLoginAndEmailVerified = async () => {
      cofficToken = await getItem("cofficToken");
      emailVerified = await getItem("isEmailVerified");

      if (cofficToken) {
        setCofficToken(cofficToken);
        setIsLoggedIn(true);
        if (emailVerified) {
          setIsEmailVerified(true);
        }
      }
      setIsLoading(false);
    };

    checkLoginAndEmailVerified();
  }, [isEmailVerified, isLoggedIn]);

  const changeCofficToken = async (token: string) => {
    await setItem("cofficToken", token);
    setIsLoggedIn(true);
    setCofficToken(token);
  };

  const removeCofficToken = async () => {
    await removeItem("cofficToken");
    setIsLoggedIn(false);
    setCofficToken(null);
  };

  const changeIsEmailVerified = async (value: boolean) => {
    await setItem("isEmailVerified", value);
    setIsEmailVerified(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        cofficToken,
        isEmailVerified,
        isLoading,
        changeCofficToken,
        removeCofficToken,
        changeIsEmailVerified,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
