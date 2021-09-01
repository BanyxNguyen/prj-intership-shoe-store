import {SafeAreaView} from 'react-native';
import React, {FC, useEffect} from 'react';

import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import store from './redux/store';
import AppNavigator from './navigators';
import InitGeneral, {LoadingScreen} from './InitGeneral';
import PayPalButton from './views/PayPal/PayPalButton';
import {OrderApproved} from './views/PayPal/types';

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

const Appp = () => {
  return (
    <PayPalButton
      urlBase={'http://192.168.1.100:5000'}
      OrderId={'61dcb081-0473-4e15-07c7-08d96c54f61b'}
      onApproved={(data: OrderApproved) => {
        console.log(data);
        fetch('http://192.168.1.100:5000/api/Payment/CaptureOrder?ApprovedOrderId=' + data.orderID);
      }}
    />
  );
};
// export default Appp;
