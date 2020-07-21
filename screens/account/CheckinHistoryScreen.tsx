import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import CheckinCalendar from "../../components/checkin-history-screen/CheckinCalendar";
import CheckinList from "../../components/checkin-history-screen/CheckinList";
import { commonAuthStyles } from "../../styles/CommonAuthStyles";

import { GET_CHECKED_IN_DATES, GET_CHECKED_IN_HISTORY } from "../../queries";

const CheckinHistoryScreen = (props: any) => {
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const variables = {
    startDate,
  };

  const {
    loading: dateLoading,
    error: dateError,
    data: dateData,
    refetch: dateRefetch,
  } = useQuery(GET_CHECKED_IN_DATES, {
    variables: { ...variables, limit: 100 },
  });

  const {
    loading: historyLoading,
    error: historyError,
    data: historyData,
    refetch: historyRefetch,
  } = useQuery(GET_CHECKED_IN_HISTORY, {
    variables: { ...variables, endDate, reverse: true, limit: 5 },
  });

  const onViewAllClicked = () => {
    props.navigation.navigate("CheckinMonthlyList", {
      startDate,
      endDate,
    });
    // history.push({
    //   pathname: "/checkin-monthly-list",
    //   state: {
    //     startDate,
    //     endDate,
    //   },
    // });
  };

  const onStartDateChanged = (newDate: string) => {
    const startDate = moment(newDate, "DD-MM-YYYY").format("YYYY-MM-DD");

    setStartDate(startDate);
    setEndDate(startDate);

    const variables = {
      startDate,
    };
    dateRefetch({ ...variables, limit: 100 });
    historyRefetch({ ...variables, endDate, limit: 5, reverse: true });
  };

  const onStartMonthChanged = (newDate: string) => {
    const startDate = moment(newDate, "DD-MM-YYYY").format("YYYY-MM-DD");
    const endDate = moment(newDate, "DD-MM-YYYY")
      .endOf("month")
      .format("YYYY-MM-DD");
    setStartDate(startDate);
    setEndDate(endDate);

    const variables = {
      startDate,
    };
    dateRefetch({ ...variables, limit: 100 });
    historyRefetch({ ...variables, endDate, limit: 5, reverse: true });
  };

  const userCheckinHistory = historyData && historyData.userCheckinHistory;

  return (
    <View style={styles.container}>
      <View style={{ height: "100%", width: "90%" }}>
        <CheckinCalendar
          dateData={dateData}
          onDateChange={onStartDateChanged}
          onStartMonthChanged={onStartMonthChanged}
        />
        <CheckinList
          userCheckinHistory={userCheckinHistory}
          onViewAllClicked={onViewAllClicked}
          showLimited={true}
        />
      </View>
    </View>
  );
};
export default CheckinHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
  },
});
