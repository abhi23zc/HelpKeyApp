import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import LocationSearch from "./LocationSearch";
import HotelCard from "../Card/HotelCard";


const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : Dimensions.get("window").height;

export default function HotelSearchScreen({
  isModalVisible,
  setModalVisible,
}: {
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) {
  // Latest search data
  const latestSearches: string[] = [
    "Hotel Mumbai",
    "Delhi",
    "Villa Goa",
    "The Taj Mahal Palace",
    "Bangalore",
    "Hyderabad",
  ];

  // Recommendation data
  const recommendations: {
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
      name: "The Oberoi Udaivilas",
      location: "Udaipur, Rajasthan",
      price: 29,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
    },
  ];

  // Recently viewed data
  const recentlyViewed: {
    id: number;
    name: string;
    location: string;
    price: number;
    rating: number;
    image: string;
  }[] = [
    {
      id: 1,
      name: "The Imperial Palace",
      location: "New Delhi",
      price: 50,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db",
    },
    {
      id: 2,
      name: "The Leela Palace",
      location: "Bangalore",
      price: 48,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
    },
  ];

  // Search tag component
  const SearchTag = ({ text }: { text: string }) => (
    <TouchableOpacity style={styles.searchTag}>
      <Text style={styles.searchTagText}>{text}</Text>
    </TouchableOpacity>
  );

  // Hotel card component

  const [locationModal, setlocationModal] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <LocationSearch
        modalVisible={locationModal}
        setModalVisible={setlocationModal}
      />
      <StatusBar barStyle="dark-content" />

      {/* Header with back button and search */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
          onPress={()=>{
            setlocationModal(true)
          }}
            style={styles.searchInput}
            placeholder="Search hotel or location"
            placeholderTextColor="#999"
            editable={true}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Latest Search Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Search</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagsContainer}
          >
            {latestSearches.map((search, index) => (
              <SearchTag key={index} text={search} />
            ))}
          </ScrollView>
        </View>

        {/* Recommendations Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recommendationsContainer}
          >
            {recommendations.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </ScrollView>
        </View>

        {/* Recently Viewed Section */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>

          {recentlyViewed.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} isLarge={false} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 0 : 8, // Adjusted for iOS status bar
    paddingBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    marginLeft: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  content: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  lastSection: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: "#08A4BD",
    fontWeight: "500",
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: -8,
  },
  searchTag: {
    backgroundColor: "#F0F9FA",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  searchTagText: {
    color: "#08A4BD",
    fontSize: 14,
  },
  recommendationsContainer: {
    flexDirection: "row",
  },
  hotelCard: {
    width: 240,
    borderRadius: 12,
    backgroundColor: "#FFF",
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hotelImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    padding: 6,
  },
  hotelInfo: {
    padding: 12,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  priceRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#08A4BD",
  },
  nightText: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#999",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 4,
  },
  recentHotelCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentHotelImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  recentHotelInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  recentHotelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recentHotelName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  recentLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  recentLocationText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  recentPriceRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recentPriceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#08A4BD",
  },
  recentNightText: {
    fontSize: 10,
    fontWeight: "normal",
    color: "#999",
  },
  recentRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  recentRatingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 4,
  },
});
