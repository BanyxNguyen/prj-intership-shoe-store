import React from 'react';
import AppNavigator from './navigators';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native';
import ShowAndFilterModal from './components/ShowAndFilterModal';

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
    <SafeAreaView style={{flex: 1}}>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </SafeAreaView>
  );
};

export default App;
