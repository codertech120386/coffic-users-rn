import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

import { FilterContext } from "../../context/FilterContext";
import Chip from "../ui/Chip";
import defaultStyles, { Colors } from "../../AppCss";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { CustomText } from "../ui/CustomText";
import { FONTSTYLES } from "../../constants";

const FiltersHomePage = (props: any) => {
  const filterContext = useContext(FilterContext);

  const onFiltersClickedListener = () => {
    props.onFiltersClickedListener();
  };

  const closeIconClickListener = (item: string) => {
    filterContext.removeFilter(item);
  };

  const setFilterChips = () => {
    const filterChips: string[] = [];
    if (filterContext.finalFilters) {
      Object.keys(filterContext.finalFilters).map((filter) => {
        if (
          filter === "propertyType" ||
          filter === "spaceType" ||
          filter === "amenities"
        ) {
          filterContext.finalFilters[filter].map((filterObject: any) => {
            if (filterObject.isChecked)
              filterChips.push(filterObject.displayName);
          });
        } else if (
          filter === "price" ||
          filter === "distance" ||
          filter === "seatCapacity" ||
          filter === "duration"
        ) {
          filterChips.push(filterContext.finalFilters[filter]);
        }
      });
    }

    return filterChips.map((chip) => {
      if (chip) {
        return (
          <Chip
            item={chip}
            onCloseListener={closeIconClickListener}
            styleProps={{ backgroundColor: Colors.primary }}
            key={chip}
          />
        );
      }
    });
  };

  const onAskRequestPermissionClickedListener = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      props.permissionRequested(false);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "50%",
            height: "100%",
            borderRightColor: "#ccc",
            borderRightWidth: 1,
            alignItems: "center",
          }}
          onPress={onAskRequestPermissionClickedListener}
        >
          <EvilIcons
            name="location"
            size={24}
            color={Colors.primary}
            style={{ marginRight: 10 }}
          />
          <CustomText
            style={{ ...defaultStyles.small, fontFamily: FONTSTYLES.normal }}
          >
            NEARBY
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "50%",
            alignItems: "center",
          }}
          onPress={onFiltersClickedListener}
        >
          <AntDesign
            name="filter"
            size={24}
            color={Colors.primary}
            style={{ marginRight: 10 }}
          />
          <CustomText
            style={{ ...defaultStyles.small, fontFamily: FONTSTYLES.normal }}
          >
            FILTER
          </CustomText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 10,
        }}
      >
        {setFilterChips()}
      </View>
    </View>
  );
};
export default FiltersHomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
});
