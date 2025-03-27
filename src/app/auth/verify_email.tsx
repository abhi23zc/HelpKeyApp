import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Animated 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const EmailVerificationScreen = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handleCodeChange = (text, index) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);

    // Auto focus to next input
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    // Shake animation for invalid verification
    router.push("/auth/NewPassword")
    return ;
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true
      })
    ]).start();
  };

  const interpolatedTranslateX = shakeAnimation.interpolate({
    inputRange: [-10, 10],
    outputRange: [-10, 10]
  });

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          transform: [{ translateX: interpolatedTranslateX }] 
        }
      ]}
    >
      <TouchableOpacity style={styles.backButton}>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <View style={styles.emailIcon}>
          <Feather name="mail" size={32} color="white" />
        </View>
      </View>

      <Text style={styles.title}>Please Verify Your Email</Text>
      <Text style={styles.subtitle}>
        Enter the 6 digit code we sent by email to
        <Text style={styles.emailText}> hassnaazlya@gmail.com</Text>
      </Text>

      <View style={styles.codeContainer}>
        {verificationCode.map((code, index) => (
          <TextInput
            key={index}
            ref={(ref) => inputRefs.current[index] = ref}
            style={[
              styles.codeInput, 
              verificationCode[index] ? styles.filledInput : {}
            ]}
            maxLength={1}
            keyboardType="numeric"
            value={code}
            onChangeText={(text) => handleCodeChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity 
        style={styles.verifyButton}
        onPress={handleVerify}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent:'center'
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  emailIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00a2ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15
  },
  subtitle: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 30
  },
  emailText: {
    color: '#00a2ff'
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 18
  },
  filledInput: {
    borderColor: '#00a2ff'
  },
  verifyButton: {
    backgroundColor: '#00a2ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  resendText: {
    color: '#00a2ff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default EmailVerificationScreen;