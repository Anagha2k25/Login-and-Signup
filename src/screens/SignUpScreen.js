import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, 
  StatusBar, ActivityIndicator, Image, Switch, Dimensions, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

// NOTE: You must ensure this path and image file exists in your assets folder
import localIllustration from '../../assets/illustration1.png'; 


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

// --- SOCIAL BRAND COLORS (Brand colors for icons: GitHub, Google, Facebook) ---
const SOCIAL_COLORS = {
    GitHub: '#181717', // Standard GitHub Black/Dark Gray
    Google: '#DB4437', // Standard Google Red
    Facebook: '#4267B2', // Standard Facebook Blue
};

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


// --- Component for the Illustration ---
const SignUpIllustration = ({ colors, styles }) => (
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

// --- DYNAMIC STYLESHEET CREATION ---
const getStyles = (colors) => StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Header Wrapper (Now scrolls)
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  termsText: {
    color: colors.textSecondary,
    marginLeft: 8,
    flexShrink: 1,
  },
  termsLink: {
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
  // New social icon container styles (Icon-only row)
  socialIconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 30, 
  },
  socialIconContainer: {
    marginHorizontal: 15, // Space between icons
    padding: 10, 
  },
  signInContainer: { 
    marginTop: 30, // Increased margin to separate from icons
    marginBottom: 10,
    alignSelf: 'center',
  },
  signInText: { 
    color: colors.textSecondary,
    fontSize: 14,
  },
  signInLink: { 
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
});


export default function SignUpScreen({ navigation }) {
  // --- Theme State ---
  const [theme, setTheme] = useState('light');
  const colors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  const styles = getStyles(colors); 

  // --- Sign Up State ---
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState({ type: 'error', text: '' }); 

  // --- Theme Toggling Logic ---
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  // --- Standard Sign Up Handler (MOCK) ---
  const handleSignUp = async () => {
    setApiMessage({ type: 'error', text: '' });
    
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setApiMessage({ type: 'error', text: 'All fields are required.' });
      return;
    }
    if (password !== confirmPassword) {
      setApiMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    if (!agreedToTerms) {
      setApiMessage({ type: 'error', text: 'You must agree to the Terms & Conditions.' });
      return;
    }

    setIsLoading(true);
    
    try {
        // MOCK API CALL...
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        setApiMessage({ type: 'success', text: `SUCCESS: Account created for ${fullName}!` });
        // In a real app, you would navigate here after successful sign up.
        setTimeout(() => console.log('Simulated successful sign up, navigating to Login...'), 1000); 
    } catch (error) {
        setApiMessage({ type: 'error', text: 'Network Error: Could not connect to the backend server.' });
    } finally {
        setIsLoading(false);
    }
  };

  // --- Social Sign Up Handler (MOCK) ---
  const handleSocialSignUp = (provider) => {
    setApiMessage({ type: 'error', text: '' });
    console.log(`Attempting social sign up with ${provider}`);
    
    setIsLoading(true);
    
    try {
        // MOCK API CALL...
        setTimeout(() => {
            setApiMessage({ type: 'success', text: `SUCCESS: Account created with ${provider}!` });
            setIsLoading(false);
            setTimeout(() => console.log('Simulated successful social sign up, navigating...'), 1000); 
        }, 1500); 
    } catch (error) {
        setApiMessage({ type: 'error', text: 'Error during social sign-up.' });
        setIsLoading(false);
    }
  };

  // --- Navigation Handler for "Sign In" ---
  const handleGoToLogin = () => {
      // Use navigation.goBack() to go to the previous screen (Login)
      // or navigation.navigate('Login') if you want to ensure the stack is clean 
      // and 'Login' is the explicit target route name.
      if (navigation && navigation.goBack) {
          navigation.goBack();
      } else {
          console.log("Navigation object not available or goBack method missing.");
          // Fallback if not using React Navigation correctly
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
            
            <SignUpIllustration colors={colors} styles={styles} /> 

        </View>

        <View style={styles.card}>
          <Text style={styles.header}>Create Account 🚀</Text> 
          <Text style={styles.welcomeText}>Join our community today!</Text>
          
          {/* Input: Full Name */}
          <View style={styles.inputContainer}>
            <FontAwesome name="user-o" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={colors.placeholder}
              onChangeText={setFullName}
              value={fullName}
              autoCapitalize="words"
              editable={!isLoading}
            />
          </View>
          
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

          {/* Input: Confirm Password */}
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={colors.placeholder}
              secureTextEntry={!isConfirmPasswordVisible}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              editable={!isLoading}
            />
            <TouchableOpacity 
              onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              style={styles.iconButton}
              disabled={isLoading}
            >
              <FontAwesome 
                name={isConfirmPasswordVisible ? 'eye-slash' : 'eye'} 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
          

          {/* Terms & Conditions */}
          <TouchableOpacity 
            style={styles.termsContainer}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            disabled={isLoading}
          >
              <FontAwesome 
                name={agreedToTerms ? 'check-square-o' : 'square-o'} 
                size={20} 
                color={agreedToTerms ? colors.primaryAccent : colors.textSecondary} 
              />
              <Text style={styles.termsText}>I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text></Text>
          </TouchableOpacity>


          {/* Message Display */}
          {apiMessage.text ? <Text 
            style={displayMessageStyle}
          >{apiMessage.text}</Text> : null}

          {/* Sign Up Button */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={!isLoading ? handleSignUp : null}
            activeOpacity={isLoading ? 1 : 0.7}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.buttonText} />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
          
          {/* OR Separator */}
          <View style={styles.orSeparatorContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.orLine} />
          </View>
          
          {/* Social Media Sign Up Icons (GitHub, Google, Facebook) */}
          <View style={styles.socialIconRow}>
            <SocialIcon
                iconName="github"
                brandColor={SOCIAL_COLORS.GitHub}
                onPress={() => handleSocialSignUp('GitHub')}
                styles={styles}
                isLoading={isLoading}
            />
            <SocialIcon
                iconName="google"
                brandColor={SOCIAL_COLORS.Google}
                onPress={() => handleSocialSignUp('Google')}
                styles={styles}
                isLoading={isLoading}
            />
            <SocialIcon
                iconName="facebook"
                brandColor={SOCIAL_COLORS.Facebook}
                onPress={() => handleSocialSignUp('Facebook')}
                styles={styles}
                isLoading={isLoading}
            />
          </View>


          {/* Go to Login */}
          <TouchableOpacity 
            style={styles.signInContainer}
            // *** UPDATED: Calls the navigation handler ***
            onPress={handleGoToLogin} 
            disabled={isLoading}
          >
            <Text style={styles.signInText}>Already have an account? <Text style={styles.signInLink}>Sign In</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
