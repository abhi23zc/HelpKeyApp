import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Search } from "lucide-react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import HotelCardSmall from "@/src/components/Card/HotelCardSmall";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FilterModal from "@/src/modals/FilterModal";
import { useSelector } from "react-redux";
const hotel: {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}[] = [
  {
    id: 1,
    name: "Taj Lake Palace",
    location: "Udaipur, Rajasthan",
    price: 38,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6",
  },
  {
    id: 2,
    name: "The Oberoi Udaivilass",
    location: "Udaipur, Rajasthan",
    price: 29,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
  },
  {
    id: 3,
    name: "The Oberoi Udaivilass",
    location: "Udaipur, Rajasthan",
    price: 29,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
  },
  {
    id: 4,
    name: "The Oberoi Udaivilass",
    location: "Udaipur, Rajasthan",
    price: 29,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
  },
];





export default function List() {
  const {searchVendors} = useSelector(state=> state.vendor)
  const [isFilterModal, setisFilterModal] = useState(false);

  
  const { selectedLocation, error } = useSelector(state => state.vendor)

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          marginBottom: 10,
        }}
      >
        <View
          style={styles.searchHeader}
          onTouchEnd={() => {
            setisFilterModal(true);
          }}
        >
          <Text style={styles.searchText}>{selectedLocation|| "Rajasthan"}, India</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setisFilterModal(true);
          }}
        >
          <FontAwesome name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {isFilterModal && (
        <FilterModal
          isFilterModal={isFilterModal}
          setisFilterModal={setisFilterModal}
        />
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontWeight: 500,
            fontSize: 15,
          }}
        >
          3,478 hotels found
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            {" "}
            Relavance
          </Text>
          <AntDesign name="down" size={15} color="black" />
        </View>
      </View>

      <FlatList
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
          rowGap: 20,
          marginTop: 15,
        }}
        data={searchVendors}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item, index }) => (
          // Fetch from api 
          <HotelCardSmall hotel={item} isLarge={true}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: 50,
  },
  searchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  searchIcon: {
    backgroundColor: "#EAEAEA",
    padding: 8,
    borderRadius: 10,
  },
  propertyCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  propertyImage: {
    width: "100%",
    height: 120,
  },
  propertyDetails: {
    padding: 10,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  propertyLocation: {
    fontSize: 14,
    color: "#777",
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
  },
  navText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
});
