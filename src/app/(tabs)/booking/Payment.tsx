import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const BookingPaymentScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.98));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking and Payment</Text>
        <View style={{ width: 24 }} /> {/* Empty view for symmetry */}
      </View>

      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <View style={styles.progressStep}>
          <View style={[styles.stepCircle, styles.completedStep]}>
            <Text style={styles.stepText}>1</Text>
          </View>
          <Text style={styles.stepLabel}>Booking</Text>
        </View>
        <View style={styles.progressLine} />
        
        <View style={styles.progressStep}>
          <View style={[styles.stepCircle, styles.completedStep]}>
            <Text style={styles.stepText}>2</Text>
          </View>
          <Text style={styles.stepLabel}>Guest Info</Text>
        </View>
        <View style={styles.progressLine} />
        
        <View style={styles.progressStep}>
          <View style={[styles.stepCircle, styles.activeStep]}>
            <Text style={styles.activeStepText}>3</Text>
          </View>
          <Text style={[styles.stepLabel, styles.activeStepLabel]}>Payment</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Animated.View
          style={[
            styles.bookingCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Hotel Info */}
          <View style={styles.hotelInfoContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db' }}
              style={styles.hotelImage}
            />
            <View style={styles.hotelDetails}>
              <Text style={styles.hotelName}>Taj Palace Delhi</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.locationText}>New Delhi, India</Text>
              </View>
              <View style={styles.roomTypeRow}>
                <Ionicons name="bed-outline" size={14} color="#666" />
                <Text style={styles.roomTypeText}>Luxury King Room</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.price}>₹8,500</Text>
                <Text style={styles.perNight}>/night</Text>
              </View>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>
          </View>

          {/* Check-in/out Info */}
          <View style={styles.checkInfoContainer}>
            <View>
              <Text style={styles.checkLabel}>Check in</Text>
              <Text style={styles.checkDate}>Mon, 16 Sep</Text>
              <Text style={styles.checkTime}>14:00</Text>
            </View>
            
            <View style={styles.nightsContainer}>
              <Ionicons name="time-outline" size={16} color="#0099cc" />
              <Text style={styles.nightsText}>2 Nights</Text>
            </View>
            
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.checkLabel}>Check out</Text>
              <Text style={styles.checkDate}>Thu, 18 Sep</Text>
              <Text style={styles.checkTime}>12:00</Text>
            </View>
          </View>

          {/* Guest Info */}
          <View style={styles.guestInfoContainer}>
            <View>
              <Text style={styles.guestInfoLabel}>Guests and Rooms</Text>
              <Text style={styles.guestInfoText}>Guest Info</Text>
            </View>
            <View>
              <Text style={styles.guestInfoValue}>2 Rooms | 4 Guests</Text>
              <Text style={styles.guestName}>Rahul Sharma</Text>
            </View>
          </View>

          {/* Payment Options */}
          <TouchableOpacity style={styles.paymentOptionButton}>
            <Ionicons name="wallet-outline" size={22} color="#0099cc" />
            <Text style={styles.paymentOptionText}>Choose payment method</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.promoButton}>
            <MaterialIcons name="local-offer" size={22} color="#0099cc" />
            <Text style={styles.promoText}>Add promo</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          {/* Price Summary */}
          <View style={styles.priceSummaryContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Amount</Text>
              <Text style={styles.priceValue}>₹17,000</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Tax</Text>
              <Text style={styles.priceValue}>₹3,060</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹20,060</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Book Now Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  progressStep: {
    alignItems: 'center',
  },
  progressLine: {
    width: 30,
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 8,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  completedStep: {
    backgroundColor: '#eee',
  },
  activeStep: {
    backgroundColor: '#0099cc',
  },
  stepText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999',
  },
  activeStepText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
  stepLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  activeStepLabel: {
    color: '#0099cc',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  hotelInfoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    paddingBottom: 16,
  },
  hotelImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  hotelDetails: {
    flex: 1,
    marginLeft: 12,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  roomTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  roomTypeText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0099cc',
  },
  perNight: {
    fontSize: 13,
    color: '#999',
    marginLeft: 2,
  },
  ratingContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 0,
    bottom: 0,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  checkInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  checkLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  checkDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  checkTime: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  nightsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#f0f9ff',
    borderRadius: 16,
  },
  nightsText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '500',
    color: '#0099cc',
  },
  guestInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  guestInfoLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  guestInfoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
  guestInfoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textAlign: 'right',
  },
  guestName: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
    textAlign: 'right',
  },
  paymentOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  paymentOptionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
  },
  promoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  promoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
  },
  priceSummaryContainer: {
    marginTop: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  footer: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bookButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default BookingPaymentScreen;