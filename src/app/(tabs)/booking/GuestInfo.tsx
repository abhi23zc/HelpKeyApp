import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const GuestInfoScreen = ({ navigation }) => {
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(20))[0];
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [bookForOthers, setBookForOthers] = useState(false);
  const [additionalGuestName, setAdditionalGuestName] = useState('');
  const [additionalGuestEmail, setAdditionalGuestEmail] = useState('');
  const [additionalGuestPhone, setAdditionalGuestPhone] = useState('');
  
  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const toggleSwitch = () => {
    setBookForOthers(previousState => !previousState);
  };

  const handleNext = () => {
    
    console.log('Navigate to payment screen');
    router.push("/(tabs)/booking/Payment")
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{
          router.back()
        }}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking and Payment</Text>
        <View style={{ width: 24 }} />
      </View>
      
      {/* Stepper */}
      <View style={styles.stepper}>
        <View style={styles.stepContainer}>
          <View style={[styles.stepCircle, { backgroundColor: '#E8E8E8' }]}>
            <Text style={styles.stepInactiveText}>1</Text>
          </View>
          <Text style={styles.stepText}>Booking</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepContainer}>
          <View style={[styles.stepCircle, { backgroundColor: '#2CB9B0' }]}>
            <Text style={styles.stepActiveText}>2</Text>
          </View>
          <Text style={[styles.stepText, { color: '#2CB9B0' }]}>Guest Info</Text>
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
            styles.formContainer,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }] 
            }
          ]}
        >
          {/* Primary Guest Info */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#999"
              />
            </View>
            
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <TouchableOpacity style={styles.countryCodeContainer}>
                <View style={styles.flagContainer}>
                  <Text style={styles.flagEmoji}>🇮🇳</Text>
                </View>
                <Text style={styles.countryCode}>{countryCode}</Text>
                <Ionicons name="chevron-down" size={16} color="#999" />
              </TouchableOpacity>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>
          </View>
          
          {/* Book for Others Toggle */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Book for others</Text>
            <Switch
              trackColor={{ false: "#E8E8E8", true: "#2CB9B0" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E8E8E8"
              onValueChange={toggleSwitch}
              value={bookForOthers}
            />
          </View>
          
          {/* Additional Guest Info (conditionally rendered) */}
          {bookForOthers && (
            <Animated.View 
              style={[
                styles.formSection,
                { opacity: fadeAnim }
              ]}
            >
              <Text style={styles.label}>Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={additionalGuestName}
                  onChangeText={setAdditionalGuestName}
                  placeholder="Enter guest name"
                  placeholderTextColor="#999"
                />
              </View>
              
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={additionalGuestEmail}
                  onChangeText={setAdditionalGuestEmail}
                  placeholder="Enter guest email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={additionalGuestPhone}
                  onChangeText={setAdditionalGuestPhone}
                  placeholder="Enter guest phone number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>
      
      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginTop:StatusBar.currentHeight
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  formContainer: {
    padding: 20,
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 30,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000000',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
  },
  flagContainer: {
    marginRight: 4,
  },
  flagEmoji: {
    fontSize: 16,
  },
  countryCode: {
    fontSize: 14,
    color: '#000000',
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000000',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 8,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  nextButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
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

export default GuestInfoScreen;