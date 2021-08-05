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
          </View>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{paddingVertical: 5, paddingHorizontal: 20}}>
            {data.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index.toString()}
                style={styles.item}>
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
  title: {
    fontFamily: fonts.montserrat.bold,
    fontSize: sizes.h5,
  },
  titleBox: {
    marginHorizontal: 20,
    marginVertical: 25,
  },
  item: {
    width: wItem,
    height: hItem,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 2.5,
  },
});
