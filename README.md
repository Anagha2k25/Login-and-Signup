SkillArcMobile - Mobile Authentication Screens

This project contains responsive, dark/light-mode enabled Login and Sign Up screens built using React Native and Expo.

The screens are set up to navigate between each other (Login -> Sign Up, Sign Up -> Login) using React Navigation.

🚀 Getting Started

Follow these steps to set up and run the application locally.

1. Prerequisites

You must have the following installed on your system:

Node.js (v14 or higher is recommended)

npm or Yarn

Expo CLI: Install globally via npm.

npm install -g expo-cli
# OR
yarn global add expo-cli


2. Project Setup

Assuming you have already created the necessary files (App.js, src/screens/LoginScreen.js, src/screens/SignUpScreen.js, etc.), you need to install the required dependencies.

Open your project's root directory in the terminal and run:

npm install 
# OR
yarn install


Key Dependencies

This project relies on the following packages, which you should ensure are installed:

# Core Expo/React Native dependencies (if starting from scratch)
npm install react-native-safe-area-context @expo/vector-icons

# Navigation (Mandatory for screen switching)
npm install @react-navigation/native @react-navigation/stack
npm install expo-updates # For compatibility with latest Expo SDK


3. Missing App.js (Navigation Setup)

Since the LoginScreen and SignUpScreen use the navigation prop, you must define the navigation structure in an App.js file.

Create a file named App.js in your project root with the following content:

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

// NOTE: You must have placeholder images in your assets folder 
// or remove the Image components from LoginScreen/SignUpScreen.
// Example placeholders: 
// '../../assets/illustration.png'
// '../../assets/illustration1.png'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Hides the header bar for a full-screen feel
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


4. Running the Application

Once all dependencies are installed and App.js is created, start the Expo development server:

expo start
# OR
npm start


This will open a new tab in your browser with the Expo Developer Tools. From there, you can choose how to run the app:

Option

Command

Description

Android

Press a or scan QR code

Run on Android emulator or physical device via Expo Go app.

iOS

Press i or scan QR code

Run on iOS simulator or physical device via Expo Go app.

Web

Press w

Run in a web browser (useful for quick preview).

🖼️ Required Assets

Your current screen files reference local image assets. Ensure these files exist in the specified directory:

../../assets/illustration.png (Used in LoginScreen.js)

../../assets/illustration1.png (Used in SignUpScreen.js)

If you don't have these images, you can temporarily comment out or replace the <Image> components in the Login and Sign Up screen files to prevent errors.
