import React, { createContext, useState } from 'react';

export const ShowVerticalListContext = createContext({
  showVerticalList: false,
  verticalType: null,
  changeShowVerticalList: () => {},
  changeType: () => {},
});

const ShowVerticalListContextProvider = (props) => {
  const [showVerticalList, setShowVerticalList] = useState(false);
  const [verticalType, setVerticalType] = useState(null);

  const changeShowVerticalList = (state) => {
    setShowVerticalList(state);
  };

  const changeType = (type) => {
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
