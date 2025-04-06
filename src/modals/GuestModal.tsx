import React, { useState } from "react";
import Modal from "react-native-modal";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { Dimensions } from "react-native";
import { X } from "lucide-react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function GuestModal({ isGuestModalVisible, setGuestModalVisible , setGuestCount, guestCount}: any) {
  console.log(guestCount)
  const [adults, setAdults] = useState(guestCount?.adults);
  const [children, setChildren] = useState(guestCount?.children);
  const [infants, setInfants] = useState(guestCount?.infants);

  return (
    <Modal
      isVisible={isGuestModalVisible}
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
          onPress={() => setGuestModalVisible(false)}
          style={styles.closeButton}
        >
          <X size={24} color="#333" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Select Guest</Text>

        {/* Guest Categories */}
        {renderGuestOption("Adults", "Ages 13 or above", guestCount?.adults, setGuestCount)}
        {renderGuestOption("Children", "Ages 2 - 12", guestCount?.children, setGuestCount)}
        {renderGuestOption("Infants", "Ages under 2", guestCount?.infants, setGuestCount)}

        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.confirmButton}
         onPress={()=>{
          setGuestModalVisible(false)
         }}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </MotiView>
    </Modal>
  );
}

const renderGuestOption = (label: string, subLabel: string, count: number, setCount: Function) => (
  <View style={styles.guestRow}>
    <View>
      <Text style={styles.guestLabel}>{label}</Text>
      <Text style={styles.guestSubLabel}>{subLabel}</Text>
    </View>
    <View style={styles.counter}>
      <TouchableOpacity
        style={styles.counterButton}
        onPress={() => {
          if (label === "Adults") {
            setCount((prev: any) => ({ ...prev, adults: Math.max(0, count - 1) }));
          } else if (label === "Children") {
            setCount((prev: any) => ({ ...prev, children: Math.max(0, count - 1) }));
          } else if (label === "Infants") {
            setCount((prev: any) => ({ ...prev, infants: Math.max(0, count - 1) }));
          }
        }}
      >
        <Text style={styles.counterText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity
        style={styles.counterButton}
        onPress={() => {
          if (label === "Adults") {
            setCount((prev: any) => ({ ...prev, adults: count + 1 }));
          } else if (label === "Children") {
            setCount((prev: any) => ({ ...prev, children: count + 1 }));
          } else if (label === "Infants") {
            setCount((prev: any) => ({ ...prev, infants: count + 1 }));
          }
        }}
      >
        <Text style={styles.counterText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

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
  guestRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  guestLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  guestSubLabel: {
    fontSize: 14,
    color: "#888",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    width: 35,
    height: 35,
    backgroundColor: "#e0f0ff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  count: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
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

