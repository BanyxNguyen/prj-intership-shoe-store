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
        <View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>BEST SELLERS</Text>
            <TouchableOpacity style={styles.btnSeeMore}>
              <Text style={styles.btnSeeMoreTxt}>SEE All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{paddingVertical: 5, paddingHorizontal: 20}}>
            {data.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index.toString()}
                style={styles.item}>
                <View style={styles.imageItemBox}>
                  <FastImage
                    style={styles.imageItem}
                    source={{
                      uri: item.images[0],
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <View style={styles.priceBox}>
                    <Text style={styles.priceText}>$300.00</Text>
                  </View>
                </View>
                <View style={styles.itemContent}>
                  <Text>123</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;

const hItem = sizes.hScreen * 0.42;
const wItem = sizes.wScreen * 0.4;

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
  content: {},
  titleBox: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: fonts.montserrat.bold,
    fontSize: sizes.h5,
  },
  btnSeeMore: {
    borderBottomWidth: 1.5,
    borderBottomColor: colors.black,
  },
  btnSeeMoreTxt: {
    fontFamily: fonts.montserrat.medium,
    fontSize: sizes.h6,
  },
  item: {
    width: wItem,
    height: hItem,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 2.5,
  },
  imageItemBox: {
    width: wItem,
    height: hItem * 0.45,
    // backgroundColor: 'blueviolet',
  },
  imageItem: {
    width: wItem,
    height: hItem * 0.45,
  },
  priceBox: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    left: 10,
    bottom: -15,
  },
  priceText: {
    height: 25,
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    backgroundColor: colors.whiteSmoke,
    color: colors.txtBlack,
    fontFamily: fonts.montserrat.light,
  },
  itemContent: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
});
