import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, Text, Box, extendTheme, ColorMode } from "native-base"; //? 1. import `NativeBaseProvider` component
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from "react-native"
import type { StorageManager } from "native-base";
import MainScreen from "./src/screens/MainScreen";
import { products } from "./src/assets/apis/Product.data";

//? 3. Extend the theme to include custom colors, fonts, etc.

const CollectionsOfColorTheme = {
  brand: {
    900: "#8287af"
  }
}

const theme = extendTheme({ colors: CollectionsOfColorTheme });

//? Light & Dark mode 

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


const App = () => {
  //? 2. Use at the root of your app
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <NavigationContainer>
        <SafeAreaView style={{flex:1}}>
          <MainScreen />
        </SafeAreaView>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;