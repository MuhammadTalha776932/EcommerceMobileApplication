import * as React from "react";
import { NativeBaseProvider, Text, Box, extendTheme } from "native-base"; //? 1. import `NativeBaseProvider` component

//? 3. Extend the theme to include custom colors, fonts, etc.

const CollectionsOfColorTheme = {
  brand: {
    900: "#8287af"
  }
}

const theme = extendTheme({colors: CollectionsOfColorTheme});

const App = () => {
  //? 2. Use at the root of your app
  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Text>Open up App.js to start working on your app!</Text>
      </Box>
    </NativeBaseProvider>
  );
}

export default App;