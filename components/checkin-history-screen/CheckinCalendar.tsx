import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import moment from "moment";

import { ICheckinCalendarProps } from "../../ts-types";
import CheckinCalendarMonthSection from "./CheckinCalendarMonthSection";
import { CustomText } from "../ui/CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import { Entypo } from "@expo/vector-icons";

let dayInitials: string[] = ["S", "M", "T", "W", "T", "F", "S"];

const startOfMonthMoment = moment().startOf("month");
let monthName: string = startOfMonthMoment.format("MMMM");
let datesOfMonth: any[] = [];
let date: number = +startOfMonthMoment.format("DD");
let month: number = +startOfMonthMoment.format("MM");
let year: number = +startOfMonthMoment.format("YYYY");

const CheckinCalendar = (props: ICheckinCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("DD-MM-YYYY")
  );
  const [monthStart, setMonthStart] = useState<any>(
    moment().startOf("month").format("DD-MM-YYYY")
  );

  let days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getFormattedDateObject = (dateMoment: any) => {
    return {
      value: +dateMoment.format("DD"),
      day: dateMoment.format("dddd"),
      month: +dateMoment.format("MM"),
      fullDate: dateMoment.format("DD-MM-YYYY"),
    };
  };

  const getTotalDays = () => {
    let totalDays = 31;
    if (
      monthName === "April" ||
      monthName === "June" ||
      monthName === "September" ||
      monthName === "November"
    ) {
      totalDays = 30;
    } else if (monthName === "February" && year % 4 === 0) {
      totalDays = 29;
    } else if (monthName === "February") {
      totalDays = 28;
    }

    return totalDays;
  };

  const getDatesOfMonth = () => {
    const startOfMonthMoment = moment(monthStart, "DD-MM-YYYY");
    datesOfMonth = [getFormattedDateObject(startOfMonthMoment)];
    let currentDate = startOfMonthMoment;

    // Getting all the future dates
    for (let i = 1; i < getTotalDays(); i++) {
      let nextDate = moment(currentDate).add(1, "days");
      let dateObject = getFormattedDateObject(nextDate);
      datesOfMonth.push(dateObject);
      currentDate = nextDate;
    }
  };

  const generateDateString = () => {
    return (
      year.toString() +
      "-" +
      month.toString().padStart(2, "0") +
      "-" +
      date.toString().padStart(2, "0")
    );
  };

  const populateDates = () => {
    const selectedDateMoment = moment(selectedDate, "DD-MM-YYYY");
    if (
      monthStart == selectedDateMoment.startOf("month").format("DD-MM-YYYY")
    ) {
      monthName = moment(selectedDate, "DD-MM-YYYY").format("MMMM");
      date = +moment(selectedDate, "DD-MM-YYYY").format("DD");
      month = +moment(selectedDate, "DD-MM-YYYY").format("MM");
      year = +moment(selectedDate, "DD-MM-YYYY").format("YYYY");
    } else {
      monthName = moment(monthStart, "DD-MM-YYYY").format("MMMM");
      date = +moment(monthStart, "DD-MM-YYYY").format("DD");
      month = +moment(monthStart, "DD-MM-YYYY").format("MM");
      year = +moment(monthStart, "DD-MM-YYYY").format("YYYY");
    }

    getDatesOfMonth();
  };

  const goToPrevMonth = () => {
    month -= 1;
    if (month < 1) {
      month = 12;
      year -= 1;
    }

    let dateString: string = generateDateString();

    let prevMonthStart = moment(dateString)
      .startOf("month")
      .format("DD-MM-YYYY");

    setMonthStart(prevMonthStart);
    populateDates();
    props.onStartMonthChanged(prevMonthStart);
  };

  const goToNextMonth = () => {
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
    let dateString: string = generateDateString();
    let nextMonthStart = moment(dateString)
      .startOf("month")
      .format("DD-MM-YYYY");

    setMonthStart(nextMonthStart);
    props.onStartMonthChanged(nextMonthStart);
  };

  const displayCalendar = () => {
    let found = false;
    let finalDatesOfMonth: any[] = [];

    for (let i = 0; i < datesOfMonth.length; i++) {
      if (i === 0) {
        for (let j = 0; j < days.length; j++) {
          let day = days[j];
          // skipping all days before first of Month
          if (datesOfMonth[i].day !== day && !found) {
            let dateObject = {
              date: 0,
              fullDate: null,
            };
            finalDatesOfMonth.push(dateObject);
          } else {
            if (!found) {
              let dateObject = {
                date: datesOfMonth[i].value,
                fullDate: datesOfMonth[i].fullDate,
              };
              finalDatesOfMonth.push(dateObject);
            }
            found = true;
          }
        }
      } else {
        let dateObject = {
          date: datesOfMonth[i].value,
          fullDate: datesOfMonth[i].fullDate,
        };
        finalDatesOfMonth.push(dateObject);
      }
    }

    const onSelectDate = (date: any) => {
      let newDate = moment(`${date}-${month}`, "DD-MM").format("DD-MM-YYYY");
      setSelectedDate(newDate);
      populateDates();
      props.onDateChange(newDate);
    };

    const settingClassesForCalendar = (date: any) => {
      return selectedDate === date.fullDate ? { ...styles.selected } : {};
    };

    return finalDatesOfMonth.map((d: any, i) => {
      let innerClasses = settingClassesForCalendar(d);
      const checkedInDates =
        props.dateData &&
        props.dateData.userCheckedinDates.map((checkin: any) =>
          moment(checkin.checked_in_date, "YYYY-MM-DD").format("DD-MM-YYYY")
        );

      if (d.date === 0) {
        return <View style={{ width: "14%" }} key={i}></View>;
      } else {
        if (
          d.fullDate === selectedDate &&
          checkedInDates &&
          checkedInDates.includes(d.fullDate)
        ) {
          innerClasses =
            Platform.OS === "ios"
              ? {
                  ...innerClasses,
                  ...styles.selected,
                  ...styles.checkedInIOSDate,
                }
              : {
                  ...innerClasses,
                  ...styles.selected,
                  ...styles.checkedInDate,
                };
          return (
            <TouchableOpacity
              style={{ ...styles.datesContainer, ...innerClasses }}
              onPress={() => onSelectDate(d.date)}
              key={i}
            >
              <View style={{ maxHeight: "50%" }}>
                <CustomText
                  style={{
                    ...defaultStyles.small,
                    ...styles.dateText,
                    color: "white",
                    fontFamily: "montserrat-bold",
                  }}
                >
                  {d.date}
                </CustomText>
                <Entypo
                  name="dot-single"
                  size={24}
                  color="white"
                  style={{ padding: 0, marginTop: -6 }}
                />
              </View>
            </TouchableOpacity>
          );
        } else if (d.fullDate === selectedDate) {
          innerClasses = {
            ...innerClasses,
            ...styles.selected,
          };
          return (
            <TouchableOpacity
              style={{ ...styles.datesContainer, ...innerClasses }}
              onPress={() => onSelectDate(d.date)}
              key={i}
            >
              <CustomText
                style={{
                  ...defaultStyles.small,
                  ...styles.dateText,
                  color: "white",
                  fontFamily: "montserrat-bold",
                }}
              >
                {d.date}
              </CustomText>
            </TouchableOpacity>
          );
        } else if (checkedInDates && checkedInDates.includes(d.fullDate)) {
          innerClasses =
            Platform.OS === "ios"
              ? {
                  ...innerClasses,
                  ...styles.checkedInIOSDate,
                }
              : {
                  ...innerClasses,
                  ...styles.checkedInDate,
                };

          return (
            <TouchableOpacity
              style={{ ...styles.datesContainer, ...innerClasses }}
              onPress={() => onSelectDate(d.date)}
              key={i}
            >
              <View style={{ maxHeight: "50%" }}>
                <CustomText
                  style={{ ...defaultStyles.small, ...styles.dateText }}
                >
                  {d.date}
                </CustomText>
                <Entypo
                  name="dot-single"
                  size={24}
                  color={Colors.primary}
                  style={{ padding: 0, marginTop: -5 }}
                />
              </View>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              style={{ ...styles.datesContainer, ...innerClasses }}
              onPress={() => onSelectDate(d.date)}
              key={i}
            >
              <CustomText
                style={{ ...defaultStyles.small, ...styles.dateText }}
              >
                {d.date}
              </CustomText>
            </TouchableOpacity>
          );
        }
      }
    });
  };

  populateDates();
  return (
    <View style={styles.container}>
      <View style={styles.checkInCalendar}>
        <View style={{ height: 50 }}>
          <CheckinCalendarMonthSection
            goToPrevMonth={goToPrevMonth}
            goToNextMonth={goToNextMonth}
            monthName={monthName}
            year={year}
          />
        </View>
        <View style={styles.daysContainer}>
          {dayInitials.map((initial: string, i: number) => (
            <CustomText
              style={{ ...defaultStyles.h6Text, ...styles.initialsText }}
              key={i}
            >
              {initial}
            </CustomText>
          ))}
        </View>
        <View style={styles.displayCalendarContainer}>{displayCalendar()}</View>
      </View>
    </View>
  );
};
export default CheckinCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 50,
  },
  checkInCalendar: {
    width: "100%",
  },
  displayCalendarContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  daysContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 40,
  },
  datesContainer: {
    flexDirection: "row",
    width: "13.5%",
    marginHorizontal: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    fontFamily: "montserrat-bold",
    width: "14%",
    textAlign: "center",
  },
  dateText: {
    width: "100%",
    textAlign: "center",
  },
  selected: {
    fontFamily: "montserrat-bold",
    backgroundColor: Colors.primary,
    color: "white",
    borderRadius: 20,
  },
  checkedInIOSDate: {},
  checkedInDate: {},
});
