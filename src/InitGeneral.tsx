import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import MyNotify from './components/MyNotify';
import {loadWishlist} from './redux/slices/productSlice';
import {loadLoginUser} from './redux/slices/accountsSlice';

let StartLoadingOverlay = () => {};
let StopLoadingOverlay = () => {};

export const LoadingScreen = {
  start: StartLoadingOverlay,
  stop: StopLoadingOverlay,
};

const InitGeneral = () => {
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    dispatch(loadWishlist());
    dispatch(loadLoginUser());
  }, []);

  LoadingScreen.start = () => {
    setSpinner(true);
  };

  LoadingScreen.stop = () => {
    setSpinner(false);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <Spinner
        visible={spinner}
        animation="fade"
        textContent={'Loading...'}
        textStyle={styles.spinnerTxt}
        overlayColor="rgba(0, 0, 0, 0.4)"
      />
      <MyNotify />
    </View>
  );
};

export default InitGeneral;

const styles = StyleSheet.create({
  spinnerTxt: {
    color: '#FFF',
  },
});
