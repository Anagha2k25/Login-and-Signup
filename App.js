import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import the necessary component for Safe Area handling
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import all your screens
import LoginScreen from './src/screens/LoginScreen'; 
import SignUpScreen from './src/screens/SignUpScreen'; 
import OTPScreen from './src/screens/OTPScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Wrap the entire navigation structure in SafeAreaProvider
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: false // Hide the navigation bar for a clean, full-screen UI
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} /> 
          <Stack.Screen name="OTP" component={OTPScreen} /> 
        
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
