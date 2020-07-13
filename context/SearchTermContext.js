import React, { createContext, useState } from 'react';

export const SearchTermContext = createContext({
  searchTerm: null,
  changeSearchTerm: (searchText) => {},
});

const SearchTermContextProvider = (props) => {
  const [searchTerm, setSearchTerm] = useState('Hyderabad');

  const changeSearchTerm = (props) => {
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
