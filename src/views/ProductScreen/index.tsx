import React, {FC} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {TempData} from '../../utilities/data';
import TextInputControl from './TextInputControl';
import {Container, Text} from '../../support/styledComponents';
import {colors, fonts, shadows, sizes} from '../../support/constants';
import {globalStyles} from '../../support/globalStyles';

const ProductScreen: FC = () => {
  const data = TempData.sneakers;
  const keyword = 'abc';

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1}}>
          {!_.isEmpty(keyword) && (
            <Text style={styles.txtKeyWord}>
              Search key: "
              <Text style={globalStyles.gsTextBold}>{keyword}</Text>"
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.btnCart}>
          <Icon color="#202020" name="cart-outline" size={36} />
        </TouchableOpacity>
        <TextInputControl />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.titleBigSlider}>Sneakers</Text>
          <View style={styles.bigSlider}>
            {data.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.itemBigSlider, shadows.s7]}
                key={index.toString()}>
                <FastImage
                  style={styles.imageBigItem}
                  source={{
                    uri: item.images[0],
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <View style={[StyleSheet.absoluteFill, styles.contentBigItem]}>
                  {/* <Text style={styles.brandBigItem}>{item.brand}</Text> */}
                  <Text style={styles.titleBigItem}>{item.name}</Text>
                  <Text style={styles.priceBigItem}>${item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ProductScreen;

const hBigItem = sizes.hScreen * 0.42;
const wBigItem = sizes.wScreen * 0.55;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  txtKeyWord: {},
  btnMenu: {},
  btnCart: {
    marginLeft: 5,
  },
  content: {
    padding: 10,
  },
  bigSlider: {
    paddingTop: 5,
    paddingBottom: 10,
  },
  titleBigSlider: {
    fontFamily: fonts.roboto.bold,
    fontSize: sizes.h4,
  },
  itemBigSlider: {
    height: hBigItem,
    width: wBigItem,
    backgroundColor: colors.whiteSmoke,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  imageBigItem: {
    height: hBigItem - 35,
    width: wBigItem,
    backgroundColor: colors.whiteSmoke,
  },
  contentBigItem: {
    padding: 10,
  },
  brandBigItem: {
    fontSize: sizes.h5,
  },
  titleBigItem: {
    fontSize: sizes.h5,
  },
  priceBigItem: {
    fontFamily: fonts.roboto.bold,
    fontSize: sizes.h4,
  },
});
