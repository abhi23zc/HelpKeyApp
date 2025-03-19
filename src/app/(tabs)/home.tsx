import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/contants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Search from "@/src/components/Search/Search";
import Location_modal from "@/src/modals/Location_modal";
import HotelCard from "@/src/components/Card/HotelCard";
import { MotiScrollView, ScrollView } from "moti";

export default function Home() {
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

  return (
    <MotiScrollView>
      
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient
        colors={["rgb(5, 5, 40)", "rgb(0, 60, 150)"]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={require("../../../assets/images/main/profile.png")}
          />

          <View style={styles.locationContainer}>
            <Entypo name="location-pin" size={17} color="white" />
            <Text style={styles.locationText}>Jakarta, Indonesia</Text>
          </View>

          <Ionicons name="notifications" size={19} color="white" />
        </View>

        {/* Title Section */}

        <View style={{ marginLeft: 30 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.cardTitle}>Find </Text>
            <Text style={[styles.cardTitle, { fontWeight: "bold" }]}>
              Hotels, Villas,{" "}
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={[styles.cardTitle, { fontWeight: "bold" }]}>
              Lodging,{" "}
            </Text>
            <Text style={styles.cardTitle}>that are around you!</Text>
          </View>
        </View>

        {/* Search Bar */}
        <Search />
      </LinearGradient>

      <View style={{
        padding:10
      }}>
        <View style={styles.popularHotelContainer}>
          <Text style={styles.popularHotelTitle}>Popular Hotel</Text>
          <Text style={styles.seeAllText}>See all</Text>
        </View>
        <FlatList
          data={recentlyViewed}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ marginRight: 10 }}>
              <HotelCard hotel={item} isLarge={true} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>
   
    </SafeAreaView>
    </MotiScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  linearGradient: {
    // borderBottomRightRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    height: 530,
  },
  header: {
    flexDirection: "row",
    margin: 30,
    marginTop: 40,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  locationContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  locationText: {
    color: Colors.WHITE,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  titleContainer: {
    marginLeft: 30,
    // marginTop: 10,
  },
  cardTitle: {
    fontSize: 23,
    color: "#fff",
  },
 
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  popularHotelContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    
  },
  popularHotelTitle: {
    fontWeight: "500",
    fontSize: 22,
  },
  seeAllText: {
    color: "#007ACC",
  },
});
