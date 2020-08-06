import React, { createContext, useState } from "react";

interface IShowVerticalListContextProps {
  showVerticalList: boolean;
  verticalType: any;
  changeShowVerticalList: (state: any) => void;
  changeType: (type: any) => void;
}

export const ShowVerticalListContext = createContext({
  showVerticalList: false,
  verticalType: null,
  changeShowVerticalList: () => {},
  changeType: () => {},
} as IShowVerticalListContextProps);

const ShowVerticalListContextProvider = (props: any) => {
  const [showVerticalList, setShowVerticalList] = useState<boolean>(false);
  const [verticalType, setVerticalType] = useState<any>(null);

  const changeShowVerticalList = (state: any) => {
    setShowVerticalList(state);
  };

  const changeType = (type: any) => {
    const newType = { ...type };
    setVerticalType(newType);
  };

  return (
    <ShowVerticalListContext.Provider
      value={{
        showVerticalList,
        verticalType,
        changeShowVerticalList,
        changeType,
      }}
    >
      {props.children}
    </ShowVerticalListContext.Provider>
  );
};

export default ShowVerticalListContextProvider;
