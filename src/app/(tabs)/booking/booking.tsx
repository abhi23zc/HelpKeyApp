import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateModal from '@/src/modals/DateModal';
import GuestModal from '@/src/modals/GuestModal';
import { router } from 'expo-router';


const BookingScreen = () => {
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.95))[0];

  useEffect(() => {

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Active step in booking process
  const [activeStep, setActiveStep] = useState(1);

  const [checkInDate, setcheckInDate] = useState("Select Date");
  const [checkOutDate, setcheckOutDate] = useState("Select Date");
  const [checkInValue, setcheckInValue] = useState("")
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [guestCount, setGuestCount] = useState({
    adults:0,
    children:0,
    infants: 0
  });
  const [isGuestModalVisible, setGuestModalVisible] = useState(false);


  return (
    <SafeAreaView style={styles.container}>

      {/* Date Modal */}
      <DateModal isModalVisible={isDateModalVisible}
        setModalVisible={setDateModalVisible}
        value={checkInValue}
        setcheckInDate={setcheckInDate}
        setcheckOutDate={setcheckOutDate} />

      {isGuestModalVisible && (
        <GuestModal isGuestModalVisible={isGuestModalVisible} guestCount={guestCount} setGuestCount={setGuestCount} setGuestModalVisible={setGuestModalVisible} />
      )}



      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking and Payment</Text>
        <View style={{ width: 24 }} /> {/* Empty view for symmetry */}
      </View>


      {/* Stepper */}
      <View style={styles.stepper}>

        <View style={styles.stepContainer}>
          <View style={[styles.stepCircle, { backgroundColor: '#2CB9B0' }]}>
            <Text style={styles.stepActiveText}>1</Text>
          </View>
          <Text style={[styles.stepText, { color: '#2CB9B0' }]}>Booking</Text>
        </View>

        <View style={styles.stepLine} />
        <View style={styles.stepContainer}>
          <View style={[styles.stepCircle, { backgroundColor: '#E8E8E8' }]}>
            <Text style={styles.stepInactiveText}>2</Text>
          </View>
          <Text style={styles.stepText}>Guest Info</Text>
        </View>


        <View style={styles.stepLine} />
        <View style={styles.stepContainer}>
          <View style={[styles.stepCircle, { backgroundColor: '#E8E8E8' }]}>
            <Text style={styles.stepInactiveText}>3</Text>
          </View>
          <Text style={styles.stepText}>Payment</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          {/* Hotel Card */}
          <View style={styles.hotelCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db' }}
              style={styles.hotelImage}
            />
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelName}>Taj Palace</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.locationText}>New Delhi, India</Text>
              </View>
              <View style={styles.roomRow}>
                <Ionicons name="bed-outline" size={14} color="#666" />
                <Text style={styles.roomText}>Luxury Suite</Text>
              </View>
              <View style={styles.priceRatingRow}>
                <Text style={styles.priceText}>
                  <Text style={styles.priceValue}>₹8,500</Text>/night
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>4.9</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Check in/out */}
          <View style={styles.dateRow}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>Check in</Text>
              <TouchableOpacity style={styles.dateSelector} onPress={() => {
                setcheckInValue("checkin")
                setDateModalVisible(true)
              }}>
                <Ionicons name="calendar-outline" size={20} color="#666" />
                <Text style={styles.datePlaceholder}>{checkInDate || "Select date"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>Check out</Text>
              <TouchableOpacity style={styles.dateSelector} onPress={() => {
                setcheckInValue("checkout")
                setDateModalVisible(true)
              }}>
                <Ionicons name="calendar-outline" size={20} color="#666" />
                <Text style={styles.datePlaceholder}>{checkOutDate || "Select date"}</Text>
              </TouchableOpacity>
            </View>
          </View>


          {/* Rooms and Guests */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Rooms and Guests</Text>
            <TouchableOpacity style={styles.selectorButton} onPress={()=> setGuestModalVisible(true)}>
              <Ionicons name="person-outline" size={20} color="#666" />
              <Text style={styles.selectorPlaceholder}>{guestCount?.adults + guestCount?.children + guestCount?.infants  || "Select room and guest"}</Text>
            </TouchableOpacity>
          </View>

          {/* Additional Request */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Additional Request</Text>
            <TouchableOpacity style={styles.selectorButton}>
              <Ionicons name="chatbox-outline" size={20} color="#666" />
              <Text style={styles.selectorPlaceholder}>Add request</Text>
              <Ionicons name="add" size={20} color="#2CB9B0" style={styles.addIcon} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Next Button */}
      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.nextButton} onPress={()=>{
          router.navigate("/(tabs)/booking/GuestInfo")
        }}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop:StatusBar.currentHeight
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  stepContainer: {
    alignItems: 'center',
    width: 70,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepActiveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  stepInactiveText: {
    color: '#999999',
    fontSize: 12,
    fontWeight: '600',
  },
  stepText: {
    fontSize: 12,
    color: '#666666',
  },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E8E8',
    marginHorizontal: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  hotelCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  hotelImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  hotelInfo: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  roomText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  priceText: {
    fontSize: 12,
    color: '#666666',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2CB9B0',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 2,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dateColumn: {
    width: '48%',
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 24,
  },
  datePlaceholder: {
    fontSize: 14,
    color: '#999999',
    marginLeft: 8,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 24,
  },
  selectorPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#999999',
    marginLeft: 8,
  },
  addIcon: {
    marginLeft: 8,
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  nextButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});

export default BookingScreen;