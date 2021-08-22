import React, {FC, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';

import FastImage from 'react-native-fast-image';

import {Product} from '../models';
import Icons from '../components/Icons';
import {TempData} from '../utilities/data';
import {Container, Text} from '../support/styledComponents';
import {colors, fonts, shadows, sizes} from '../support/constants';
import {DETAILSCREEN, StackNavigationProp} from '../navigators/config';
import {Checkbox} from 'react-native-paper';
import ChooseSizeBottomSheet from '../components/ChooseSizeBottomSheet';

interface IProps {
  data: Product;
}

const MyCheckBox: FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      color={colors.black}
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    />
  );
};

const CartItem: FC<IProps> = props => {
  const stackNav = useNavigation<StackNavigationProp>();
  const {name, price, images} = props.data;

  // const _toDetail = () => {
  //   stackNav.navigate(DETAILSCREEN, {data: props.data});
  // };

  return (
    <TouchableOpacity style={[styles.itemBox, shadows.s1]}>
      <MyCheckBox />
      <FastImage
        style={{height: hItem, width: wItem}}
        source={{
          uri: images[0],
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.itemContent}>
        <Text style={styles.txtPrice}>${price}</Text>
        <Text numberOfLines={2} style={styles.txtName}>
          {name}
        </Text>
        <Text style={styles.txtSize}>Size: 8</Text>
      </View>
      <TouchableOpacity activeOpacity={0.85} style={styles.btnDel}>
        <Icons size={24} color={colors.black} name="dots-vertical" lib="MaterialCommunityIcons" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const CartScreen: FC = () => {
  const [products, setProducts] = useState<Product[]>(TempData.sneakers);

  const _renderProducts = () => {
    return products.map((item, index) => {
      return <CartItem data={item} key={index.toString()} />;
    });
  };

  return (
    <Container style={styles.container}>
      <View>{/* TODO number product + share and filter */}</View>
      <ChooseSizeBottomSheet />
      <View style={{flex: 1}}>
        <View style={styles.checkAllBox}>
          <MyCheckBox />
          <Text>Select all</Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentScrollView}>
          {_renderProducts()}
        </ScrollView>
      </View>
      <View style={styles.cartControl}>
        <Text style={styles.price}>Total: $120</Text>
        <TouchableOpacity style={[styles.btn, shadows.s5]} activeOpacity={0.85}>
          <Text style={styles.txtBtn}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default CartScreen;

const hItem = 100;
const wItem = 133;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentScrollView: {
    paddingTop: 10,
    paddingBottom: 90,
  },
  checkAllBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  itemBox: {
    backgroundColor: colors.white,
    marginBottom: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
    paddingVertical: 10,
  },
  txtPrice: {
    fontFamily: fonts.montserrat.regular,
    fontSize: sizes.h5,
  },
  txtName: {
    marginHorizontal: 3,
    fontFamily: fonts.montserrat.semiBold,
  },
  txtSize: {},
  btnDel: {
    paddingHorizontal: 5,
  },
  cartControl: {
    height: 65,
    alignItems: 'center',
    flexDirection: 'row',
    width: sizes.wScreen,
    paddingHorizontal: 45,
    justifyContent: 'space-between',
    backgroundColor: colors.white85,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  price: {
    flex: 1,
    fontSize: sizes.h4,
    textAlign: 'center',
    fontFamily: fonts.roboto.bold,
  },
  btn: {
    height: 45,
    width: sizes.wScreen * 0.3,
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  txtBtn: {
    fontFamily: fonts.montserrat.semiBold,
    color: colors.white,
  },
});
