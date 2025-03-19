import React, { useState } from "react";
import Modal from "react-native-modal";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { Dimensions, Platform } from "react-native";
import { Calendar } from "react-native-calendars";
import { X } from "lucide-react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function DateModal({
  isModalVisible,
  setModalVisible,
  value,
  setcheckInDate,
  setcheckOutDate,
}: any) {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <Modal
      isVisible={isModalVisible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", duration: 500 }}
        style={styles.modalContainer}
      >
        {/* Close Button */}
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.closeButton}
        >
          <X size={24} color="#333" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Select a Date</Text>

        {/* Calendar */}
        <Calendar
          onDayPress={(day:any) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#5dade2" },
          }}
          theme={calendarTheme}
        />

        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            if (value == "checkin") {
              setcheckInDate(selectedDate);
            } else {
              setcheckOutDate(selectedDate);
            }
            setModalVisible(false);
          }}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </MotiView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 20,
    padding: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#5dade2",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

const calendarTheme = {
  backgroundColor: "#fff",
  calendarBackground: "#fff",
  textSectionTitleColor: "#b6c1cd",
  selectedDayBackgroundColor: "#5dade2",
  selectedDayTextColor: "#ffffff",
  todayTextColor: "#2d98da",
  dayTextColor: "#333",
  textDisabledColor: "#d9e1e8",
  arrowColor: "#5dade2",
  monthTextColor: "#2d98da",
  indicatorColor: "#5dade2",
};
