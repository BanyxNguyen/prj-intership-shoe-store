import React, {FC, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';

import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import ItemProduct from './ItemProduct';
import Icons from '../../components/Icons';
import {selectors} from '../../redux/slices';
import {fetchProducts} from '../../redux/slices/productSlice';
import {Container, Text} from '../../support/styledComponents';
import {Product, OptionMenu, ModelFilterProduct} from '../../models';
import {colors, fonts, shadows, sizes} from '../../support/constants';
import {SEARCHSCREEN, SHOWANDFILTERSCREEN, StackNavigationProp} from '../../navigators/config';

const filterGetAllProduct: ModelFilterProduct = {
  Amount: 100,
  Page: 0,
  PropFilters: [],
};

const ProductScreen: FC = () => {
  const stackNav = useNavigation<StackNavigationProp>();
  const {products} = useSelector(selectors.product.select);
  const [bestSeller, setBestSeller] = useState<Product[]>([]);
  const dispatch = useDispatch();

  const _toSearchScreen = () => {
    stackNav.navigate(SEARCHSCREEN, {});
  };

  const _seeMore = (options: OptionMenu) => () => {
    stackNav.navigate(SHOWANDFILTERSCREEN, {title: `Best sellers[${bestSeller.length}]`, options});
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchProducts(filterGetAllProduct));
    }, 500);
  }, []);

  useEffect(() => {
    setBestSeller(products);
  }, [products]);

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
              <TouchableOpacity style={styles.btnSeeMore} onPress={_seeMore({})}>
                <Text style={styles.btnSeeMoreTxt}>SEE All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{paddingVertical: 5, paddingHorizontal: 20}}>
              {bestSeller.map((item, index) => (
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
