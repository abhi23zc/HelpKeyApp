import React, { useState } from "react";
import Modal from "react-native-modal";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { MotiView } from "moti";
import { Calendar } from "react-native-calendars";
import { X } from "lucide-react-native";
import { MotiPressable } from 'moti/interactions'

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

  const handleConfirm = () => {
    if (!selectedDate) return;
    value === "checkin" ? setcheckInDate(selectedDate) : setcheckOutDate(selectedDate);
    setModalVisible(false);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      style={{ margin: 0, justifyContent: "flex-end" }}
      backdropTransitionOutTiming={0}
    >
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 50 }}
        transition={{ type: "spring", duration: 400 }}
        style={styles.modalContainer}
      >
        {/* Close Button */}
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
          <X size={20} color="#333" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Pick a Date</Text>

        {/* Calendar */}
        <Calendar
          onDayPress={(day: any) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#3b82f6" },
          }}
          theme={calendarTheme}
        />

        {/* Confirm Button */}
        <MotiPressable
          onPress={handleConfirm}
          animate={({ hovered, pressed }) => {
            return {
              scale: pressed ? 0.97 : hovered ? 1.02 : 1,
              opacity: pressed ? 0.8 : 1,
            };
          }}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </MotiPressable>
      </MotiView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 30,
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
    padding: 6,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#111",
    marginVertical: 20,
  },
  confirmButton: {
    marginTop: 25,
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.5,
  },
});

const calendarTheme = {
  backgroundColor: "#fff",
  calendarBackground: "#fff",
  textSectionTitleColor: "#94a3b8",
  selectedDayBackgroundColor: "#3b82f6",
  selectedDayTextColor: "#fff",
  todayTextColor: "#2563eb",
  dayTextColor: "#1e293b",
  textDisabledColor: "#cbd5e1",
  arrowColor: "#3b82f6",
  monthTextColor: "#1d4ed8",
  indicatorColor: "#3b82f6",
  textDayFontFamily: "System",
  textMonthFontFamily: "System",
  textDayHeaderFontFamily: "System",
  textDayFontSize: 16,
  textMonthFontSize: 18,
  textDayHeaderFontSize: 14,
};
