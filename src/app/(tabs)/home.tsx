import { Alert } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/contants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import Search from "@/src/components/Search/Search";
import Location_modal from "@/src/modals/Location_modal";
import HotelCard from "@/src/components/Card/HotelCard";
import { MotiScrollView, ScrollView } from "moti";
import { router } from "expo-router";
import { logOut } from "@/src/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { nearByVendors } from "@/src/api/vendor";
import * as Location from 'expo-location';

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

  const dispatch = useDispatch();

  const { vendors } = useSelector(state => state.vendor);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);


  const confirmAction = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            await logOut(dispatch);
            router.replace("/")
          }
        }
      ],
      { cancelable: true }
    );
  };


  async function onLogout() {
    confirmAction()

  }

  const fetchLocation = async () => {

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert("Permission Denied")
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);
    } catch (error) {
      console.log("Error while fetching location")
    }
  };


  useEffect(() => {
    try {
      fetchLocation()
      nearByVendors({
        "latitude": location?.coords?.latitude,
        "longitude": location?.coords?.longitude,
        "city": "kanpur",
        "propertyType": "27"
      }, dispatch)
      // console.log(vendors[0].servicename)
    } catch (e) {
      console.log(e);
    }

  }, [dispatch])


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
            <TouchableOpacity onPress={onLogout}>

              <Image
                style={styles.profileImage}
                source={require("../../../assets/images/main/profile.png")}
              />
            </TouchableOpacity>

            <View style={styles.locationContainer}>
              <Entypo name="location-pin" size={17} color="white" />
              <Text style={styles.locationText}>Jakarta, Indonesia</Text>
            </View>

            <TouchableOpacity onPress={() => {
              router.push("/Notification")
            }}>

              <Ionicons name="notifications" size={19} color="white" />
            </TouchableOpacity>
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
          padding: 10
        }}>
          <View style={styles.popularHotelContainer}>
            <Text style={styles.popularHotelTitle}>Popular Hotel</Text>
            <Text style={styles.seeAllText}>See all</Text>
          </View>
          <FlatList
            data={vendors || recentlyViewed}
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
    flex: 1
  },
  linearGradient: {
    // borderBottomRightRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    height: 530,
    paddingTop: StatusBar.currentHeight,
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
