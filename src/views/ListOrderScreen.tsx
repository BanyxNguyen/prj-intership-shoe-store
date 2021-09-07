import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {productService} from '../services';
import {Container, Text, Title} from '../support/styledComponents';
import {LoadingScreen} from '../InitGeneral';
import {colors, shadows} from '../support/constants';
import moment from 'moment';
import _ from 'lodash';
import {ORDERDETAILSCREEN, StackNavigationProp} from '../navigators/config';
import {useNavigation} from '@react-navigation/core';
import {Order, TrangThaiDonHang} from '../models';

const ListOrderScreen: FC = ({navigation}: any) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const stackNav = useNavigation<StackNavigationProp>();

  const _toDetail = (data: Order) => () => {
    stackNav.navigate(ORDERDETAILSCREEN, {data});
  };

  const _renderItems = () => {
    return orders.map((item, index) => {
      const st = _.get(styles, TrangThaiDonHang[item.TrangThai], {});
      return (
        <TouchableOpacity
          style={[styles.itemBox, st, shadows.s2]}
          activeOpacity={0.85}
          key={index.toString()}
          onPress={_toDetail(item)}>
          <Text>Day: {moment(item.NgayLap).subtract(10, 'days').calendar()}</Text>
          <Text>Name {item.TenNguoiNhan}</Text>
          <Text>Address: {item.DiaChiNguoiNhan}</Text>
          <Text>Status: {TrangThaiDonHang[item.TrangThai]}</Text>
        </TouchableOpacity>
      );
    });
  };

  useEffect(() => {
    const funcAsync = async () => {
      try {
        LoadingScreen.start();

        const result = await productService.getOrders();
        const data = _.sortBy(result, 'NgayLap');

        LoadingScreen.stop();
        setOrders(data.reverse());
      } catch (error: any) {
        LoadingScreen.stop();
        console.log(error.response);
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      funcAsync();
    });
    return unsubscribe;
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {_renderItems()}
      </ScrollView>
    </Container>
  );
};

export default ListOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  itemBox: {
    backgroundColor: colors.bgScreen,
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 10,
  },
  None: {},
  Pending: {
    backgroundColor: '#ffa000',
  },
  Delivery: {
    backgroundColor: '#29b6f6',
  },
  Complete: {
    backgroundColor: '#4caf50',
  },
  Cancel: {
    backgroundColor: '#9e9e9e',
    opacity: 0.7,
  },
});
