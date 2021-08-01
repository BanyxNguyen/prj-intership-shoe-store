import React from 'react';
import AppNavigator from './navigators';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

// import SystemNavigationBar from "react-native-system-navigation-bar";
// SystemNavigationBar.stickyImmersive()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
};

export default App;
