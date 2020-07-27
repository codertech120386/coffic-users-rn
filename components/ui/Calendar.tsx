import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";

import { ICalendarProps } from "../../ts-types";
import CheckinCalendarMonthSection from "../checkin-history-screen/CheckinCalendarMonthSection";
import { CustomText } from "./CustomText";
import defaultStyles, { Colors } from "../../AppCss";
import { FONTSTYLES } from "../../constants";

let dayInitials: string[] = ["S", "M", "T", "W", "T", "F", "S"];

const startOfMonthMoment = moment().startOf("month");
let monthName: string = startOfMonthMoment.format("MMMM");
let datesOfMonth: any[] = [];
let date: number = +startOfMonthMoment.format("DD");
let month: number = +startOfMonthMoment.format("MM");
let year: number = +startOfMonthMoment.format("YYYY");

const Calendar = ({ onDateChange, plan }: ICalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("DD-MM-YYYY")
  );
  const [endDate, setEndDate] = useState<any>(null);
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

  useEffect(() => {
    if (plan) {
      const selectedDateMoment = moment(selectedDate, "DD-MM-YYYY");

      const [, duration] = plan.split("-");
      const durationInDays: number = +duration;

      let calculatedEndDate = getEndDate(durationInDays, selectedDateMoment);

      setEndDate(calculatedEndDate);
    }
  }, [plan, selectedDate]);

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

  const getFormattedDateObject = (dateMoment: any) => {
    return {
      value: +dateMoment.format("DD"),
      day: dateMoment.format("dddd"),
      month: +dateMoment.format("MM"),
      fullDate: dateMoment.format("DD-MM-YYYY"),
    };
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

  const settingClassesForCalendar = (date: any) => {
    let innerClasses =
      !endDate && selectedDate === date.fullDate ? { ...styles.selected } : {};
    let outerClasses =
      (!endDate && selectedDate === date.fullDate) ||
      isDateInSubscription(date.fullDate)
        ? { ...styles.outerSelected }
        : {};

    return [innerClasses, outerClasses];
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

    // fetching the first and last dates of the month
    const startOfMonthMoment = moment(monthStart, "DD-MM-YYYY");

    let totalDays = getTotalDays();

    datesOfMonth = [getFormattedDateObject(startOfMonthMoment)];

    let currentDate = startOfMonthMoment;

    // Getting all the future dates
    for (let i = 1; i < totalDays; i++) {
      let nextDate = moment(currentDate).add(1, "days");
      let dateObject = getFormattedDateObject(nextDate);
      datesOfMonth.push(dateObject);
      currentDate = nextDate;
    }
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
  };

  const onSelectDate = (date: any) => {
    let newDate = moment(`${date}-${month}`, "DD-MM").format("DD-MM-YYYY");

    let calculatedEndDate;

    if (plan) {
      const selectedDateMoment = moment(newDate, "DD-MM-YYYY");
      const [, duration] = plan.split("-");
      // const durationInDays: number = +duration;

      calculatedEndDate = selectedDateMoment
        .add(+duration, "days")
        .subtract(1, "days")
        .format("DD-MM-YYYY");

      setEndDate(calculatedEndDate);
    }
    setSelectedDate(newDate);
    populateDates();
    onDateChange(newDate, calculatedEndDate);
  };

  const getEndDate = (durationInDays: any, selectedDateMoment: any) => {
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

    return finalDatesOfMonth.map((d: any, i) => {
      let [innerClasses, outerClasses] = settingClassesForCalendar(d);

      if (d.date === 0) {
        return <View style={{ width: "14%" }} key={i}></View>;
      } else if (
        moment(d.fullDate, "DD-MM-YYYY").isBefore(
          moment().subtract(1, "days")
        ) ||
        moment(d.fullDate, "DD-MM-YYYY").isAfter(moment().add(3, "M"))
      ) {
        return (
          <TouchableOpacity
            style={{ ...styles.datesContainer, ...innerClasses }}
            onPress={() => onSelectDate(d.date)}
            key={i}
          >
            <CustomText style={{ ...defaultStyles.small, ...styles.dateText }}>
              {d.date}
            </CustomText>
          </TouchableOpacity>
        );
      } else if (isDateInSubscription(d.fullDate)) {
        if (d.fullDate === selectedDate && d.fullDate === endDate) {
          outerClasses = {
            ...outerClasses,
            ...styles.first,
            ...styles.last,
          };
        } else if (d.fullDate === selectedDate) {
          outerClasses = {
            ...outerClasses,
            ...styles.first,
          };
        } else if (d.fullDate === endDate) {
          outerClasses = {
            ...outerClasses,
            ...styles.last,
          };
        }
        return (
          <TouchableOpacity
            style={{ ...styles.datesContainer, ...outerClasses }}
            onPress={() => onSelectDate(d.date)}
            key={i}
          >
            <CustomText
              style={{
                ...defaultStyles.small,
                ...styles.dateText,
                color: "white",
                fontFamily: FONTSTYLES.semiBold,
              }}
            >
              {d.date}
            </CustomText>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={{ ...styles.datesContainer, ...innerClasses }}
            onPress={() => onSelectDate(d.date)}
            key={i}
          >
            <CustomText style={{ ...defaultStyles.small, ...styles.dateText }}>
              {d.date}
            </CustomText>
          </TouchableOpacity>
        );
      }
    });
  };

  const isDateInSubscription = (passedDate: any) => {
    if (passedDate && selectedDate && endDate) {
      const [
        passedDateNumber,
        passedMonthNumber,
        passedYearNumber,
      ] = getDateMonthYear(passedDate);

      const [
        selectedDateNumber,
        selectedMonthNumber,
        selectedYearNumber,
      ] = getDateMonthYear(selectedDate);

      let [endDateNumber, endMonthNumber, endYearNumber] = getDateMonthYear(
        endDate
      );

      if (passedMonthNumber != selectedMonthNumber) {
        if (passedMonthNumber > selectedMonthNumber) {
          if (endMonthNumber > passedMonthNumber) {
            [
              endDateNumber,
              endMonthNumber,
              endYearNumber,
            ] = formattedEndDateMonthYear(monthStart);
          } else if (passedMonthNumber === endMonthNumber) {
            [endDateNumber, endMonthNumber, endYearNumber] = getDateMonthYear(
              endDate
            );
          }
        }
      } else {
        if (endMonthNumber > selectedMonthNumber) {
          [
            endDateNumber,
            endMonthNumber,
            endYearNumber,
          ] = formattedEndDateMonthYear(selectedDate);
        }
      }

      if (
        passedYearNumber < selectedYearNumber ||
        passedYearNumber > endYearNumber
      ) {
        return false;
      } else if (
        passedYearNumber >= selectedYearNumber &&
        passedYearNumber <= endYearNumber
      ) {
        if (
          passedYearNumber > selectedYearNumber ||
          passedYearNumber < endYearNumber
        ) {
          return true;
        } else if (
          passedMonthNumber < selectedMonthNumber ||
          passedMonthNumber > endMonthNumber
        ) {
          return false;
        } else if (
          passedMonthNumber >= selectedMonthNumber &&
          passedMonthNumber <= endMonthNumber
        ) {
          if (
            passedMonthNumber > selectedMonthNumber &&
            passedMonthNumber < endMonthNumber
          ) {
            return true;
          } else if (
            passedMonthNumber === selectedMonthNumber &&
            passedDateNumber >= selectedDateNumber &&
            passedDateNumber <= endDateNumber
          ) {
            return true;
          } else if (
            passedMonthNumber > selectedMonthNumber &&
            passedDateNumber <= endDateNumber
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  };

  const getDateMonthYear = (passedDate: any) => {
    const passedDateArray = passedDate.split("-");

    return [+passedDateArray[0], passedDateArray[1], passedDateArray[2]];
  };

  const formattedEndDateMonthYear = (date: any) => {
    const dateMoment = moment(date, "DD-MM-YYYY").endOf("month");
    return [
      +dateMoment.format("DD"),
      +dateMoment.format("MM"),
      +dateMoment.format("YYYY"),
    ];
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
export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
    marginLeft: 10,
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
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    fontFamily: FONTSTYLES.semiBold,
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
  outerSelected: {
    backgroundColor: Colors.primary,
    color: "white",
    fontFamily: "montserrat-bold",
  },
  first: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  last: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  checkedInIOSDate: {},
  checkedInDate: {},
});
