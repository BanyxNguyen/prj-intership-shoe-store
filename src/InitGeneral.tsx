import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {loadLoginUser} from './redux/slices/accountsSlice';
import {loadWishlist} from './redux/slices/productSlice';

const InitGeneral = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWishlist());
    dispatch(loadLoginUser());
  }, []);

  return <></>;
};

export default InitGeneral;
