import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, 
  StatusBar, ActivityIndicator, Image, Switch, Dimensions, Modal, KeyboardAvoidingView, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

import localIllustration from '../../assets/illustration.png';


// Get screen width for responsive sizing
const { width } = Dimensions.get('window');

// --- THEME COLOR DEFINITIONS (Strictly maintained) ---
const LIGHT_COLORS = {
  background: '#F0F2F5', 
  cardBackground: '#FFFFFF',
  primaryAccent: '#2A47F9', // Vibrant Blue (e.g., buttons, links)
  secondaryAccent: '#1A32D6', // Darker Blue (e.g., header background)
  textPrimary: '#1E1E1E', 
  textSecondary: '#6A6A6A', 
  inputBorder: '#E0E0E0',
  placeholder: '#999999',
  buttonText: '#FFFFFF',
  errorText: '#DC3545', 
  successText: '#28A745', 
  logoColor: '#FFFFFF',
};

const DARK_COLORS = {
  background: '#121212',
  cardBackground: '#1E1E1E',
  primaryAccent: '#7CA8FF', // Lighter, accessible Blue (e.g., buttons, links)
  secondaryAccent: '#1A32D6', // Darker Blue (e.g., header background)
  textPrimary: '#FFFFFF', 
  textSecondary: '#BBBBBB', 
  inputBorder: '#333333',
  placeholder: '#AAAAAA',
  buttonText: '#121212', 
  errorText: '#CF6679', 
  successText: '#03DAC5', 
  logoColor: '#FFFFFF',
};

// --- SOCIAL BRAND COLORS (Brand colors for icons) ---
const SOCIAL_COLORS = {
    GitHub: '#181717', // Standard GitHub Black/Dark Gray
    Google: '#DB4437', // Standard Google Red
    Facebook: '#4267B2', // Standard Facebook Blue
};


// --- Component for the Illustration ---
const LoginIllustration = ({ colors, styles }) => (
    <View style={styles.illustrationContainer}>
        <Image 
            source={localIllustration}
            style={styles.illustration}
            resizeMode="cover" 
            onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
        />
    </View>
);
// --- END Illustration Component ---

// --- Social Media Icon Component ---
const SocialIcon = ({ iconName, brandColor, onPress, styles, isLoading }) => (
    <TouchableOpacity
        style={styles.socialIconContainer}
        onPress={onPress}
        disabled={isLoading}
        activeOpacity={isLoading ? 1 : 0.7}
    >
        <FontAwesome name={iconName} size={32} color={brandColor} />
    </TouchableOpacity>
);
// --- END Social Media Icon Component ---


// --- DYNAMIC STYLESHEET CREATION ---
const getStyles = (colors) => StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Header Wrapper 
  headerWrapper: {
    height: 320, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    backgroundColor: colors.secondaryAccent,
    position: 'relative',
    paddingTop: 0,
    overflow: 'hidden', 
  },
  illustrationContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Ensure the image covers the header area
  illustration: {
    width: '100%',
    height: '100%',
  },
  themeToggle: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20, 
    right: 20,
    padding: 10,
    zIndex: 3,
  },
  scrollContent: {
    flexGrow: 1, 
    backgroundColor: colors.background,
  },
  card: {
    width: '100%',
    padding: 30,
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: -5 }, 
    shadowOpacity: colors === LIGHT_COLORS ? 0.1 : 0.4, 
    shadowRadius: 10,
    elevation: 15,
    paddingBottom: 50, 
    marginTop: -40, 
  },
  header: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  welcomeText: {
    color: colors.textSecondary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55, 
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.inputBackground || colors.cardBackground,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    color: colors.textPrimary,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  iconButton: {
    padding: 5,
  },
  button: {
    backgroundColor: colors.primaryAccent,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20, 
    marginBottom: 20,
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: colors.textSecondary,
    marginLeft: 8,
  },
  forgotPasswordText: {
    color: colors.primaryAccent,
    fontWeight: 'bold',
  },
  // OR separator styles
  orSeparatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.inputBorder,
  },
  orText: {
    width: 50,
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  // New social icon container styles
  socialIconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 30, // Provides space on the sides
  },
  socialIconContainer: {
    marginHorizontal: 15, // Space between icons
    padding: 10, 
    // Removed border/background to achieve icon-only look
  },
  signUpContainer: { 
    marginTop: 30, // Increased margin to separate from icons
    marginBottom: 10,
    alignSelf: 'center',
  },
  signUpText: { 
    color: colors.textSecondary,
    fontSize: 14,
  },
  signUpLink: { 
    color: colors.primaryAccent,
    fontWeight: 'bold',
  },
  errorText: {
    color: colors.errorText,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
  successText: {
    color: colors.successText,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
  // Modal Styles (Kept for completeness)
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonClose: {
    backgroundColor: colors.inputBorder,
    marginTop: 15,
  },
  modalButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalInput: {
    width: '100%',
    height: 55, 
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: colors.cardBackground,
    color: colors.textPrimary,
    fontSize: 16,
  }
});


// --- Forgot Password Modal Component (Kept for completeness) ---
const ForgotPasswordModal = ({ isVisible, onClose, colors, styles }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleReset = async () => {
        if (!email) {
            setMessage('Please enter your email address.');
            return;
        }

        setIsLoading(true);
        setMessage('');

        // Mock API Call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            
            setMessage(`Success! Reset link sent to ${email}. Check your inbox.`);
            setEmail('');

            setTimeout(onClose, 3000); 
        } catch (error) {
            setMessage('Error: Failed to send reset link. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalCenteredView}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Reset Password</Text>
                    <Text style={styles.modalText}>
                        Enter the email address associated with your account.
                    </Text>

                    <TextInput
                        style={styles.modalInput}
                        placeholder="Email Address"
                        placeholderTextColor={colors.placeholder}
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        value={email}
                        autoCapitalize="none"
                        editable={!isLoading}
                    />

                    {message ? <Text 
                        style={message.includes('Success') ? styles.successText : styles.errorText}
                    >{message}</Text> : null}

                    {/* Send Reset Link Button */}
                    <TouchableOpacity 
                        style={[styles.button, { marginTop: 0, marginBottom: 10, width: '100%', backgroundColor: colors.primaryAccent }]} 
                        onPress={!isLoading ? handleReset : null}
                        activeOpacity={isLoading ? 1 : 0.7}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={colors.buttonText} />
                        ) : (
                            <Text style={styles.buttonText}>Send Reset Link</Text>
                        )}
                    </TouchableOpacity>
                    
                    {/* Close Button */}
                    <TouchableOpacity 
                        style={[styles.button, styles.modalButtonClose, { width: '100%', padding: 15, marginTop: 5 }]} 
                        onPress={!isLoading ? onClose : null}
                        disabled={isLoading}
                    >
                        <Text style={[styles.modalButtonText, { color: colors.textSecondary }]}>Close</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};
// --- END Forgot Password Modal Component ---


export default function LoginScreen({ navigation }) {
  // --- Theme State ---
  const [theme, setTheme] = useState('light');
  const colors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  const styles = getStyles(colors); 

  // --- Login State ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState({ type: 'error', text: '' }); 

  // --- Theme Toggling Logic ---
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  // --- Standard Login Handler (MOCK) ---
  const handleLogin = async () => {
    setApiMessage({ type: 'error', text: '' });
    
    if (!email.trim() || !password.trim()) {
      setApiMessage({ type: 'error', text: 'Email and password are required.' });
      return;
    }

    setIsLoading(true);
    
    try {
        // MOCK API CALL...
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        setApiMessage({ type: 'success', text: `SUCCESS: Welcome back!` });
        // NOTE: In a real app, you would navigate here after successful login.
        setTimeout(() => console.log('Simulated successful login, navigating to Dashboard...'), 1000); 
    } catch (error) {
        setApiMessage({ type: 'error', text: 'Network Error: Could not connect to the backend server.' });
    } finally {
        setIsLoading(false);
    }
  };
  
  // --- Social Login Handler (MOCK) ---
  const handleSocialLogin = (provider) => {
    setApiMessage({ type: 'error', text: '' });
    console.log(`Attempting social login with ${provider}`);
    
    setIsLoading(true);
    
    try {
        // MOCK API CALL...
        setTimeout(() => {
            setApiMessage({ type: 'success', text: `SUCCESS: Signed in with ${provider}!` });
            setIsLoading(false);
            setTimeout(() => console.log('Simulated successful social login, navigating...'), 1000); 
        }, 1500); 
    } catch (error) {
        setApiMessage({ type: 'error', text: 'Error during social sign-in.' });
        setIsLoading(false);
    }
  };
  
  // --- Navigation Handler for "Sign Up" ---
  const handleGoToSignUp = () => {
      // Use navigation.navigate to go to the SignUp screen.
      if (navigation && navigation.navigate) {
          navigation.navigate('SignUp'); 
      } else {
          console.log("Navigation object not available or navigate method missing. Cannot go to SignUp.");
      }
  };


  const displayMessageStyle = apiMessage.type === 'success' ? styles.successText : styles.errorText;

  return (
    <SafeAreaView 
      style={styles.safeAreaContainer} 
      edges={['bottom']} 
    >
      <StatusBar 
        barStyle={'light-content'} 
        backgroundColor={colors.secondaryAccent} 
        translucent={true} 
      /> 
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        keyboardShouldPersistTaps="handled"
        style={{flex: 1}} 
      >
        
        <View style={styles.headerWrapper}>
            
            <TouchableOpacity 
              style={styles.themeToggle} 
              onPress={toggleTheme}
              disabled={isLoading}
            >
                <FontAwesome 
                  name={theme === 'light' ? 'moon-o' : 'sun-o'} 
                  size={24} 
                  color={colors.logoColor} 
                />
            </TouchableOpacity>
            
            <LoginIllustration colors={colors} styles={styles} /> 

        </View>

        <View style={styles.card}>
          <Text style={styles.header}>Hello 👋</Text> 
          <Text style={styles.welcomeText}>Welcome back!</Text>
          
          {/* Input: Email */}
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope-o" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={colors.placeholder}
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>
          
          {/* Input: Password */}
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.placeholder}
              secureTextEntry={!isPasswordVisible}
              onChangeText={setPassword}
              value={password}
              editable={!isLoading}
            />
            <TouchableOpacity 
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.iconButton}
              disabled={isLoading}
            >
              <FontAwesome 
                name={isPasswordVisible ? 'eye-slash' : 'eye'} 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
          

          {/* Options: Remember Me & Forgot Password */}
          <View style={styles.optionsRow}>
              <TouchableOpacity 
                style={styles.rememberMeContainer}
                onPress={() => setRememberMe(!rememberMe)}
                disabled={isLoading}
              >
                  <FontAwesome 
                    name={rememberMe ? 'check-square-o' : 'square-o'} 
                    size={20} 
                    color={rememberMe ? colors.primaryAccent : colors.textSecondary} 
                  />
                  <Text style={styles.rememberMeText}>Remember Me</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => setIsModalVisible(true)}
                disabled={isLoading}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
          </View>


          {/* Message Display */}
          {apiMessage.text ? <Text 
            style={displayMessageStyle}
          >{apiMessage.text}</Text> : null}

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={!isLoading ? handleLogin : null}
            activeOpacity={isLoading ? 1 : 0.7}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.buttonText} />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
          
          {/* OR Separator */}
          <View style={styles.orSeparatorContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.orLine} />
          </View>
          
          {/* Social Media Login Icons (GitHub, Google, Facebook) */}
          <View style={styles.socialIconRow}>
            <SocialIcon
                iconName="github"
                brandColor={SOCIAL_COLORS.GitHub}
                onPress={() => handleSocialLogin('GitHub')}
                styles={styles}
                isLoading={isLoading}
            />
            <SocialIcon
                iconName="google"
                brandColor={SOCIAL_COLORS.Google}
                onPress={() => handleSocialLogin('Google')}
                styles={styles}
                isLoading={isLoading}
            />
            <SocialIcon
                iconName="facebook"
                brandColor={SOCIAL_COLORS.Facebook}
                onPress={() => handleSocialLogin('Facebook')}
                styles={styles}
                isLoading={isLoading}
            />
          </View>

          {/* Go to Sign Up */}
          <TouchableOpacity 
            style={styles.signUpContainer}
            // *** UPDATED: Calls the navigation handler ***
            onPress={handleGoToSignUp} 
            disabled={isLoading}
          >
            <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isVisible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        colors={colors}
        styles={styles}
      />
    </SafeAreaView>
  );
}
