SkillArcMobile - Professional Authentication Stack

This project delivers two core mobile authentication screens (Login and Sign Up) built with React Native and Expo. The implementation features:

Dynamic Theming: Full support for Light and Dark modes.

Responsive UI: Seamless header integration by respecting device safe areas.

Navigation Ready: Pre-configured with navigation links to be easily integrated into a larger application stack.

🚀 Getting Started

1. Prerequisites

Ensure you have Node.js (v14+) and either npm or Yarn installed. The Expo CLI is required to run the project:

npm install -g expo-cli
# OR
yarn global add expo-cli


2. Dependency Installation

Install the primary project dependencies and the essential packages for navigation and custom UI:

npm install 
# OR
yarn install

# Mandatory Packages for UI and Navigation
npm install react-native-safe-area-context @expo/vector-icons
npm install @react-navigation/native @react-navigation/stack expo-updates


3. Application Entry Point (App.js)

The screens require React Navigation for the "Sign In" and "Sign Up" links to function. Create this file in your project root:

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Ensures a clean, full-screen UI without the default header
        }}
      >
        {/* These screens contain the theme, safe area, and navigation logic */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


4. Run the Application

Start the Expo development server:

expo start
# OR
npm start


Run on your preferred platform:

Platform

Command

Notes

Android/iOS

Press a or i

Requires the Expo Go app on a physical device or emulator.

Web

Press w

For quick browser preview.

🖼️ Required Assets (Critical)

The Login and Sign Up screen files rely on local images for the header illustration. The application will fail to compile or run correctly without these files.

Ensure the following image assets exist in your project:

../../assets/illustration.png (Used in LoginScreen.js)

../../assets/illustration1.png (Used in SignUpScreen.js)

If the images are missing, you must temporarily comment out the <Image> components in the screen files.
