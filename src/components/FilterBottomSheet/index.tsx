import _ from 'lodash';
import React, {Component, createRef} from 'react';
import {BackHandler, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Chip} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {OptionType, FilterOptions, FilterOptionsKey} from '../../models';
import {navigate} from '../../navigators/navigationService';
import {colors, constants, fonts, sizes} from '../../support/constants';
import {Container} from '../../support/styledComponents';
import {DefaultOptions, DefaultOptionsMenu} from '../../utilities/data';
import Icons from '../Icons';
import ChipsFilterOption, {IOptionType} from './ChipsFilterOption';
import ItemsMenu from './ItemsMenu';

interface Props {
  options: FilterOptions;
}

const filterOptionsDefault: FilterOptions = {
  sort: [],
  gender: [],
  types: [],
  colors: [],
  sizes: [],
  brands: [],
  categories: [],
};

class FilterBottomSheet extends Component<Props> {
  refRBSheet;
  refScrollView;
  refItemMenu;
  refChips;

  filterOptions: FilterOptions = filterOptionsDefault;

  constructor(props: Props) {
    super(props);
    this.refRBSheet = createRef<RBSheet>();
    this.refScrollView = createRef<ScrollView>();
    this.refItemMenu = createRef<ItemsMenu>();
    this.refChips = createRef<ChipsFilterOption>();

    this.state = {
      heightSheet: 100,
    };
  }

  _submit = () => {
    console.log('filter BTS: ', this._checkEmptyFilterOption());
    console.log('filter BTS: ', this.filterOptions);
  };

  _onChangeChips = (item: IOptionType) => {
    const key = item.keyFather as FilterOptionsKey;
    const arr = this.filterOptions[key];
    arr && _.remove(arr, i => _.isEqual(i, {key: item.key, value: item.value}));
    this.filterOptions[key] = arr;
    this.refChips?.current?.ReRenderChips();
  };

  _open = () => {
    this.refRBSheet?.current?.open();
  };

  _close = () => {
    this.refRBSheet?.current?.close();
  };

  _getItems = (item: OptionType) => {
    let temp: OptionType[] = _.get(DefaultOptions, item.key, []);
    return temp;
  };

  _checkEmptyFilterOption = () => {
    for (const key in this.filterOptions) {
      if (!_.isEmpty(_.get(this.filterOptions, key))) return false;
    }
    return true;
  };

  _scrollViewToItemMenu = (item: OptionType) => () => {
    if (this.refItemMenu && this.refItemMenu.current) {
      this.refItemMenu.current.RenderItemsMenu({
        father: item,
        items: this._getItems(item),
      });
      this.refScrollView?.current?.scrollToEnd();
    }
  };

  _scrollViewBackMenu = () => {
    this.refScrollView?.current?.scrollTo({x: 0, y: 0, animated: true});
    this.refChips?.current?.ReRenderChips();
  };

  _renderMenu = () => {
    return DefaultOptionsMenu.map((item, index) => {
      return (
        <TouchableOpacity
          activeOpacity={0.85}
          key={index.toString()}
          style={styles.menuItem}
          onPress={this._scrollViewToItemMenu(item)}>
          <Text>{item.value}</Text>
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <>
        <TouchableOpacity activeOpacity={0.85} onPress={this._open}>
          {this.props.children}
        </TouchableOpacity>
        <RBSheet
          ref={this.refRBSheet}
          height={hBottomSheet}
          closeOnDragDown={false}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: colors.black_25,
            },
            draggableIcon: {
              flex: 1,
              backgroundColor: colors.black,
            },
          }}>
          <Container style={styles.container}>
            <ScrollView horizontal pagingEnabled scrollEnabled={false} ref={this.refScrollView}>
              <View style={[styles.itemContainer, {padding: 15}]}>
                <View style={styles.topBox}>
                  <View style={{flex: 1}}>
                    <Text style={styles.title}>REFINE RESULTS</Text>
                    <Text style={styles.amountResult}>520 products</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.btnClose}
                    onPress={this._close}>
                    <Icons size={36} color={colors.black} name="close-outline" lib="Ionicons" />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                  <ScrollView contentContainerStyle={{paddingTop: 15, paddingBottom: 95}}>
                    <ChipsFilterOption
                      ref={this.refChips}
                      filterOptions={this.filterOptions}
                      onChangeItem={this._onChangeChips}
                    />
                    <TouchableOpacity style={styles.btnClear}>
                      <View style={styles.btnClearUnderline}>
                        <Text style={styles.btnClearTxt}>CLEAR ALL</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.menu}>{this._renderMenu()}</View>
                  </ScrollView>
                </View>
              </View>
              <View style={[styles.itemContainer, {backgroundColor: 'red'}]}>
                <ItemsMenu
                  ref={this.refItemMenu}
                  onBack={this._scrollViewBackMenu}
                  filterOptions={this.filterOptions}
                />
              </View>
            </ScrollView>
            <View style={styles.confirmBox}>
              <TouchableOpacity
                style={styles.btnConfirm}
                activeOpacity={0.85}
                onPress={this._submit}>
                <Text style={styles.btnConfirmTxt}>VIEW ITEM</Text>
                <Icons size={30} color={colors.white} name="arrow-right-alt" lib="MaterialIcons" />
              </TouchableOpacity>
            </View>
          </Container>
        </RBSheet>
      </>
    );
  }
}

export default FilterBottomSheet;

const hBottomSheet = sizes.hScreen - constants.statusBar - constants.hHeader * 1.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemContainer: {
    height: hBottomSheet,
    width: sizes.wScreen,
  },
  topBox: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  title: {
    fontSize: sizes.h5,
    fontFamily: fonts.montserrat.semiBold,
  },
  amountResult: {
    marginTop: 10,
    color: colors.blueyGrey,
  },
  btnClose: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    marginRight: -5,
  },
  btnClear: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnClearUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    marginBottom: 15,
  },
  btnClearTxt: {
    fontSize: sizes.h7,
    fontFamily: fonts.montserrat.semiBold,
  },
  menu: {},
  menuItem: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderColor: colors.black_10,
    borderBottomWidth: 1,
  },
  confirmBox: {
    position: 'absolute',
    bottom: 15,
    left: 15,
  },
  btnConfirm: {
    height: 50,
    width: sizes.wScreen - 30,
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnConfirmTxt: {
    fontFamily: fonts.montserrat.semiBold,
    color: colors.white,
  },
});
