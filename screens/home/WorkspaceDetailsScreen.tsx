import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Entypo } from "@expo/vector-icons";

import WorkspacePlan from "../../components/worokspace-details-screen/WorkspacePlan";
import { CustomText } from "../../components/ui/CustomText";

import { V1_WORKSPACE_DETAILS_FROM_ID } from "../../queries";
import { CHECKIN } from "../../mutations";

import { IWorkspaceBanner, IWorkspacePlan, IAmenity } from "../../ts-types";
import defaultStyles, { Colors } from "../../AppCss";
import WorkspaceSchedule from "../../components/worokspace-details-screen/WorkspaceSchedule";
import WorkspaceBanner from "../../components/worokspace-details-screen/WorkspaceBanner";
import { FONTSTYLES } from "../../constants";
import WorkspaceAmenity from "../../components/worokspace-details-screen/WorkspaceAmenity";
import WorkspaceSpaceTypePlans from "../../components/worokspace-details-screen/WorkspaceSpaceTypePlans";

const getExistingPlans = (newPlans: IWorkspacePlan[], plan: IWorkspacePlan) => {
  return newPlans.filter((newPlan) => newPlan.space_type === plan.space_type);
};

const WorkspaceDetailsScreen = (props: any) => {
  const [spaceType, setSpaceType] = useState<string>("");
  const [spaceTypePlans, setSpaceTypePlans] = useState<IWorkspacePlan[]>([]);
  const [
    showWorkspaceSpaceTypePlans,
    setShowWorkspaceSpaceTypePlans,
  ] = useState(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const workspaceId = +props.route.params.id;

  const { loading, error, data: workspace } = useQuery(
    V1_WORKSPACE_DETAILS_FROM_ID,
    {
      variables: {
        id: workspaceId,
      },
    }
  );

  const [checkin, {}] = useMutation(CHECKIN);

  if (loading)
    return <CustomText style={defaultStyles.h2Text}>Loading...</CustomText>;
  if (error)
    return (
      <CustomText style={defaultStyles.h2Text}>
        Error! ${error.message}
      </CustomText>
    );

  const getCheapestPlans = (plans: IWorkspacePlan[]) => {
    let newPlans: IWorkspacePlan[] = [];

    plans.map((plan) => {
      let existingPlans = getExistingPlans(newPlans, plan);

      //compare costs and then add the lowest to this array.
      if (existingPlans && existingPlans.length) {
        if (plan.cost < existingPlans[0].cost) {
          newPlans = newPlans.filter(
            (newPlan) => newPlan.space_type !== plan.space_type
          );
        }
      } else {
        newPlans.push({ ...plan });
      }
    });
    return newPlans;
  };

  const showPlans = (plans: IWorkspacePlan[]) => {
    const cheapestPlans = getCheapestPlans(plans);
    return (
      cheapestPlans &&
      cheapestPlans.length > 0 &&
      cheapestPlans.map((plan) => {
        return (
          <WorkspacePlan
            key={plan.id}
            plan={plan}
            plans={plans}
            back={onResetPlansClickListener}
            onSpaceTypeSelected={onSpaceTypeClickListener}
          />
        );
      })
    );
  };

  const onResetPlansClickListener = () => {
    setShowWorkspaceSpaceTypePlans(false);
  };

  const onSpaceTypeClickListener = (
    selectedSpaceType: string,
    plans: IWorkspacePlan[]
  ) => {
    setSpaceTypePlans(plans);
    setShowWorkspaceSpaceTypePlans(true);
    setSpaceType(selectedSpaceType);
  };

  const onCheckinClicked = () => {
    try {
      checkin({
        variables: {
          workspaceId,
        },
      }).then((responseData) =>
        // history.push(
        //   `/checkin-success/${
        //     responseData &&
        //     responseData.data &&
        //     responseData.data.checkin &&
        //     responseData.data.checkin.id
        //   }`
        // )
        //TODO redirect to check-in success
        props.navigation.navigate("CheckinSuccess")
      );
    } catch {
      showToastBox("Something went wrong .. please try again later");
    }
  };

  const showToastBox = (message: string) => {
    setShowToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const redirectToAmenitiesList = () => {
    props.navigation.navigate("WorkspaceAmenities", {
      id: workspaceId,
    });
  };

  const onPurchaseClickListener = (data: any) => {
    props.navigation.navigate("OrderSummary", data);
  };

  let amenitiesIterationCounter = 1;

  const fetchedWorkspace = workspace && workspace.v1Workspace;
  const images = fetchedWorkspace && fetchedWorkspace.images;
  const imageUrl = images && images[0].image_url;
  const address =
    fetchedWorkspace &&
    fetchedWorkspace.addresses[0] &&
    fetchedWorkspace.addresses[0].address;
  const plans = fetchedWorkspace && fetchedWorkspace.plans;
  const banners = fetchedWorkspace && fetchedWorkspace.banners;
  const amenities = fetchedWorkspace && fetchedWorkspace.amenities;

  return (
    <ScrollView>
      {fetchedWorkspace ? (
        <ScrollView style={styles.container}>
          <Image source={{ uri: imageUrl }} style={styles.workspaceImage} />
          <View
            style={{
              width: "92%",
              alignItems: "center",
              marginLeft: "4%",
            }}
          >
            <View
              style={{
                width: "94%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  alignItems: "flex-start",
                }}
              >
                <CustomText style={defaultStyles.h3Text}>
                  {fetchedWorkspace.name}
                </CustomText>
                <CustomText
                  style={{ ...defaultStyles.littleSmall, marginTop: 10 }}
                >
                  {address}
                </CustomText>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Entypo name="direction" size={30} color={Colors.primary} />
              </View>
            </View>
            <WorkspaceSchedule workspaceId={workspaceId} />
            <View style={styles.cardBottomBorder} />

            {!showWorkspaceSpaceTypePlans ? (
              <>
                {/******* Workspace plans ********/}
                <View style={{ marginLeft: "2%" }}>
                  <CustomText
                    style={{
                      ...defaultStyles.extraSmall,
                      marginBottom: 20,
                      color: Colors.primary,
                      fontFamily: FONTSTYLES.semiBold,
                    }}
                  >
                    OUR LOWEST PRICES
                  </CustomText>
                  {plans && showPlans(plans)}
                </View>
                <View style={styles.cardBottomBorder} />

                {/******* Workspace banners ********/}
                {banners && banners.length ? (
                  <>
                    <View style={{ width: "95%", marginLeft: "2%" }}>
                      <CustomText
                        style={{
                          ...defaultStyles.extraSmall,
                          marginBottom: 20,
                          color: Colors.primary,
                          fontFamily: FONTSTYLES.semiBold,
                        }}
                      >
                        OFFERS BY THIS WORKSPACE
                      </CustomText>
                      {banners &&
                        banners.map((banner: IWorkspaceBanner) => {
                          return (
                            <WorkspaceBanner banner={banner} key={banner.id} />
                          );
                        })}
                    </View>
                    <View style={styles.cardBottomBorder} />

                    {/******* Workspace amenities ********/}
                    <View style={{ width: "95%", marginLeft: "2%" }}>
                      <CustomText
                        style={{
                          ...defaultStyles.extraSmall,
                          marginBottom: 20,
                          color: Colors.primary,
                          fontFamily: FONTSTYLES.semiBold,
                        }}
                      >
                        AMENITIES
                      </CustomText>
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {amenities &&
                          amenities.map((amenity: IAmenity) => {
                            if (amenitiesIterationCounter < 10) {
                              amenitiesIterationCounter += 1;
                              return (
                                <WorkspaceAmenity
                                  amenity={amenity}
                                  key={amenity.id}
                                />
                              );
                            }
                          })}
                      </View>
                      {amenities && amenities.length > 9 && (
                        <TouchableOpacity onPress={redirectToAmenitiesList}>
                          <CustomText
                            style={{
                              ...defaultStyles.extraSmall,
                              color: Colors.primary,
                              fontFamily: FONTSTYLES.semiBold,
                            }}
                          >
                            More
                          </CustomText>
                        </TouchableOpacity>
                      )}
                    </View>
                  </>
                ) : null}
              </>
            ) : (
              <WorkspaceSpaceTypePlans
                plans={spaceTypePlans}
                back={onResetPlansClickListener}
                spaceType={spaceType}
                availedFreePlanIds={
                  workspace &&
                  workspace.v1Workspace &&
                  workspace.v1Workspace.availedFreePlanIds
                }
                workspace={workspace && workspace.v1Workspace}
                onPurchaseClickListener={onPurchaseClickListener}
              />
            )}
          </View>
        </ScrollView>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};
export default WorkspaceDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    paddingBottom: 50,
  },
  workspaceImage: {
    width: "100%",
    height: 175,
  },
  cardBottomBorder: {
    width: "95%",
    height: 1,
    textAlign: "center",
    backgroundColor: "#ccc",
    marginTop: 15,
    marginBottom: 25,
  },
});
