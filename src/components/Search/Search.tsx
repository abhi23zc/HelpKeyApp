import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import LocationModal from "@/src/modals/Location_modal";
import DateModal from "@/src/modals/DateModal";
import GuestModal from "@/src/modals/GuestModal";
import { router } from "expo-router";

export default function Search() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [isGuestModalVisible, setGuestModalVisible] = useState(false);

  const [checkInValue, setcheckInValue] = useState("")
  const [checkInDate, setcheckInDate] = useState("Select Date");
  const [checkOutDate, setcheckOutDate] = useState("Select Date");
  const [guestCount, setGuestCount] = useState("Add Guest");

  return (
    <View style={styles.searchContainer}>
      {isModalVisible && (
        <LocationModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
      )}
      {isDateModalVisible && (
        <DateModal
          isModalVisible={isDateModalVisible}
          setModalVisible={setDateModalVisible}
          setcheckInDate={setcheckInDate}
          value={checkInValue}
          setcheckOutDate={setcheckOutDate}
        />
      )}
      {isGuestModalVisible && (
        <GuestModal isGuestModalVisible={isGuestModalVisible} setGuestModalVisible={setGuestModalVisible} />
      )}

      <Text style={styles.label}>Location</Text>
      <View style={styles.searchInput} onTouchEnd={() => setModalVisible(true)}>
        <Feather name="map-pin" size={20} color="gray" style={{ marginLeft: 10 }} />
        <Text style={styles.textPlaceholder}>Search for hotels, villas...</Text>
      </View>

      <View style={styles.rowContainer}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={styles.label}>Check in</Text>
          <View style={styles.searchInputSmall} onTouchStart={() => {
            setcheckInValue("checkin")
            setDateModalVisible(true)}
            }>
            <Fontisto name="date" size={15} color="black" style={{ marginLeft: 10 }} />
            <Text style={styles.textPlaceholder}>{checkInDate}</Text>
          </View>
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.label}>Check out</Text>
          <View style={styles.searchInputSmall} onTouchStart={() => {
            setcheckInValue("checkout")
            setDateModalVisible(true)}
            }>
            <Fontisto name="date" size={15} color="black" style={{ marginLeft: 10 }} />
            <Text style={styles.textPlaceholder}>{checkOutDate}</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, margin: 10 }}>
        <Text style={styles.label}>Add Guest</Text>
        <View style={styles.searchInputSmall} onTouchEnd={() => setGuestModalVisible(true)}>
          <AntDesign name="adduser" size={15} color="black" style={{ marginLeft: 10 }} />
          <Text style={styles.textPlaceholder}>{guestCount}</Text>
        </View>
      </View>

      <View style={styles.searchButtonContainer} onTouchStart={()=>{
        router.push("/product/List")
      }}>
        <LinearGradient colors={["#007ACC", "#0056B3"]} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    height: 330,
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 10,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  searchInputSmall: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  textPlaceholder: {
    flex: 1,
    color: "gray",
    fontSize: 14,
    marginLeft: 10,
  },
  searchButtonContainer: {
    marginBottom: 10,
    marginHorizontal: 15,
  },
  searchButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
