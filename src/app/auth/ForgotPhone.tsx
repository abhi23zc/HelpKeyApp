import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  FlexAlignType,
  Dimensions,
  ImageStyle,
  StatusBar
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const ForgotEmailScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(formatPhoneNumber(text));
  };

  return (

    <View style={[styles.container,]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient

        colors={['#3b82f6', '#1e40af']}
        style={styles.headerBackground}
      >
        <View style={styles.helpKeyContainer}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>

            <FontAwesome name="life-ring" size={32} color="#ffffff" />
            <Text style={styles.helpKeyText}>HelpKey</Text>
          </View>
          <Text style={styles.helpKeySubtext}>Your trusted hotel companion</Text>
        </View>
      </LinearGradient>
      <View style={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Forgot Password</Text>



          {/* <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} style={styles.icon} />
            <TextInput
              placeholder="Enter your full name"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
            />
          </View> */}

   
                    
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryCodeContainer}>
              <Image 
                source={{ uri: 'https://flagcdn.com/w40/in.png' }} 
                style={styles.countryFlag} 
              />
              <Text>{countryCode}</Text>
            </View>
            <TextInput
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>


          <TouchableOpacity style={styles.registerButton} onPress={() => {
            router.push("/auth/verify_phone")
          }}>
            <Text style={styles.registerButtonText}>Send Code</Text>
          </TouchableOpacity>



          <View style={styles.loginContainer}>
            <Text style={{ color: '#888' }}>Want to choose another way? </Text>
            <TouchableOpacity onPress={()=>{
              router.push("/auth/ForgotPhone")
            }}>
              <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Use Email </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForgotEmailScreen;

const { width, height } = Dimensions.get('window');

const styles = {
  container: {

    flex: 1,
    width: 'auto',
    backgroundColor: '#f0f4f8',
  } as ViewStyle,
  scrollContainer: {

    position: 'absolute',
    top: 150,
    width: width,
    height: height,
  } as ViewStyle,
  card: {
    paddingTop: 50,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    height: height
  } as ViewStyle,
  title: {
    fontSize: 24,
    fontWeight: 'bold' as 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
  } as TextStyle,
  inputContainer: {
    flexDirection: 'row' as 'row',
    alignItems: 'center' as FlexAlignType,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  } as ViewStyle,
  icon: {
    marginRight: 10,
    color: '#888',
  } as TextStyle,
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  } as TextStyle,
  phoneInputContainer: {
    flexDirection: 'row' as 'row',
    alignItems: 'center' as FlexAlignType,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  } as ViewStyle,
  countryCodeContainer: {
    flexDirection: 'row' as 'row',
    alignItems: 'center' as FlexAlignType,
    marginRight: 10,
  } as ViewStyle,
  countryFlag: {
    width: 25,
    height: 15,
    marginRight: 5,
  } as ImageStyle,
  registerButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center' as FlexAlignType,
    marginBottom: 15,
  } as ViewStyle,
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold' as 'bold',
  } as TextStyle,
  orContainer: {
    flexDirection: 'row' as 'row',
    alignItems: 'center' as FlexAlignType,
    marginVertical: 15,
  } as ViewStyle,
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  } as ViewStyle,
  orText: {
    marginHorizontal: 10,
    color: '#888',
  } as TextStyle,
  socialButtonContainer: {
    flexDirection: 'row' as 'row',
    justifyContent: 'center' as FlexAlignType,
    marginBottom: 15,
  } as ViewStyle,
  socialButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
  } as ViewStyle,
  loginContainer: {
    flexDirection: 'row' as 'row',
    justifyContent: 'center' as FlexAlignType,
  } as ViewStyle,
  headerBackground: {
    height: 200,
    borderBottomRightRadius: 20,
    position: 'relative',
  } as ViewStyle,
  helpKeyContainer: {
    marginTop: StatusBar.currentHeight + 15,
    alignItems: 'center',
    gap: 5,

  } as ViewStyle,
  helpKeyText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold' as 'bold',

  } as TextStyle,
  helpKeySubtext: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 5,
  } as TextStyle,
};