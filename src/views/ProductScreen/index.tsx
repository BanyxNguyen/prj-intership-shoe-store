import React, {FC} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import Icons from '../../components/Icons';
import {TempData} from '../../utilities/data';
import {navigate} from '../../navigators/navigationService';
import {SEARCHSCREEN, SHOWANDFILTERSCREEN, StackNavigationProp} from '../../navigators/config';
import {Container, Text} from '../../support/styledComponents';
import {colors, fonts, shadows, sizes} from '../../support/constants';
import {Product, ProductOptions} from '../../models';
import ItemProduct from './ItemProduct';

const ProductScreen: FC = () => {
  const stackNav = useNavigation<StackNavigationProp>();
  const data = TempData.sneakers;

  const _toSearchScreen = () => {
    // navigate('SEARCHSCREEN');
    stackNav.navigate(SEARCHSCREEN, {});
  };

  const _seeMore = (_data: Product[]) => () => {
    const options: ProductOptions = {};
    stackNav.navigate(SHOWANDFILTERSCREEN, {title: 'Best sellers[10]', options});
  };

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={_toSearchScreen}
          style={[styles.searchBox, shadows.s1]}>
          <View style={styles.btnSearch}>
            <Icons size={26} color={colors.black} name="md-search-outline" lib="Ionicons" />
          </View>
          <Text style={styles.inputSearch}>Find products...</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <View>
            <View style={styles.titleBox}>
              <Text style={styles.title}>BEST SELLERS</Text>
              <TouchableOpacity style={styles.btnSeeMore} onPress={_seeMore(data)}>
                <Text style={styles.btnSeeMoreTxt}>SEE All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{paddingVertical: 5, paddingHorizontal: 20}}>
              {data.map((item, index) => (
                <ItemProduct
                  data={item}
                  key={index.toString()}
                  size={{width: wItem, height: hItem}}
                  ratioSizeImage={0.44}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ProductScreen;

const hItem = sizes.hScreen * 0.38;
const wItem = sizes.wScreen * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});
