import React, { useState, createContext } from 'react';

import { INITIAL_WORKSPACE_FILTER_LIST } from '../constants';

export const FilterContext = createContext({
  finalFilters: INITIAL_WORKSPACE_FILTER_LIST,
  changeFinalFilters: (finalFilter) => {},
  removeFilter: (filterItem) => {},
});

const FilterContextProvider = (props) => {
  const [selectedFinalFilters, setSelectedFinalFilters] = useState(
    FilterContext.finalFilters
  );

  const changeFinalFilters = async (props) => {
    await setSelectedFinalFilters(props);
  };

  const removeFilter = (unSelectedItem) => {
    const oldSelectedFinalFilters = { ...selectedFinalFilters };
    Object.keys(oldSelectedFinalFilters).map((filter) => {
      if (
        filter === 'propertyType' ||
        filter === 'spaceType' ||
        filter === 'amenities'
      ) {
        return oldSelectedFinalFilters[filter].map((filterObject) => {
          if (filterObject.displayName === unSelectedItem) {
            return (filterObject.isChecked = false);
          }
        });
      } else if (
        filter === 'price' ||
        filter === 'distance' ||
        filter === 'seatCapacity' ||
        filter === 'duration'
      ) {
        if (oldSelectedFinalFilters[filter] === unSelectedItem) {
          return (oldSelectedFinalFilters[filter] = null);
        }
      }
    });
    setSelectedFinalFilters(oldSelectedFinalFilters);
  };

  return (
    <FilterContext.Provider
      value={{
        finalFilters: selectedFinalFilters,
        changeFinalFilters,
        removeFilter,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
