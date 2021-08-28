import React from 'react';
import AppNavigator from './navigators';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store';
import InitGeneral from './InitGeneral';

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
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <PaperProvider theme={theme}>
          <AppNavigator />
          <InitGeneral />
        </PaperProvider>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
