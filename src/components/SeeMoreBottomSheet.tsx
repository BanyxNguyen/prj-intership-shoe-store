import React, {Component, createRef} from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';

import _ from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';

import Icons from './Icons';
import {Product} from '../models';
import {Text} from '../support/styledComponents';
import {colors, fonts, sizes} from '../support/constants';

interface Props {
  onSubmit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

interface State {
  product: Product;
}

class SeeMoreBottomSheet extends Component<Props, State> {
  refRBSheet;
  refScrollView;

  constructor(props: Props) {
    super(props);
    this.refRBSheet = createRef<RBSheet>();
    this.refScrollView = createRef<ScrollView>();
    this.state = {product: {} as Product};
  }

  ShowMore = (product: Product) => {
    this._open();
    this.setState({product});
  };

  private _open = () => {
    this.refRBSheet?.current?.open();
  };

  private _close = () => {
    this.refRBSheet?.current?.close();
  };

  private _onDelete = () => {
    const {onDelete} = this.props;
    onDelete && onDelete(this.state.product);
    this._close();
  };

  private _onSubmit = () => {
    const {onSubmit} = this.props;
    onSubmit && onSubmit(this.state.product);
    this._close();
  };

  private _onPressSelectSize = (item: number) => () => {
    const product: Product = {...this.state.product, SelectedSize: item};
    this.setState({product});
  };

  private _renderSizes = () => {
    const {product} = this.state;
    if (_.isEmpty(product) || _.isEmpty(product.KichThuocs)) return <></>;
    return product.KichThuocs.map((item, index) => {
      let st = {};
      if (product.SelectedSize && _.isEqual(item, product.SelectedSize)) st = styles.txtItemActive;
      return (
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.item}
          onPress={this._onPressSelectSize(item)}
          key={index.toString()}>
          <Text style={[styles.txtItem, st]}>{item}</Text>
        </TouchableOpacity>
      );
    });
  };

  private _renderContainer = () => {
    const {product} = this.state;
    if (_.isEmpty(product)) return <></>;
    return (
      <View style={styles.container}>
        <ScrollView horizontal ref={this.refScrollView}>
          <View style={styles.main}>
            <View style={styles.headerBox}>
              <TouchableOpacity activeOpacity={0.85} style={styles.btn} onPress={this._close}>
                <Text style={[styles.txt, styles.txtCancel]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} style={styles.btn} onPress={this._onSubmit}>
                <Text style={[styles.txt, styles.txtDone]}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <View style={styles.contentItemLeft}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.btnDel}
                  onPress={this._onDelete}>
                  <Icons
                    size={100}
                    color={colors.red}
                    name="delete-outline"
                    lib="MaterialCommunityIcons"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.contentItemRight}>
                <View style={styles.titleBox}>
                  <Text style={styles.title}>Size: </Text>
                </View>
                <View style={{flex: 1}}>
                  <ScrollView>{this._renderSizes()}</ScrollView>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  render() {
    return (
      <>
        {/* <TouchableOpacity onPress={() => this.refRBSheet?.current?.open()}>
          {this.props.children}
        </TouchableOpacity> */}
        <RBSheet
          ref={this.refRBSheet}
          height={hSheet}
          openDuration={250}
          customStyles={{
            wrapper: {
              backgroundColor: colors.black_50,
            },
          }}>
          {this._renderContainer()}
        </RBSheet>
      </>
    );
  }
}

export default SeeMoreBottomSheet;

const hSheet = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    height: hSheet,
    width: sizes.wScreen,
    padding: 5,
  },
  headerBox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderBottomColor: colors.blueyGrey,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  contentItemLeft: {
    flex: 1,
    borderRightColor: colors.blueyGrey,
    borderRightWidth: 1,
    paddingRight: 15,
  },
  contentItemRight: {
    flex: 3,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.montserrat.semiBold,
  },
  btn: {
    paddingVertical: 10,
  },
  btnDel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontFamily: fonts.montserrat.semiBold,
  },
  txtCancel: {
    color: colors.red,
  },
  txtDone: {
    color: colors.blue,
  },
  items: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  item: {
    paddingVertical: 10,
  },
  txtItem: {
    color: colors.cloudyBlue,
    textAlign: 'center',
  },
  txtItemActive: {
    fontFamily: fonts.montserrat.semiBold,
    color: colors.black,
  },
});
