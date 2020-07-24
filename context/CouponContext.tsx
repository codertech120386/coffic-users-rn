import React, { createContext, useState } from "react";

export const CouponContext = createContext<{
  code: string | null;
  changeCode: any;
}>({
  code: null,
  changeCode: (code: string) => {},
});

const CouponContextProvider = ({ children }: any) => {
  const [code, setCode] = useState<string | null>(null);

  const changeCode = (code: string) => {
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
};

export default CouponContextProvider;
