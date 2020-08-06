import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { IWorkspaceSpaceTypePlanProps } from "../../ts-types";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import { ListItem, Left, Radio, Right } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import WorkspaceNumberOfSeats from "./WorkspaceNumberOfSeats";
import Calendar from "../ui/Calendar";
import RadioButton from "../ui/RadioButton";
import { FONTSTYLES } from "../../constants";

const WorkspaceSpaceTypePlans = (props: IWorkspaceSpaceTypePlanProps) => {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [selectedPlanDuration, setSelectedPlanDuration] = useState<
    number | null
  >(null);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<string | null>(
    null
  );
  const [numberOfSeats, setNumberOfSeats] = useState<number>(1);
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    moment().format("DD-MM-YYYY")
  );
  const [selectedEndDate, setSelectedEndDate] = useState<
    string | null | undefined
  >(null);
  const [dailyPlanDetails, setDailyPlanDetails] = useState<any>(null);
  const [monthlyPlanDetails, setMonthlyPlanDetails] = useState<any>(null);
  const [showBuyMonthly, setShowBuyMonthly] = useState<boolean>(false);
  const [autoSelectMonthlyRadio, setAutoSelectMonthlyRadio] = useState<number>(
    0
  );

  useEffect(() => {
    const planMonthlyArray =
      props &&
      props.plans
        .map((plan: any) => {
          if (plan.duration === 30) {
            return `${plan.id}-${plan.duration}-${plan.cost}`;
          }
        })
        .filter((plan: any) => plan);

    if (planMonthlyArray.length) {
      setMonthlyPlanDetails(planMonthlyArray[0]);
    }

    const planDailyArray =
      props &&
      props.plans
        .map((plan: any) => {
          if (plan.duration === 1 && plan.cost !== 0) {
            return `${plan.id}-${plan.duration}-${plan.cost}`;
          }
        })
        .filter((plan: any) => plan);

    if (planDailyArray.length) {
      setDailyPlanDetails(planDailyArray[0]);
    }
  }, [props]);

  const radioChangeListener = (plan: any) => {
    const selectedDateMoment = moment(selectedStartDate, "DD-MM-YYYY");
    const planId = +plan.id;
    const duration = plan.duration;

    let calculatedEndDate = getEndDate(duration, selectedDateMoment);
    setSelectedPlanId(planId);
    setSelectedPlanDuration(+duration);
    setSelectedPlanDetails(`${plan}-${duration}`);
    setSelectedEndDate(calculatedEndDate);
    setAutoSelectMonthlyRadio(planId);
  };

  const getEndDate = (durationInDays: number, selectedDateMoment: any) => {
    let calculatedEndDate;
    if (durationInDays % 30 === 0) {
      const months = durationInDays / 30;
      const addedDate = selectedDateMoment
        .add(months, "M")
        .format("DD-MM-YYYY");
      calculatedEndDate = moment(addedDate, "DD-MM-YYYY")
        .subtract(1, "days")
        .format("DD-MM-YYYY");
    } else {
      calculatedEndDate = selectedDateMoment
        .add(durationInDays, "days")
        .subtract(1, "days")
        .format("DD-MM-YYYY");
    }
    return calculatedEndDate;
  };

  const removeSeatClickListener = () => {
    if (numberOfSeats > 1) setNumberOfSeats(numberOfSeats - 1);
  };

  const addSeatClickListener = () => {
    setNumberOfSeats(numberOfSeats + 1);
  };

  const onPurchaseClickListener = () => {
    const workspaceId = props && props.workspace && props.workspace.id;
    props.onPurchaseClickListener({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      planId: selectedPlanId,
      workspaceId: +workspaceId,
      numberOfSeats,
    });
    // history.push({
    //   pathname: '/order-summary',
    //   state: {
    //     data: {
    // startDate: selectedStartDate,
    // endDate: selectedEndDate,
    // planId: selectedPlanId,
    // workspaceId: +workspaceId,
    // numberOfSeats,
    //     },
    //   },
    // });

    //TODO redirect to Order Summary Screen
  };

  const onDateSelectedListener = (
    startDate: string,
    endDate: string | null
  ) => {
    setSelectedStartDate(startDate);
    if (endDate) {
      setSelectedEndDate(endDate);
    }
  };

  const onSelectMonthlyPlanClicked = () => {
    const planId = monthlyPlanDetails.split("-")[0];
    const duration = monthlyPlanDetails.split("-")[1];
    setSelectedPlanId(planId);
    setSelectedPlanDuration(monthlyPlanDetails.split("-")[1]);
    setAutoSelectMonthlyRadio(planId);
    setSelectedPlanDetails(`${planId}-${duration}`);
  };

  const displayRadioButton = (plan: any, value: string | null = null) => {
    const availedIds = props && props.availedFreePlanIds;
    const planId = plan.id;

    return (
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: 15,
          marginLeft: "5%",
          height: 45,
        }}
        key={plan.id}
      >
        <RadioButton
          isSelectedProp={value}
          plan={plan}
          radioChanged={radioChangeListener}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              marginLeft: 10,
              flex: 1,
              justifyContent: "space-around",
            }}
          >
            <CustomText
              style={{ ...defaultStyles.h6Text, fontFamily: FONTSTYLES.normal }}
            >
              {plan.title}
            </CustomText>
            <CustomText
              style={{ ...defaultStyles.littleSmall, color: Colors.primary }}
            >
              {plan.sub_title}
            </CustomText>
          </View>
          <View style={{ justifyContent: "center" }}>
            <CustomText
              style={{
                ...defaultStyles.h6Text,
                width: 80,
                color: Colors.primary,
              }}
            >
              &#8377; {plan.cost / 100}
            </CustomText>
          </View>
        </View>
      </View>
    );
  };

  let costDifference = 0;
  let percentDifference = 0;
  let monthlyCost = 0;
  if (selectedPlanDuration === 1 && monthlyPlanDetails && dailyPlanDetails) {
    monthlyCost = monthlyPlanDetails.split("-")[2];
    const dailyCost = dailyPlanDetails.split("-")[2];
    const numberOfDays = moment(selectedStartDate, "DD-MM-YYYY").daysInMonth();
    costDifference = dailyCost * numberOfDays - monthlyCost;
    percentDifference = (costDifference / dailyCost) * numberOfDays * 100;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          marginBottom: 10,
        }}
      >
        <View>
          <Ionicons
            name="md-arrow-back"
            size={20}
            color="#3f3f3f"
            onPress={props.onBackClickListener}
          />
        </View>
        <View
          style={{
            marginLeft: 15,
            height: 40,
            justifyContent: "space-between",
          }}
        >
          <CustomText style={defaultStyles.h6Text}>
            {props.spaceType}
          </CustomText>
          <CustomText
            style={{
              ...defaultStyles.littleSmall,
              color: Colors.primary,
              fontFamily: FONTSTYLES.semiBold,
            }}
          >
            Single Location
          </CustomText>
        </View>
      </View>
      <View>
        {autoSelectMonthlyRadio !== 0 ? (
          <View>
            {props.plans.map((plan: any) =>
              displayRadioButton(
                plan,
                `${selectedPlanId}-${selectedPlanDuration}`
              )
            )}
          </View>
        ) : (
          <View>
            {props.plans.map((plan: any) => displayRadioButton(plan))}
          </View>
        )}
        <WorkspaceNumberOfSeats
          numberOfSeats={numberOfSeats}
          removeSeat={removeSeatClickListener}
          addSeat={addSeatClickListener}
        />
        <View style={styles.cardBottomBorder} />
        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <CustomText
            style={{
              ...defaultStyles.h6Text,
              color: "#131415",
              fontFamily: "montserrat-semi-bold",
            }}
          >
            Select the start date of your pass
          </CustomText>
        </View>

        <Calendar
          onDateChange={onDateSelectedListener}
          plan={selectedPlanDetails}
        />

        <View style={styles.cardBottomBorder} />

        {selectedPlanDuration === 1 && monthlyPlanDetails && dailyPlanDetails && (
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              backgroundColor: "#CDFADD",
              marginTop: -5,
              marginBottom: 25,
              marginLeft: 5,
              borderColor: Colors.primary,
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            <View style={{ width: "90%" }}>
              <CustomText
                style={{
                  ...defaultStyles.littleSmall,
                  color: Colors.primary,
                  fontFamily: FONTSTYLES.semiBold,
                }}
              >
                Save upto {percentDifference.toFixed(2)}% or approx &#8377;{" "}
                {costDifference / 100} by buying monthly plan of the same
                workspace at just ₹{monthlyCost / 100} per month.
              </CustomText>
            </View>
            <View
              style={{
                width: "10%",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="ios-arrow-forward"
                size={23}
                color={Colors.primary}
                onPress={onSelectMonthlyPlanClicked}
              />
            </View>
          </View>
        )}

        {/* ----- Subscription Action Button ------ */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              width: "50%",
            }}
          >
            <CustomText
              onPress={onPurchaseClickListener}
              style={{
                ...defaultStyles.h6Text,
                paddingHorizontal: 25,
                paddingVertical: 10,
                color: "white",
                textAlign: "center",
              }}
            >
              Purchase
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default WorkspaceSpaceTypePlans;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginBottom: 40,
  },
  cardBottomBorder: {
    width: "100%",
    height: 1,
    textAlign: "center",
    backgroundColor: "#ccc",
    marginTop: 15,
    marginBottom: 25,
  },
});
