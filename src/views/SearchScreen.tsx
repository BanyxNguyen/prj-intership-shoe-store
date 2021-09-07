import _ from 'lodash';
import React, {Component, FC, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icons from '../components/Icons';
import {LoadingScreen} from '../InitGeneral';
import {ELogic, ModelFilterProduct, OptionMenu, Product} from '../models';
import {goBack, navigate} from '../navigators/navigationService';
import {productService} from '../services';
import {colors, fonts, shadows, sizes} from '../support/constants';
import ItemProduct from './ProductScreen/ItemProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SHOWANDFILTERSCREEN} from '../navigators/config';
import { SlowFetch } from '../utilities';

const HISTORY = 'search_history';
let subTimeout: any;

interface Props {}
interface State {
  products: Product[];
  histories: string[];
  keyword: string;
}

const MyInputSearch: FC<{onChangeText: (str: string) => void}> = ({onChangeText}: any) => {
  const [txt, setTxt] = useState('');
  const _onChangeText = (str: string) => {
    onChangeText && onChangeText(str);
    setTxt(str);
  };
  return (
    <TextInput
      placeholder="Find products..."
      placeholderTextColor={colors.txtGray}
      selectionColor={colors.black}
      style={styles.inputSearch}
      defaultValue={txt}
      onChangeText={_onChangeText}
    />
  );
};

class SearchScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      products: [],
      histories: [],
      keyword: '',
    };
  }

  loadHistory = async () => {
    const result = await AsyncStorage.getItem(HISTORY);
    if (result) {
      const strArr: string[] = JSON.parse(result);
      this.setState({...this.state, histories: strArr});
    }
  };

  saveHistory = (str: string) => {
    const index = _.findIndex(this.state.histories, i => i == str);
    if (index < 0) {
      const temp = [str, ...this.state.histories];
      AsyncStorage.setItem(HISTORY, JSON.stringify(temp));
    }
  };

  _onChangeText = (txt: string) => {
    clearTimeout(subTimeout);
    if (txt == '') {
      this.loadHistory();
      return;
    }
    subTimeout = setTimeout(async () => {
      this.refSearchInput.current?.blur();
      this.fetchProduct(txt);
    }, 1000);
  };

  _clearTextSearch = () => {
    this.loadHistory();
  };

  fetchProduct = async (str: string) => {
    LoadingScreen.start();
    try {
      const temp: ModelFilterProduct = {
        Amount: 50,
        Page: 0,
        PropFilters: [
          {
            IsExactly: false,
            FieldName: 'Ten',
            Logic: ELogic.Or,
            Value: str,
          },
        ],
      };
      const result = await SlowFetch(productService.getProducts(temp), 1500);
      if (result.length > 0) {
        this.saveHistory(str);
        this.setState({...this.state, products: result, keyword: str}, LoadingScreen.stop);
      } else {
        LoadingScreen.stop();
      }
    } catch (error: any) {
      LoadingScreen.stop();
      console.log(error.response);
    }
  };

  _showMore = () => {
    const temp: OptionMenu = {
      Ten: [{key: 'Ten', value: this.state.keyword}],
    };
    navigate(SHOWANDFILTERSCREEN, {
      title: `Search Product [${this.state.products.length}]`,
      options: temp,
    });
  };

  _renderItems = () => {
    return this.state.products?.map((item, index) => {
      return (
        <View style={{paddingHorizontal: 5, paddingVertical: 5}} key={index.toString()}>
          <ItemProduct data={item} size={{width: wItem, height: hItem}} ratioSizeImage={0.5} />
        </View>
      );
    });
  };

  _fetchHistory = (str: string) => () => {
    this.fetchProduct(str);
  };

  componentDidMount() {
    this.loadHistory();
  }
  refSearchInput = React.createRef<TextInput>();
  render() {
    const {histories, products} = this.state;
    return (
      <View style={styles.container}>
        <View style={[styles.header, shadows.s1]}>
          <TouchableOpacity style={styles.btnLeft} onPress={goBack}>
            <Icons size={26} color={colors.black} name="arrow-left" lib="Feather" />
          </TouchableOpacity>
          <View style={styles.inputBox}>
            <TextInput
              ref={this.refSearchInput}
              placeholder="Find products..."
              placeholderTextColor={colors.txtGray}
              selectionColor={colors.black}
              style={styles.inputSearch}
              // value={this.state.txtSearch}
              onChangeText={this._onChangeText}
            />
            {/* <MyInputSearch onChangeText={this._onChangeText} /> */}
            <TouchableOpacity
              style={styles.closeIcon}
              activeOpacity={0.8}
              onPress={this._clearTextSearch}>
              <Icons size={26} color={colors.black} name="md-search-outline" lib="Ionicons" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {histories.length > 0 && products.length <= 0 && (
            <View style={styles.box}>
              <Text style={styles.title}>HISTORY</Text>
              <View style={styles.resultBox}>
                {this.state.histories.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.resultItem}
                      key={index.toString()}
                      onPress={this._fetchHistory(item)}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          {products.length > 0 && (
            <View style={[styles.box, styles.lineBottomBox]}>
              <Text style={styles.keyword}>Keyword: "{this.state.keyword}"</Text>
              <View style={styles.boxTitleGroup}>
                <Text style={styles.title}>PRODUCTS ({products.length})</Text>
                <TouchableOpacity activeOpacity={0.85} onPress={this._showMore}>
                  <Text style={[styles.title, styles.seeAll]}>SEE ALL</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.productsResult}>{this._renderItems()}</View>
            </View>
          )}

          {/* TODO add recommenced history*/}
          {/* <View style={styles.box}>
            <Text style={styles.title}>SUGGESTIONS</Text>
            <View style={styles.resultBox}>
              <View style={styles.resultItem}>
                <Text>ultra boost men[119]</Text>
              </View>
              <View style={styles.resultItem}>
                <Text>running boost men[38]</Text>
              </View>
            </View>
          </View> */}
        </ScrollView>
      </View>
    );
  }
}

export default SearchScreen;

const hItem = sizes.hScreen * 0.35;
const wItem = (sizes.wScreen - 40) * 0.5;

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
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
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
  lineBottomBox: {
    borderBottomColor: colors.black_10,
    borderBottomWidth: 1,
  },
  productsResult: {
    marginBottom: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  resultBox: {
    paddingHorizontal: 5,
  },
  resultItem: {
    marginVertical: 5,
  },
  keyword: {
    marginVertical: 10,
    fontSize: sizes.h5,
  },
});
