import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import _ from 'lodash';
import FastImage from 'react-native-fast-image';

import {TempData} from '../../utilities/data';
import TextInputControl from './TextInputControl';
import {Container, Text} from '../../support/styledComponents';
import {colors, fonts, shadows, sizes} from '../../support/constants';
import {globalStyles} from '../../support/globalStyles';
import Icons from '../../components/Icons';
import SearchModal from '../../components/SearchModal';
import {navigate} from '../../navigators/navigationService';

const ProductScreen: FC = () => {
  const data = TempData.sneakers;

  const _toSearchScreen = () => {
    navigate('SEARCHSCREEN');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {/* <SearchModal>
        <View style={[styles.searchBox, shadows.s1]}>
          <View style={styles.btnSearch}>
            <Icons
              size={26}
              color={colors.black}
              name="md-search-outline"
              lib="Ionicons"
            />
          </View>
          <Text style={styles.inputSearch}>Find products...</Text>
        </View>
      </SearchModal> */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={_toSearchScreen}
        style={[styles.searchBox, shadows.s1]}>
        <View style={styles.btnSearch}>
          <Icons
            size={26}
            color={colors.black}
            name="md-search-outline"
            lib="Ionicons"
          />
        </View>
        <Text style={styles.inputSearch}>Find products...</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* <TabsProduct /> */}
        <View>
          <Text style={styles.titleBigSlider}>Sneakers</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{paddingVertical: 5}}>
            {data.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index.toString()}
                style={[styles.itemBigSlider, shadows.s7]}>
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
          </ScrollView>
        </View>
        <View>
          <Text style={styles.titleSmallSlider}>Sneakers</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{paddingVertical: 5}}>
            {data.map((item, index) => (
              <TouchableOpacity activeOpacity={0.8} key={index.toString()}>
                <Text>123</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;

const hBigItem = sizes.hScreen * 0.42;
const wBigItem = sizes.wScreen * 0.55;

const styles = StyleSheet.create({
  searchBox: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: colors.bgScreen,
  },
  btnSearch: {
    marginRight: 5,
  },
  inputSearch: {
    flex: 1,
    fontSize: sizes.h6,
    color: colors.txtGray,
    marginBottom: 2,
  },
  content: {
    // padding: 10,
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
  // small slider
  titleSmallSlider: {
    fontFamily: fonts.roboto.bold,
    fontSize: sizes.h5,
  },
});
