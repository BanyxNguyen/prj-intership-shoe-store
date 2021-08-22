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

interface IProps {
  data: Product;
}

const WishItem: FC<IProps> = props => {
  const stackNav = useNavigation<StackNavigationProp>();
  const {name, price, images} = props.data;

  const _toDetail = () => {
    stackNav.navigate(DETAILSCREEN, {data: props.data});
  };

  return (
    <TouchableOpacity style={[styles.itemBox, shadows.s1]} onPress={_toDetail}>
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
        <Text numberOfLines={1} style={styles.txtName}>
          {name}
        </Text>
        <Text style={styles.txtSize}>Size: 8</Text>
        <TouchableOpacity style={styles.btnAdd}>
          <Text>ADD TO BAG </Text>
          <Icons
            size={24}
            color={colors.black}
            name="briefcase-plus-outline"
            lib="MaterialCommunityIcons"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.85} style={styles.btnMore}>
        <Icons size={24} color={colors.black} name="dots-vertical" lib="MaterialCommunityIcons" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const WishlistScreen: FC = () => {
  const [products, setProducts] = useState<Product[]>(TempData.sneakers);

  const _renderProducts = () => {
    return products.map((item, index) => {
      return <WishItem data={item} key={index.toString()} />;
    });
  };

  return (
    <Container style={styles.container}>
      <View>{/* TODO number product + share and filter */}</View>
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.contentScrollView}>
          {_renderProducts()}
        </ScrollView>
      </View>
    </Container>
  );
};

export default WishlistScreen;

const hItem = 100;
const wItem = 133;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentScrollView: {
    paddingTop: 10,
    paddingBottom: 25,
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
  btnAdd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 4,
    width: 180,
    paddingVertical: 3,
  },
  btnMore: {
    paddingHorizontal: 5,
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
});
