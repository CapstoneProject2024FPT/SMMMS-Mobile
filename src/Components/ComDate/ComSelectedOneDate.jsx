import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";

export default function ComSelectedOneDate({ date, openPopUp }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = moment().format("YYYY-MM-DD");

  const handleDayPress = (day) => {
    const selectedDateMoment = moment(day.dateString);
    const now = moment();

    // Calculate the next two business days (excluding weekends)
    const nextTwoBusinessDays = [];
    let tempDate = now.clone();
    while (nextTwoBusinessDays.length < 2) {
      tempDate.add(1, "days");
      if (tempDate.isoWeekday() !== 6 && tempDate.isoWeekday() !== 7) {
        nextTwoBusinessDays.push(tempDate.clone());
      }
    }

    // Include today in the valid date range
    const validDates = [now, ...nextTwoBusinessDays];

    // Check if selected date is today or within the next two business days
    const isValidDate = validDates.some((date) =>
      date.isSame(selectedDateMoment, "day")
    );
    if (!isValidDate) {
      return; // Do not allow selecting dates outside the allowed range
    }

    // If already selected, deselect
    if (selectedDate && selectedDate === day.dateString) {
      setSelectedDate(null);
      date(null);
    } else {
      setSelectedDate(day.dateString); // Select the new date
      date(day.dateString);
    }
  };

  const disableWeekends = (date) => {
    const day = new Date(date).getDay();
    return day === 0 || day === 6;
  };

  const generateDisabledDates = () => {
    let disabledDates = {};
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 1);

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      if (disableWeekends(date)) {
        const formattedDate = date.toISOString().split("T")[0];
        disabledDates[formattedDate] = { disabled: true };
      }
    }

    return disabledDates;
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => openPopUp()}
        style={styles.backIconContainer}
      >
        <Image source={backArrowWhite} style={styles.backIcon} />
      </TouchableOpacity>
      <Calendar
        style={{ marginTop: "20%" }}
        onDayPress={handleDayPress}
        markedDates={{
          ...generateDisabledDates(),
          [selectedDate]: { selected: true, selectedColor: "#33B39C" },
        }}
        minDate={today} // Do not allow past dates
        hideExtraDays={true}
      />
      <TouchableOpacity
        onPress={() => openPopUp()}
        style={{ alignItems: "center" }}
      >
        <Text style={styles.confirmBtn}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backIconContainer: {
    position: "absolute",
    zIndex: 100,
    marginTop: 30,
    marginLeft: 10,
    padding: 3,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backIcon: {
    width: 50,
    height: 50,
  },
  confirmBtn: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    textAlign: "center",
  },
});
