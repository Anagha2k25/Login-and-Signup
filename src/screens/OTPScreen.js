import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, StatusBar } from 'react-native';

const COLORS = {
  primaryDark: '#5D3FD3', 
  secondaryPurple: '#7F52FF',
  white: '#FFFFFF',
  textGray: '#CCCCCC',
  inputBorder: 'rgba(255, 255, 255, 0.3)',
};

const OTP_INPUT_COUNT = 4;

export default function OTPScreen({ navigation }) {
  const [otp, setOtp] = useState(Array(OTP_INPUT_COUNT).fill(''));
  // Create an array of refs to manage focus between the 4 input fields
  const inputRefs = useRef([]); 

  // Handles input and auto-focusing to the next box
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1); // Takes only the last character entered
    setOtp(newOtp);

    // Auto-focus logic
    if (text !== '' && index < OTP_INPUT_COUNT - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handles backspace key to auto-focus to the previous box
  const handleKeyPress = ({ nativeEvent: { key: keyValue } }, index) => {
    if (keyValue === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === OTP_INPUT_COUNT) {
      console.log('OTP Verified:', fullOtp);
      Keyboard.dismiss();
      // On successful verification, navigate to the Login screen or a confirmation screen
      navigation.navigate('Login'); 
    } else {
      // In a real app, use a custom modal or toast notification instead of alert()
      console.log("Please enter the complete 4-digit OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Placeholder for the SkillArc Logo/Icon in the primaryDark area */}
      <View style={styles.logoArea}>
          <Text style={styles.logoText}>skillarc</Text>
      </View>

      {/* The main content card */}
      <View style={styles.card}>
        <Text style={styles.header}>OTP Verification</Text>
        <Text style={styles.welcomeText}>Verify your account</Text>
        <Text style={styles.welcomeSubtitle}>
          We sent a 4-digit code to your email.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => inputRefs.current[index] = el}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={digit}
              placeholder='0'
              placeholderTextColor={COLORS.textGray}
            />
          ))}
        </View>
        
        {/* Verify Button */}
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        {/* Resend Code Link */}
        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive code? <Text style={styles.resendLink}>Resend</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'flex-end',
  },
  logoArea: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  card: {
    width: '100%',
    padding: 30,
    backgroundColor: COLORS.secondaryPurple,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    minHeight: 400,
  },
  header: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    alignSelf: 'center',
  },
  welcomeText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  welcomeSubtitle: {
    color: COLORS.textGray,
    fontSize: 16,
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: '22%',
    height: 60,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.white,
    color: COLORS.white,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.secondaryPurple,
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },
  resendText: {
    color: COLORS.textGray,
    fontSize: 14,
  },
  resendLink: {
    color: COLORS.white,
    fontWeight: 'bold',
  }
});
