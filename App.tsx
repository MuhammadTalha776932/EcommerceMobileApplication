import 'react-native-gesture-handler';
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { NativeBaseProvider, extendTheme, ColorMode } from "native-base"; //? 1. import `NativeBaseProvider` component
import { NavigationContainer } from '@react-navigation/native';
import type { StorageManager } from "native-base";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import RootContaienr from './src/components/RootContainer';

// * 3. Extend the theme to include custom colors, fonts, etc.
const CollectionsOfColorTheme = {
  brand: {
    900: "#8287af"
  }
}
const theme = extendTheme({ colors: CollectionsOfColorTheme });
// * Light & Dark mode 

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem("@ColorMode");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      console.log(e);
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem("@ColorMode", JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  },
};

// * Create a Client
const queryClient = new QueryClient()


const App = () => {
  axios.defaults.baseURL = "https://api.retailync.com/api"

  //? 2. Use at the root of your app
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootContaienr/>
        </NavigationContainer>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

export default App;