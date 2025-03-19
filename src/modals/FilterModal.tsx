import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MotiView } from "moti";
import { Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface Facility {
  wifi: boolean;
  swimming: boolean;
  airConditioner: boolean;
  laundry: boolean;
  television: boolean;
  gym: boolean;
  heater: boolean;
}

const FilterModal = ({ isFilterModal, setisFilterModal }: any) => {
  const [selectedRating, setSelectedRating] = useState<number>(4);
  const [minPrice, setMinPrice] = useState<string>("$10");
  const [maxPrice, setMaxPrice] = useState<string>("$150");
  const [facilities, setFacilities] = useState<Facility>({
    wifi: false,
    swimming: true,
    airConditioner: false,
    laundry: true,
    television: false,
    gym: false,
    heater: true,
  });
  const [propertyType, setPropertyType] = useState<string>("Hotel");

  const toggleFacility = (key: keyof Facility) => {
    setFacilities({ ...facilities, [key]: !facilities[key] });
  };

  return (
    <Modal transparent visible={isFilterModal} animationType="slide">
      <View style={styles.overlay}>
        <MotiView
          from={{ translateY: 500, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "timing", duration: 400 }}
          style={styles.modalContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Filter</Text>
            <TouchableOpacity onPress={()=> setisFilterModal(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Ratings */}
            <Text style={styles.label}>Ratings</Text>
            <View style={styles.ratingContainer}>
              {[5, 4, 3, 2, 1].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.ratingButton,
                    selectedRating === num && styles.selectedRating,
                  ]}
                  onPress={() => setSelectedRating(num)}
                >
                  <Text style={styles.star}>⭐ {num}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Price Range */}
            <Text style={styles.label}>Price</Text>
            <View style={styles.priceContainer}>
              <TextInput
                style={styles.priceInput}
                value={minPrice}
                onChangeText={setMinPrice}
              />
              <TextInput
                style={styles.priceInput}
                value={maxPrice}
                onChangeText={setMaxPrice}
              />
            </View>

            {/* Facilities */}
            <Text style={styles.label}>Facilities</Text>
            <View style={styles.facilityContainer}>
              {Object.keys(facilities).map((key) => (
                <View key={key} style={styles.checkboxContainer}>
                  <Checkbox
                    status={facilities[key as keyof Facility] ? "checked" : "unchecked"}
                    onPress={() => toggleFacility(key as keyof Facility)}
                    color="#008080"
                  />
                  <Text style={styles.checkboxLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Property Type */}
            <Text style={styles.label}>Property Type</Text>
            <View style={styles.propertyTypeContainer}>
              {["Hotel", "Villa", "Apartment", "Resort"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.propertyButton,
                    propertyType === type && styles.selectedProperty,
                  ]}
                  onPress={() => setPropertyType(type)}
                >
                  <Text
                    style={[
                      styles.propertyText,
                      propertyType === type && styles.selectedPropertyText,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Apply Button */}
            <TouchableOpacity style={styles.applyButton} onPress={()=> setisFilterModal(false)}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </ScrollView>
        </MotiView>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  ratingButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 8,
    marginRight: 10,
  },
  selectedRating: {
    borderColor: "#008080",
    backgroundColor: "#E0F7FA",
  },
  star: {
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    width: "45%",
    textAlign: "center",
  },
  facilityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 5,
  },
  propertyTypeContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  propertyButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  selectedProperty: {
    borderColor: "#008080",
    backgroundColor: "#E0F7FA",
  },
  propertyText: {
    fontSize: 14,
  },
  selectedPropertyText: {
    fontWeight: "bold",
  },
  applyButton: {
    backgroundColor: "#008080",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
