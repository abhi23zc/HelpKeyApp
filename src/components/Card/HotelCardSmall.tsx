import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";



const HotelCardSmall = ({
  hotel,
  isLarge = true,
}: {
  hotel: {
    id: number;
    name: string;
    location: string;
    price: number;
    rating: number;
    image: string;
  };
  isLarge?: boolean;
}) => (
  <TouchableOpacity
    onPress={() => {
      // router.push("/(tabs)/List");
    }}
    style={isLarge ? styles.hotelCard : styles.recentHotelCard}
  >
    <Image
      source={{ uri: hotel.image }}
      style={isLarge ? styles.hotelImage : styles.recentHotelImage}
    />
    <TouchableOpacity style={styles.favoriteButton}>
      <Ionicons name="heart-outline" size={20} color="#FFF" />
    </TouchableOpacity>

    {isLarge ? (
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.locationText}>{hotel.location}</Text>
        </View>
        <View style={styles.priceRatingContainer}>
          <Text style={styles.priceText}>
            ${hotel.price}
            <Text style={styles.nightText}>/night</Text>
          </Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{hotel.rating}</Text>
          </View>
        </View>
      </View>
    ) : (
      <View style={styles.recentHotelInfo}>
        <View style={styles.recentHotelHeader}>
          <Text style={styles.recentHotelName}>{hotel.name}</Text>
        </View>
        <View style={styles.recentLocationContainer}>
          <Ionicons name="location-outline" size={12} color="#666" />
          <Text style={styles.recentLocationText}>{hotel.location}</Text>
        </View>
        <View style={styles.recentPriceRatingContainer}>
          <Text style={styles.recentPriceText}>
            ${hotel.price}
            <Text style={styles.recentNightText}>/night</Text>
          </Text>
          <View style={styles.recentRatingContainer}>
            <FontAwesome name="star" size={12} color="#FFD700" />
            <Text style={styles.recentRatingText}>{hotel.rating}</Text>
          </View>
        </View>
      </View>
    )}
  </TouchableOpacity>
);

export default HotelCardSmall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,

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
    width: 160, // Adjusted to fit mobile screen
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
    height: 100, // Adjusted to fit mobile screen
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
    width: 60, // Adjusted to fit mobile screen
    height: 60, // Adjusted to fit mobile screen
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
