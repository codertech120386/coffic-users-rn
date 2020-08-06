import React, { useState, createContext } from "react";

import { INITIAL_WORKSPACE_FILTER_LIST } from "../constants";

export interface FilterContextProps {
  finalFilters: any;
  changeFinalFilters: any;
  removeFilter: any;
}

export const FilterContext = createContext({
  finalFilters: INITIAL_WORKSPACE_FILTER_LIST,
  changeFinalFilters: (finalFilter: any) => {},
  removeFilter: (filterItem: any) => {},
} as FilterContextProps);

const FilterContextProvider = (props: any) => {
  const [selectedFinalFilters, setSelectedFinalFilters] = useState({
    ...INITIAL_WORKSPACE_FILTER_LIST,
  });

  const changeFinalFilters = async (props: any) => {
    await setSelectedFinalFilters(props);
  };

  const removeFilter = (unSelectedItem: any) => {
    const oldSelectedFinalFilters: any = { ...selectedFinalFilters };
    Object.keys(oldSelectedFinalFilters).map((filter) => {
      if (
        filter === "propertyType" ||
        filter === "spaceType" ||
        filter === "amenities"
      ) {
        return oldSelectedFinalFilters[filter].map((filterObject: any) => {
          if (filterObject.displayName === unSelectedItem) {
            return (filterObject.isChecked = false);
          }
        });
      } else if (
        filter === "price" ||
        filter === "distance" ||
        filter === "seatCapacity" ||
        filter === "duration"
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
