import React, { createContext, useState } from 'react';

export const CouponContext = createContext({
  code: null,
  changeCode: (code) => {},
});

export default function CouponContextProvider({ children }) {
  const [code, setCode] = useState(null);

  const changeCode = (code) => {
    setCode(code);
  };

  return (
    <CouponContext.Provider
      value={{
        code,
        changeCode,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}
