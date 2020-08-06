import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, Platform, ScrollView } from "react-native";
import * as Location from "expo-location";

import { FilterContext } from "../../context/FilterContext";
import { SearchTermContext } from "../../context/SearchTermContext";
import { ShowVerticalListContext } from "../../context/ShowVerticalListContext";

import { INITIAL_WORKSPACE_FILTER_LIST, FONTSTYLES } from "../../constants";

import { TYPES } from "../../queries";

import defaultStyles from "../../AppCss";
import { useQuery } from "@apollo/react-hooks";
import { CustomText } from "../../components/ui/CustomText";
import WorkspaceType from "../../components/home-page-screen/WorkspaceType";
import WorkspaceTypeVerticalList from "../../components/home-page-screen/WorkspaceTypeVerticalList";
import HomePageImage from "../../icons/HomePageImage";
import Search from "../../components/home-page-screen/Search";
import FiltersHomePage from "../../components/home-page-screen/FiltersHomePage";

let finalFormattedFilters: any = Object.create(null);

export default function HomeScreen(props: any) {
  const [propertyTypes, setPropertyTypes] = useState<any>([]);
  const [isLocationPermissionDenied, setIsLocationPermissionDenied] = useState<
    boolean
  >(false);
  const [latLong, setLatLong] = useState<string | null>(null);

  const { loading, error, data } = useQuery(TYPES);

  const filterContext: any = useContext(FilterContext);
  const searchTermContext: any = useContext(SearchTermContext);
  const showVerticalListContext: any = useContext(ShowVerticalListContext);

  useEffect(() => {
    if (Platform.OS !== "ios") {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setIsLocationPermissionDenied(true);
        }

        let location = await Location.getCurrentPositionAsync();
        console.log("location", location);
        // Plugins.Geolocation.getCurrentPosition({
        //   enableHighAccuracy: true,
        // })
        //   .then((position) => {
        //     const newLatLong = `${position.coords.latitude},${position.coords.longitude}`;
        //     setLatLong(newLatLong);
        //   })
        //   .catch((error) => {
        //     if (error.message) {
        //       setIsLocationPermissionDenied(true);
        //     }
        //   });
      })();
    }
  }, []);

  useEffect(() => {
    const formatFilters = (finalFilters: any) => {
      let filterChips = Object.create(null);
      Object.keys(finalFilters).map((filter) => {
        if (
          filter === "propertyType" ||
          filter === "spaceType" ||
          filter === "amenities"
        ) {
          finalFilters[filter].map((filterObject: any) => {
            if (filterObject.isChecked) {
              if (filterChips[filter]) {
                filterChips[filter] += "," + filterObject.displayName;
              } else {
                filterChips[filter] = filterObject.displayName;
              }
            }
          });
        } else if (
          filter === "price" ||
          filter === "distance" ||
          filter === "seatCapacity" ||
          filter === "duration"
        ) {
          if (filter in finalFilters && finalFilters[filter]) {
            let value;
            if (filter === "distance") {
              value = finalFilters[filter].replace("kms", "");
            } else if (filter === "seatCapacity") {
              value = finalFilters[filter].replace("people", "");
            }
            filterChips[filter] = value;
          }
        }
      });
      return filterChips;
    };

    if (filterContext.finalFilters) {
      finalFormattedFilters = formatFilters(filterContext.finalFilters);

      if (Object.keys(filterContext.finalFilters).includes("propertyType")) {
        let filteredPropertyTypes: any[] = [];
        Object.keys(filterContext.finalFilters["propertyType"]).map(
          (filter) => {
            if (filterContext.finalFilters["propertyType"][filter].isChecked) {
              filteredPropertyTypes.push(
                filterContext.finalFilters["propertyType"][filter]
              );
            }
          }
        );

        setPropertyTypes(filteredPropertyTypes);
      }
    } else {
      finalFormattedFilters = null;
    }
  }, [filterContext.finalFilters]);

  const onPermissionRequestedListener = (
    permissionStatus: any,
    data: any = null
  ) => {
    if (permissionStatus) {
      setIsLocationPermissionDenied(!permissionStatus);
    }
  };

  if (loading)
    return <CustomText style={defaultStyles.h2Text}>Loading...</CustomText>;
  if (error)
    return (
      <CustomText style={defaultStyles.h2Text}>
        Error! ${error.message}
      </CustomText>
    );

  const onNoResultsExploreButtonClicked = () => {
    searchTermContext.changeSearchTerm(null);
    filterContext.changeFinalFilters({ ...INITIAL_WORKSPACE_FILTER_LIST });
  };

  const showDetailsClicked = (id: number) => {
    props.navigation.navigate("WorkspaceDetails", {
      id,
    });
  };

  const onFiltersClickedListener = () => {
    props.navigation.navigate("WorkspaceFilters");
  };

  const searchTerm =
    searchTermContext.searchTerm && searchTermContext.searchTerm.length
      ? searchTermContext.searchTerm
      : null;

  const showWorkspaceTypes = () => {
    return (
      <View>
        <FiltersHomePage onFiltersClickedListener={onFiltersClickedListener} />
        {propertyTypes && propertyTypes.length ? (
          propertyTypes.length > 1 ? (
            propertyTypes.map((type: any) => (
              <WorkspaceType
                type={type}
                key={type.id}
                filters={finalFormattedFilters}
                searchTerm={searchTerm}
                latLong={latLong}
                onNoResultsExploreButtonClicked={
                  onNoResultsExploreButtonClicked
                }
                showDetailsClicked={showDetailsClicked}
              />
            ))
          ) : (
            <WorkspaceTypeVerticalList
              type={propertyTypes[0]}
              key={propertyTypes[0].id}
              filters={finalFormattedFilters}
              searchTerm={searchTerm}
              latLong={latLong}
              onNoResultsExploreButtonClicked={onNoResultsExploreButtonClicked}
              showDetailsClicked={showDetailsClicked}
            />
          )
        ) : (
          data &&
          data.types &&
          data.types.length &&
          data.types.map((type: any) => (
            <WorkspaceType
              type={type}
              key={type.id}
              filters={finalFormattedFilters}
              searchTerm={searchTerm}
              latLong={latLong}
              onNoResultsExploreButtonClicked={onNoResultsExploreButtonClicked}
              showDetailsClicked={showDetailsClicked}
            />
          ))
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {showVerticalListContext.showVerticalList ? (
        <WorkspaceTypeVerticalList
          type={showVerticalListContext.verticalType}
          filters={finalFormattedFilters}
          searchTerm={searchTerm}
          latLong={latLong}
          onNoResultsExploreButtonClicked={onNoResultsExploreButtonClicked}
          showDetailsClicked={showDetailsClicked}
        />
      ) : (
        <View>
          <Search permissionRequested={onPermissionRequestedListener} />
          {showWorkspaceTypes()}
        </View>
      )}

      <View style={{ width: "80%", marginLeft: "10%", marginTop: 20 }}>
        <View>
          <CustomText style={styles.endLogoText}>WORK.</CustomText>
          <CustomText style={styles.endLogoText}>MEET.</CustomText>
          <CustomText style={styles.endLogoText}>CONNECT.</CustomText>
        </View>
        <HomePageImage />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  endLogoText: {
    fontFamily: FONTSTYLES.bold,
    fontSize: 25,
    color: "#ccc",
  },
});
