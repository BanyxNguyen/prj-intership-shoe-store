import {SafeAreaView} from 'react-native';
import React, {FC, useEffect} from 'react';

import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import store from './redux/store';
import AppNavigator from './navigators';
import InitGeneral, {LoadingScreen} from './InitGeneral';

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

const App: FC = () => {
  useEffect(() => {
    LoadingScreen.stop();
  }, []);
  return (
    <Provider store={store}>
      <InitGeneral />
      <SafeAreaView style={{flex: 1}}>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
