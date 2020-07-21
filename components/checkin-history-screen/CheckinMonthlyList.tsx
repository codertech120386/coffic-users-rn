import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import CheckinList from "./CheckinList";
import CheckinCalendarMonthSection from "./CheckinCalendarMonthSection";

import { GET_CHECKED_IN_HISTORY } from "../../queries";

const startOfMonthMoment = moment().startOf("month");
let monthName: string = startOfMonthMoment.format("MMMM");
let date: number = +startOfMonthMoment.format("DD");
let month: number = +startOfMonthMoment.format("MM");
let year: number = +startOfMonthMoment.format("YYYY");

const CheckinMonthlyList = (props: any) => {
  const startDate =
    (props &&
      props.location &&
      props.location.state &&
      props.location.state.startDate) ||
    moment().startOf("month").format("YYYY-MM-DD");
  const endDate =
    (props &&
      props.location &&
      props.location.state &&
      props.location.state.endDate) ||
    moment().endOf("month").format("YYYY-MM-DD");

  const variables = {
    startDate,
    endDate,
  };

  const {
    loading: historyLoading,
    error: historyError,
    data: historyData,
    refetch: historyRefetch,
  } = useQuery(GET_CHECKED_IN_HISTORY, {
    variables: { ...variables, limit: 100, reverse: false },
  });

  const onStartMonthChanged = (newDate) => {
    const startDate = moment(newDate, "DD-MM-YYYY").format("YYYY-MM-DD");
    const endDate = moment(newDate, "DD-MM-YYYY")
      .endOf("month")
      .format("YYYY-MM-DD");

    const variables = {
      startDate,
      endDate,
    };

    historyRefetch({ ...variables, limit: 5, reverse: false });
  };

  const goToPrevMonth = () => {
    month -= 1;
    if (month < 1) {
      month = 12;
      year -= 1;
    }

    const newMonthYear = `${month} ${year}`;

    let monthStart = moment(newMonthYear, "MM YYYY")
      .startOf("month")
      .format("DD-MM-YYYY");

    monthName = moment(newMonthYear, "MM YYYY").startOf("month").format("MMMM");
    onStartMonthChanged(monthStart);
  };

  const goToNextMonth = () => {
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
    const newMonthYear = `${month} ${year}`;

    let monthStart = moment(newMonthYear, "MM YYYY")
      .startOf("month")
      .format("DD-MM-YYYY");

    monthName = moment(newMonthYear, "MM YYYY").startOf("month").format("MMMM");

    onStartMonthChanged(monthStart);
  };

  const userCheckinHistory = historyData && historyData.userCheckinHistory;

  return (
    <View style={styles.container}>
      <CheckinCalendarMonthSection
        goToPrevMonth={goToPrevMonth}
        goToNextMonth={goToNextMonth}
        monthName={monthName}
        year={year}
      />
      <div>
        <CheckinList userCheckinHistory={userCheckinHistory} />
      </div>
    </View>
  );
};
export default CheckinMonthlyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
