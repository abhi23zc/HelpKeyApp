import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, Stack } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;

const HotelScreen = () => {
  // Using reliable image URLs from various sources
  const galleryImages = [
    {
      uri: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      uri: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      uri: "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      uri: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  // Main hotel room image
  const mainImage = {
    uri: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
  };

  const [minLen, setMinLen] = useState(300);
  let descriptionText=
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deserunt unde libero quas perferendis quaerat, voluptas doloribus corporis aspernatur cupiditate eos rerum itaque? Debitis et unde voluptatum sed, possimus libero eligendi nisi magnam rem quo laudantium nulla beatae dolor officia? Atque illum incidunt autem? Sint a veniam incidunt facilis esse? Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus culpa voluptas nemo temporibus veniam nulla quam porro. Nesciunt, fugit rerum.."
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header with Back and Share buttons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{
            // Navigation to previous screen
            router.back()
  
        }} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Main Room Image */}
        <Image source={mainImage} style={styles.mainImage} resizeMode="cover" />

        {/* Gallery Thumbnails */}
        <View style={styles.thumbnailGallery}>
          {galleryImages.map((image, index) => (
            <View key={index} style={styles.thumbnailContainer}>
              <Image source={image} style={styles.thumbnail} />
              {index === galleryImages.length - 1 && (
                <View style={styles.morePhotosOverlay}>
                  <Text style={styles.morePhotosText}>96+</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Hotel Info */}
        <View style={styles.hotelInfoContainer}>
          <View style={styles.hotelTitleRow}>
            <Text style={styles.hotelName}>Hyatt Regency Bali</Text>
            <TouchableOpacity>
              <Ionicons name="heart" size={26} color="#FF3A5E" />
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#777" />
            <Text style={styles.locationText}>
              Jl. Danau Tamblingan No. 89, Sanur, Denpasar
            </Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer} onTouchStart={()=>{
            router.push("product/HotelReview")
          }}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Ionicons
                  key={index}
                  name={index < 5 ? "star" : "star-outline"}
                  size={16}
                  color="#FFB800"
                />
              ))}
            </View>
            <Text style={styles.ratingText}>4.8</Text>
            <Text style={styles.reviewsText}>· 374 reviews</Text>
          </View>

          {/* Facilities */}
          <View style={styles.facilitiesSection}>
            <View style={styles.facilitiesHeader}>
              <Text style={styles.sectionTitle}>Property Facilities</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.facilitiesContainer}>
              <View style={styles.facilityItem}>
                <Ionicons name="wifi" size={22} color="#333" />
                <Text style={styles.facilityText}>Wifi</Text>
              </View>
              <View style={styles.facilityItem}>
                <Ionicons name="water-outline" size={22} color="#333" />
                <Text style={styles.facilityText}>Pool</Text>
              </View>
              <View style={styles.facilityItem}>
              <MaterialCommunityIcons name="beach" size={20} color="black" />
                <Text style={styles.facilityText}>Beach</Text>
              </View>
              <View style={styles.facilityItem}>
                <MaterialCommunityIcons
                  name="air-conditioner"
                  size={22}
                  color="#333"
                />
                <Text style={styles.facilityText}>AC</Text>
              </View>
              <View style={styles.facilityItem}>
                <Ionicons name="fitness-outline" size={22} color="#333" />
                <Text style={styles.facilityText}>Gym</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {descriptionText.substring(0, minLen)}...
            </Text>

            {minLen <= 300 ? (
              <TouchableOpacity onPress={() => {
                setMinLen(descriptionText.length);
              }}>
                <Text style={styles.readMoreText}>Read more</Text>{" "}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={()=>{
                setMinLen(300);
              }}>
                <Text style={styles.readMoreText}>Read less</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Price and Book Now */}
        
        </View>
      </ScrollView>
      <View style={styles.priceBookContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price</Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceAmount}>$56</Text>
                <Text style={styles.priceNight}>/ night</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.bookButton} activeOpacity={0.9}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 10,
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  mainImage: {
    width: SCREEN_WIDTH,
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  thumbnailGallery: {
    flexDirection: "row",
    marginTop: -24,
    marginLeft: 20,
    marginBottom: 10,
  },
  thumbnailContainer: {
    width: 60,
    height: 45,
    marginRight: 8,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  morePhotosOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  morePhotosText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  hotelInfoContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  hotelTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: "#777",
    marginLeft: 4,
    flexShrink: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: "row",
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  reviewsText: {
    fontSize: 14,
    color: "#777",
  },
  facilitiesSection: {
    marginBottom: 24,
  },
  facilitiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#00A8E8",
    fontWeight: "500",
  },
  facilitiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  facilityItem: {
    alignItems: "center",
    width: "18%",
  },
  facilityText: {
    marginTop: 8,
    fontSize: 12,
    color: "#555",
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    color: "#666",
    flex: 1,
    flexWrap: "wrap",
  },
  readMoreText: {
    color: "#00A8E8",
    fontWeight: "500",
  },
  priceBookContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    margin:20,
    borderTopColor: "#F0F0F0",
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  priceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  priceNight: {
    fontSize: 14,
    color: "#888",
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: "#00A8E8",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#00A8E8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  bookButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HotelScreen;
