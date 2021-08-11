import _ from 'lodash';
import React, {FC, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icons from '../components/Icons';
import {Product} from '../models';
import {goBack} from '../navigators/navigationService';
import {colors, fonts, shadows, sizes} from '../support/constants';

const SearchScreen: FC = props => {
  const [txtSearch, setTxtSearch] = useState('');
  const {children} = props;

  const _onChangeText = (txt: string) => {
    setTxtSearch(txt);
  };

  const _clearTextSearch = () => {
    setTxtSearch('');
  };

  const _showProductsToFilterModal = () => {};

  return (
    <View style={styles.container}>
      <View style={[styles.header, shadows.s1]}>
        <TouchableOpacity style={styles.btnLeft} onPress={goBack}>
          <Icons size={26} color={colors.black} name="arrow-left" lib="Feather" />
        </TouchableOpacity>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Find products..."
            placeholderTextColor={colors.txtGray}
            selectionColor={colors.black}
            style={styles.inputSearch}
            value={txtSearch}
            onChangeText={_onChangeText}
          />
          {!_.isEmpty(txtSearch) && (
            <TouchableOpacity
              style={styles.closeIcon}
              activeOpacity={0.8}
              onPress={_clearTextSearch}>
              <Icons size={26} color={colors.black} name="md-close-circle" lib="Ionicons" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView>
        <View style={[styles.box, shadows.s1]}>
          <View style={styles.boxTitleGroup}>
            <Text style={styles.title}>PRODUCTS</Text>
            <TouchableOpacity activeOpacity={0.85} onPress={_showProductsToFilterModal}>
              <Text style={[styles.title, styles.seeAll]}>SEE ALL</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsResult}>
            <View style={[styles.productItem, shadows.s2]}></View>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>SUGGESTIONS</Text>
          <View style={styles.suggestionsResult}>
            <View style={styles.suggestionsItem}>
              <Text>ultra boost men[119]</Text>
            </View>
            <View style={styles.suggestionsItem}>
              <Text>running boost men[38]</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const wP = sizes.wScreen * 0.4;
const hP = sizes.hScreen * 0.32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgScreen,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: colors.bgScreen,
  },
  btnLeft: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSearch: {
    flex: 1,
    fontFamily: fonts.montserrat.regular,
    fontSize: sizes.h6,
    color: colors.txtBlack,
    marginTop: 2,
    paddingRight: 40,
  },
  inputBox: {
    flex: 1,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.montserrat.medium,
    fontSize: sizes.h55,
    marginBottom: 20,
  },
  seeAll: {
    fontSize: sizes.h6 - 2,
  },
  boxTitleGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  box: {
    padding: 10,
    backgroundColor: colors.bgScreen,
  },
  productsResult: {
    marginBottom: 20,
  },
  productItem: {
    height: hP,
    width: wP,
    backgroundColor: colors.bgScreen,
  },
  suggestionsResult: {
    paddingHorizontal: 5,
  },
  suggestionsItem: {
    marginVertical: 5,
  },
});
