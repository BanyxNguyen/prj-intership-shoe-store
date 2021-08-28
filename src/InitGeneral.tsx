import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {loadWishlist} from './redux/slices/productSlice';

const InitGeneral = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWishlist());
  }, []);

  return <></>;
};

export default InitGeneral;
