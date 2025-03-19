import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const locations = [
  { type: "location", name: "Kanpur", country: "India" },
  { type: "location", name: "Delhi", country: "India" },
  { type: "location", name: "Jhansi", country: "India" },
  { type: "location", name: "Agra", country: "India" },
  { type: "location", name: "New Delhi", country: "India" },
];

const hotels = [
  { type: "hotel", name: "Bloo Bali Hotel", location: "Kuta, Bali" },
  { type: "hotel", name: "Golden Tulip Resort Bali", location: "Badung, Bali" },
];

const LocationSearch = ({modalVisible, setModalVisible}:any) => {

  const [searchText, setSearchText] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([...locations, ...hotels]);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length > 0) {
      const filtered = [...locations, ...hotels].filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([...locations, ...hotels]);
    }
  };

  return (
    <View style={styles.container}>

      {/* Modal */}
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          {/* Search Bar Inside Modal */}
          <View style={styles.modalSearchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.modalSearchIcon} />
            <TextInput
              style={styles.modalSearchInput}
              placeholder="Search hotel or location"
              placeholderTextColor="#666"
              value={searchText}
              onChangeText={handleSearch}
              autoFocus
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#666" style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          {/* Location List */}
          <FlatList
            data={filteredLocations}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <>
                {filteredLocations.some((item) => item.type === "location") && (
                  <Text style={styles.sectionHeader}>Location</Text>
                )}
              </>
            }
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.locationItem}>
                {item.type === "location" ? (
                  <Ionicons name="location-outline" size={22} color="#444" />
                ) : (
                  <MaterialIcons name="apartment" size={22} color="#444" />
                )}
                <View style={styles.locationText}>
                  <Text style={styles.locationName}>{item.name}</Text>
                  {item.country && <Text style={styles.locationCountry}>{item.country}</Text>}
                </View>
              </TouchableOpacity>
            )}
            
            
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  modalSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    paddingHorizontal:5,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#08A4BD",
  },
  modalSearchIcon: {
    marginRight: 10,
  },
  modalSearchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  closeIcon: {
    marginLeft: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#222",
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  locationText: {
    marginLeft: 10,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  locationCountry: {
    fontSize: 14,
    color: "#777",
  },
});

export default LocationSearch;
