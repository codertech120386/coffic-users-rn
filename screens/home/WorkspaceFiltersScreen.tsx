import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { CustomText } from "../../components/ui/CustomText";
import Checkbox from "../../components/ui/Checkbox";

import defaultStyles, { Colors } from "../../AppCss";
import {
  FILTERS,
  FONTSTYLES,
  INITIAL_WORKSPACE_FILTER_LIST,
  DURATIONS,
} from "../../constants";
import { FilterContext } from "../../context/FilterContext";
import { TYPES, AMENITIES_WITH_ID_NAME } from "../../queries";
import { CheckboxType } from "../../ts-types";
import DurationRadioButton from "../../components/ui/DurationRadioButton";
import Slider from "../../components/ui/MultiSlider";

let selectFilters: string[] = [];

const WorkspaceFiltersScreen = (props: any) => {
  const filterContext = useContext(FilterContext);

  const [filter, setFilter] = useState<string>("Property type");
  const [showFilterButton, setShowFilterButton] = useState<boolean>(false);

  const [selectedFilters, setSelectedFilters] = useState<any>(
    filterContext.finalFilters || INITIAL_WORKSPACE_FILTER_LIST
  );
  const [priceRangeValue, setPriceRangeValue] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 0, upper: 1000 });
  const [distanceRangeValue, setDistanceRangeValue] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 0, upper: 50 });
  const [seatsRangeValue, setSeatsRangeValue] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 0, upper: 50 });

  const {
    data: amenities,
    loading: amenitiesLoading,
    error: amenitiesError,
  } = useQuery(AMENITIES_WITH_ID_NAME);

  const {
    data: propertyTypes,
    loading: propertyTypesLoading,
    error: propertyTypesError,
  } = useQuery(TYPES);

  // useEffect(() => {
  //   if (filter === "Property type") {
  //     propertyTypesRefetch();
  //   }
  // }, [propertyTypesRefetch, filter, selectedFilters]);

  useEffect(() => {
    if (filter === "Property type" && propertyTypes && !propertyTypesLoading) {
      const newPropertyTypes = propertyTypes.types.map((type: any) => {
        return {
          id: +type.id,
          val: type.name,
          displayName: type.name,
        };
      });

      const oldPropertyTypes: any[] = [];

      newPropertyTypes.forEach((m: any) => {
        var item = selectedFilters.propertyType.find(
          (n: any) => n.val === m.val
        );
        if (item) {
          return Object.assign(item, m);
        }
        oldPropertyTypes.push({ ...m, isChecked: false });
      });

      if (!selectedFilters.propertyTypesQueried) {
        setSelectedFilters({
          ...selectedFilters,
          propertyType: oldPropertyTypes,
          propertyTypesQueried: true,
        });
      }
    }
  }, [filter, propertyTypes, propertyTypesLoading, selectedFilters]);

  // useEffect(() => {
  //   if (filter === "Amenities") {
  //     amenitiesRefetch();
  //   }
  // }, [amenitiesRefetch, filter, selectedFilters]);

  useEffect(() => {
    if (filter === "Amenities" && amenities && !amenitiesLoading) {
      const newAmenities = amenities.amenities.map((amenity: any) => {
        return {
          val: amenity.id,
          displayName: amenity.name,
        };
      });

      const oldAmenities: any[] = [];

      newAmenities.forEach((m: any) => {
        var item = selectedFilters.amenities.find((n: any) => n.val === m.val);
        if (item) {
          return Object.assign(item, m);
        }
        oldAmenities.push({ ...m, isChecked: false });
      });

      if (!selectedFilters.amenitiesQueried) {
        setSelectedFilters({
          ...selectedFilters,
          amenities: oldAmenities,
          amenitiesQueried: true,
        });
      }
    }
  }, [amenities, filter, amenitiesLoading, selectedFilters]);

  const onResetClickListener = () => {
    setSelectedFilters({
      propertyType: [
        {
          id: 1,
          val: "Coworking space",
          displayName: "Coworking space",
          isChecked: false,
        },
        {
          id: 2,
          val: "Cafe",
          displayName: "Cafe",
          isChecked: false,
        },
        {
          id: 3,
          val: "Pub",
          displayName: "Pub",
          isChecked: false,
        },
        {
          id: 4,
          val: "Hotel",
          displayName: "Hotel",
          isChecked: false,
        },
        {
          id: 5,
          val: "Shared Office",
          displayName: "Shared Office",
          isChecked: false,
        },
        {
          id: 6,
          val: "Business Center",
          displayName: "Business Center",
          isChecked: false,
        },
        {
          id: 7,
          val: "Training Facility",
          displayName: "Training Facility",
          isChecked: false,
        },
      ],
      spaceType: [
        {
          val: "Open Desk",
          displayName: "Open Desk",
          isChecked: false,
        },
        {
          val: "Private Cabin",
          displayName: "Private Cabin",
          isChecked: false,
        },
        {
          val: "Meeting Room",
          displayName: "Meeting Room",
          isChecked: false,
        },
        {
          val: "Training Space",
          displayName: "Training Space",
          isChecked: false,
        },
        {
          val: "Semi-Private Cubical",
          displayName: "Semi-Private Cubical",
          isChecked: false,
        },
        {
          val: "Event Space",
          displayName: "Event Space",
          isChecked: false,
        },
        {
          val: "Virtual Office Address",
          displayName: "Virtual Office Address",
          isChecked: false,
        },
      ],
      amenities: [],
      amenitiesQueried: false,
      duration: null,
      price: null,
      distance: null,
      seatCapacity: null,
    });
  };

  const onFilterClickListener = (e: any, filter: string) => {
    setFilter(filter);
  };

  const showFilterTypes = () => {
    return FILTERS.map((filterName, index) => {
      if (filterName === filter) {
        return (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              backgroundColor: "#E5E5E5",
              borderColor: "#ccc",
              borderWidth: 1,
            }}
            key={index}
          >
            <CustomText
              style={{
                ...defaultStyles.small,
                fontFamily: FONTSTYLES.semiBold,
              }}
            >
              {filterName}
            </CustomText>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderColor: "#ccc",
              borderWidth: 1,
            }}
            onPress={() => setFilter(filterName)}
            key={index}
          >
            <CustomText
              style={{
                ...defaultStyles.small,
                fontFamily: FONTSTYLES.semiBold,
              }}
            >
              {filterName}
            </CustomText>
          </TouchableOpacity>
        );
      }
    });
  };

  const checkboxChangeListener = (
    isChecked: boolean,
    value: string,
    type: string
  ) => {
    selectedFilters[type].map((item: CheckboxType) => {
      if (item.val === value && item.isChecked !== isChecked) {
        updateCheckboxValue(type, value);

        if (isChecked) {
          selectFilters.push(value);
        } else {
          let newFilters = selectFilters.filter((f) => f !== value);
          selectFilters = [...newFilters];
        }
      }
    });
    selectFilters.length > 0
      ? setShowFilterButton(true)
      : setShowFilterButton(false);
  };

  const updateCheckboxValue = (item: string, value: string | number) => {
    const newItemsArray = selectedFilters[item].map((item: any) => {
      if (item.val === value) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setSelectedFilters({ ...selectedFilters, [item]: newItemsArray });

    return false;
  };

  const radioChangeListener = async (value: string, type: string) => {
    selectFilters.push(value);
    setShowFilterButton(true);
    await setSelectedFilters({ ...selectedFilters, duration: value });
  };

  const setRangeStates = (
    type: string,
    min: number,
    max: number,
    text: string
  ) => {
    const range = `${min} - ${max} ${text}`;
    selectFilters.push(range);
    setSelectedFilters({
      ...selectedFilters,
      [type]: range,
    });
    if (min === 0 && max === 0) {
      setShowFilterButton(true);
    }
  };

  const onRangeListener = (
    value: { lower: number; upper: number },
    type: string
  ) => {
    if (type === "price") {
      setRangeStates(type, value.lower, value.upper, "");
    } else if (type === "distance") {
      setRangeStates(type, value.lower, value.upper, "kms");
    } else if (type === "seatCapacity") {
      setRangeStates(type, value.lower, value.upper, "people");
    }
  };

  const displayCheckboxList = (type: string) => {
    return selectedFilters[type].map((item: CheckboxType) => (
      <View key={item.val}>
        <Checkbox
          isChecked={item.isChecked}
          text={item.displayName}
          value={item.val}
          checkboxChangedListener={checkboxChangeListener}
          type={type}
        />
      </View>
    ));
  };

  const displayRangeElement = (
    lower: number,
    upper: number,
    type: string,
    step: number
  ) => {
    return (
      <Slider
        onRangeListener={onRangeListener}
        lower={lower}
        upper={upper}
        step={step}
        type={type}
        isCurrency={true}
      />
    );
  };

  const displayFilterConditions = () => {
    if (filter === "Property type") {
      return displayCheckboxList("propertyType");
    } else if (filter === "Space type") {
      return displayCheckboxList("spaceType");
    } else if (filter === "Amenities") {
      return displayCheckboxList("amenities");
    } else if (filter === "Duration & Price") {
      return (
        <View style={{ marginLeft: 15 }}>
          {DURATIONS.map((d: any) => (
            <View
              style={{
                flexDirection: "row",
                height: 40,
                marginBottom: 10,
                alignItems: "center",
              }}
              key={d}
            >
              <DurationRadioButton
                isSelectedProp={selectedFilters && selectedFilters.duration}
                item={d}
                radioChanged={radioChangeListener}
              />
              <CustomText
                style={{
                  ...defaultStyles.h6Text,
                  fontFamily: FONTSTYLES.normal,
                  marginLeft: 10,
                }}
              >
                {d}
              </CustomText>
            </View>
          ))}
          <View style={{ width: "90%", marginTop: 20 }}>
            <CustomText
              style={{
                ...defaultStyles.small,
                fontFamily: FONTSTYLES.semiBold,
              }}
            >
              Please select range between &#8377; {priceRangeValue.lower} -
              &#8377; {priceRangeValue.upper}
            </CustomText>
          </View>
          <View>
            {displayRangeElement(
              priceRangeValue.lower,
              priceRangeValue.upper,
              "price",
              50
            )}
            {selectedFilters.price && (
              <CustomText style={defaultStyles.h6Text}>
                Price range &#8377;{selectedFilters.price}
              </CustomText>
            )}
          </View>
        </View>
      );
    } else if (filter === "Distance") {
      return (
        <View style={{ marginLeft: 15 }}>
          <View style={{ width: "90%", marginTop: 20 }}>
            <CustomText
              style={{
                ...defaultStyles.small,
                fontFamily: FONTSTYLES.semiBold,
              }}
            >
              Please select distance between {distanceRangeValue.lower} km and{" "}
              {distanceRangeValue.upper} km
            </CustomText>
          </View>
          <View>
            {displayRangeElement(
              distanceRangeValue.lower,
              distanceRangeValue.upper,
              "distance",
              2
            )}
            {selectedFilters.price && (
              <CustomText style={defaultStyles.h6Text}>
                Distance range {selectedFilters.distance}
              </CustomText>
            )}
          </View>
        </View>
      );
    } else if (filter === "Seat Capacity") {
      return (
        <View style={{ marginLeft: 15 }}>
          <View style={{ width: "90%", marginTop: 20 }}>
            <CustomText
              style={{
                ...defaultStyles.small,
                fontFamily: FONTSTYLES.semiBold,
              }}
            >
              Please select seats between {seatsRangeValue.lower} and{" "}
              {seatsRangeValue.upper}
            </CustomText>
          </View>
          <View>
            {displayRangeElement(
              seatsRangeValue.lower,
              seatsRangeValue.upper,
              "seatCapacity",
              1
            )}
            {selectedFilters.price && (
              <CustomText style={defaultStyles.h6Text}>
                Seats required are for {selectedFilters.seatCapacity}
              </CustomText>
            )}
          </View>
        </View>
      );
    }
  };

  const finalFilterClickListener = async () => {
    await filterContext.changeFinalFilters(selectedFilters);
    if (showFilterButton) {
      props.navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={styles.filterLabelsContainer}>{showFilterTypes()}</View>
        <ScrollView
          style={styles.filterItemsContainer}
          showsVerticalScrollIndicator={false}
        >
          {displayFilterConditions()}
        </ScrollView>
      </View>

      {/* ----- Filter Button ------ */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "10%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 10,
            width: "50%",
          }}
        >
          <CustomText
            onPress={finalFilterClickListener}
            style={{
              ...defaultStyles.h6Text,
              paddingHorizontal: 25,
              paddingVertical: 10,
              color: "white",
              textAlign: "center",
            }}
          >
            Filter
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default WorkspaceFiltersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  filterLabelsContainer: { width: "35%", backgroundColor: "#C4C4C4" },
  filterItemsContainer: {
    width: "70%",
    backgroundColor: "#E5E5E5",
  },
});
