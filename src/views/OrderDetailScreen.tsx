import {useNavigation, useRoute} from '@react-navigation/core';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icons from '../components/Icons';
import {LoadingScreen} from '../InitGeneral';
import {Order, OrderDetail, TrangThaiDonHang} from '../models';
import {StackNavigationProp} from '../navigators/config';
import {productService} from '../services';
import {colors, constants, fonts, shadows, sizes} from '../support/constants';
import {Container} from '../support/styledComponents';
import {parseImageStringToArr} from '../utilities';

const OrderDetailScreen = () => {
  const route = useRoute();
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>();
  const [status, setStatus] = useState<number>(0);
  const stackNav = useNavigation<StackNavigationProp>();

  const _goBack = () => {
    stackNav.goBack();
  };

  const _getStatus = () => {
    return TrangThaiDonHang[status];
  };

  const _renderItems = () => {
    return orderDetails?.map((item, index) => {
      const images = parseImageStringToArr(item.HinhAnh);
      return (
        <View key={index.toString()} style={[styles.itemBox, shadows.s2]}>
          <FastImage
            style={{height: hItem, width: wItem}}
            source={{
              uri: images[0],
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.itemContent}>
            <Text>{item.Ten}</Text>
            <Text>Size: {item.KichThuoc}</Text>
            <Text>Price: {item.Gia}</Text>
            <Text>Amount: {item.SoLuong}</Text>
          </View>
        </View>
      );
    });
  };

  useEffect(() => {
    const funcAsync = async () => {
      try {
        LoadingScreen.start();

        const data: Order = _.get(route.params, 'data');
        const result = await productService.getOrderById(data.Id);

        LoadingScreen.stop();
        setStatus(data.TrangThai);
        setOrderDetails(result);
      } catch (error) {
        LoadingScreen.stop();
      }
    };
    funcAsync();
  }, []);

  return (
    <Container style={styles.container}>
      <View style={[styles.header, shadows.s2]}>
        <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={_goBack}>
          <Icons size={26} color={colors.black} name="arrow-left" lib="Feather" />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Order Detail</Text>
        <View style={styles.btn} />
      </View>
      <View style={styles.content}>
        <Text style={styles.status}>Status: {_getStatus()}</Text>
        <ScrollView>{_renderItems()}</ScrollView>
      </View>
    </Container>
  );
};

export default OrderDetailScreen;

const hItem = 100;
const wItem = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    height: constants.hHeader,
    width: constants.hHeader,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: constants.hHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.bgScreen,
  },
  titleHeader: {
    textAlign: 'center',
    fontFamily: fonts.montserrat.semiBold,
  },
  content: {
    padding: 5,
  },
  status: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: sizes.h4,
    marginLeft: 10,
    marginVertical: 5,
  },
  itemBox: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: colors.bgScreen,
    padding: 5,
  },
  itemContent: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
