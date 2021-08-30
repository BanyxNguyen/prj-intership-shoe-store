import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import _ from 'lodash';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Product, OptionMenu} from '../models';
import {colors, constants, fonts, shadows, sizes} from '../support/constants';
import {SEARCHSCREEN, StackNavigationProp} from '../navigators/config';
import {Container, Text} from '../support/styledComponents';
import Icons from '../components/Icons';
import {TempData} from '../utilities/data';
import {ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import ItemProduct from './ProductScreen/ItemProduct';
import FilterBottomSheet from '../components/FilterBottomSheet';
import {parseOptionToModelFilterRequest} from '../utilities';
import {productService} from '../services';

const ShowAndFilterScreen: FC = () => {
  const route = useRoute();
  const stackNav = useNavigation<StackNavigationProp>();
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState<string>('');
  const [options, setOptions] = useState<OptionMenu>({});

  const _goBack = () => {
    stackNav.goBack();
  };

  const _initData = () => {
    const options: any = _.get(route.params, 'options', {});
    const name: any = _.get(route.params, 'title', '');
    setProducts(TempData.sneakers);
    setTitle(name);
    setOptions(options);
  };

  const _toSearchScreen = () => {
    stackNav.navigate(SEARCHSCREEN, {});
  };

  const _onSubmit = (options: OptionMenu) => {
    let title = '';
    for (const key in options) {
      for (let i = 0; i < options[key].length && i < 4; i++) {
        title += options[key][i].value;
      }
    }
    setTitle(title);
    setOptions(options);
  };

  const fetchProduct = async () => {
    let op = {...options};
    delete options.sort;
    const filter = parseOptionToModelFilterRequest(op);
    const result = await productService.getProducts(filter);
    setProducts(result);
    if(!_.isEmpty(options.sort)) {
      //TODO sort
    }
  };

  useEffect(() => {
    _initData();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [options]);

  return (
    <Container style={styles.container}>
      <View style={[styles.header, shadows.s2]}>
        <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={_goBack}>
          <Icons size={26} color={colors.black} name="arrow-left" lib="Feather" />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>{title}</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={_toSearchScreen}>
          <Icons size={26} color={colors.black} name="md-search-outline" lib="Ionicons" />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.resultBox}>
          <Text style={styles.txtResult}>{products.length} RESULTS</Text>
          <FilterBottomSheet options={options} onSubmit={_onSubmit}>
            <View style={styles.btn}>
              <Icons size={26} color={colors.black} name="options-outline" lib="Ionicons" />
            </View>
          </FilterBottomSheet>
        </View>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles.contentProduct}>
            {products.map((item, index) => {
              return (
                <ItemProduct
                  data={item}
                  key={index.toString()}
                  size={{width: wItem, height: hItem}}
                  ratioSizeImage={0.55}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Container>
  );
};

export default ShowAndFilterScreen;

const hItem = (sizes.hScreen - constants.hHeader * 2) * 0.43;
const wItem = (sizes.wScreen - 4) * 0.5;

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
  resultBox: {
    height: constants.hHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  txtResult: {
    fontFamily: fonts.montserrat.light,
  },
  contentProduct: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
