import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HotelCardSmall from "@/src/components/Card/HotelCardSmall";
import { MotiScrollView } from "moti";
import { useSelector } from "react-redux";

// Sample favorites collection data
const hotels = [
  {
    id: 1,
    name: "Raj Palace",
    location: "Udaipur, Rajasthan",
    price: 38,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6",
  },
  {
    id: 2,
    name: "Maharaja's Retreat",
    location: "Udaipur, Rajasthan",
    price: 29,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
  },
  {
    id: 3,
    name: "Taj Mahal Palace",
    location: "Agra, Uttar Pradesh",
    price: 35,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
  },
  {
    id: 4,
    name: "Golden Temple Inn",
    location: "Agra, Uttar Pradesh",
    price: 35,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
  },
];

export default function Favorite() {
  const [searchQuery, setSearchQuery] = useState("");

  const {vendors} = useSelector(state=>state.vendor)
  const [favouriteVendors, setfavouriteVendors] = useState([])

  useEffect(() => {
    
    let arr = vendors.slice(0,4)
    setfavouriteVendors(arr) // Fetch from api  
  }, [])
  


  const filteredHotels = favouriteVendors.filter((hotel) =>
    hotel?.servicename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <MotiScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>My Favorites</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search-outline"
              size={20}
              style={styles.searchIcon}
              color="#757575"
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search collection"
              placeholderTextColor="#757575"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Hotel List */}
        <FlatList
          contentContainerStyle={styles.collectionsGrid}
          data={filteredHotels}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => <HotelCardSmall hotel={item} isFav={true} />}
        />
      </MotiScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: StatusBar.currentHeight,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#F5F5F5",
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  collectionsGrid: {
    gap: 10,
    alignItems: "center",
  },
});