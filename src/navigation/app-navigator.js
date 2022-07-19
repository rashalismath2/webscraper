import React from "react"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import browser from "../features/browser/browser";
import routes from "./routes";
import TabNavigator from "./tab-navigator";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={routes.home} component={TabNavigator} />
        <Stack.Screen options={{
          headerShown:false
        }} name={routes.browser} component={browser} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}