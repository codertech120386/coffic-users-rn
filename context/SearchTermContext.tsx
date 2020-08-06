import React, { createContext, useState } from "react";

interface ISearchTermContextProps {
  searchTerm: string | null;
  changeSearchTerm: (searchText: string) => void;
}

export const SearchTermContext = createContext({
  searchTerm: null,
  changeSearchTerm: (searchText: string) => {},
} as ISearchTermContextProps);

const SearchTermContextProvider = (props: any) => {
  const [searchTerm, setSearchTerm] = useState<string | null>("Hyderabad");

  const changeSearchTerm = (props: string) => {
    setSearchTerm(props);
  };

  return (
    <SearchTermContext.Provider
      value={{
        searchTerm,
        changeSearchTerm,
      }}
    >
      {props.children}
    </SearchTermContext.Provider>
  );
};

export default SearchTermContextProvider;
