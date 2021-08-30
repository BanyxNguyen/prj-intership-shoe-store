import {useNavigation} from '@react-navigation/native';
import React, {Component, FC, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Button} from '../../components';
import Icons from '../../components/Icons';
import {StackNavigationProp} from '../../navigators/config';
import {RootState} from '../../redux/slices';
import {ProductReduxType} from '../../redux/slices/productSlice';
import {colors, constants, fonts, shadows, sizes} from '../../support/constants';
import {Container, Text} from '../../support/styledComponents';
import CustomerInfoCart from './CustomerInfoCart';
import ProgressCartNumber, {PageIndexType} from './ProgressCartNumber';

const CheckoutScreen: FC = () => {
  const {cart} = useSelector((state: RootState) => state.product);
  const [productCart, setProductCart] = useState<ProductReduxType[]>([]);
  const stackNav = useNavigation<StackNavigationProp>();
  const refScrollView = useRef<ScrollView>(null);
  const refProgressCartNumber = useRef<ProgressCartNumber>(null);

  const _goBack = () => {
    stackNav.goBack();
  };

  const _scrollViewTo = (page: PageIndexType) => {
    const x = sizes.wScreen * page;
    refScrollView?.current?.scrollTo({x, y: 0, animated: true});
  };

  const _onNext = (page: PageIndexType) => () => {
    _scrollViewTo(page);
    refProgressCartNumber?.current?.SetProgress(page);
  };

  useEffect(() => {
    setProductCart(cart);
  }, [cart]);

  const _renderItem = () => {
    return productCart
      .filter(i => i.IsSelected)
      .map((item, index) => {
        // if (!item.isSelected) return <></>;
        const {HinhAnh, Ten, SelectedSize, Gia} = item;
        const images: string[] = JSON.parse(HinhAnh);
        return (
          <View style={[styles.itemBox, shadows.s1]} key={index.toString()}>
            <FastImage
              style={{height: hItem, width: wItem}}
              source={{
                uri: images[0],
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.itemContent}>
              <Text numberOfLines={1} style={styles.txtName}>
                {Ten}
              </Text>
              <Text numberOfLines={1} style={styles.txt}>
                Price: ${Gia}
              </Text>
              <Text numberOfLines={1} style={styles.txt}>
                Size: {SelectedSize}
              </Text>
            </View>
          </View>
        );
      });
  };

  return (
    <Container style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={[styles.header, shadows.s2]}>
          <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={_goBack}>
            <Icons size={26} color={colors.black} name="arrow-left" lib="Feather" />
          </TouchableOpacity>
          <Text style={styles.title}>Checkout</Text>
        </View>
        <View style={styles.content}>
          <ProgressCartNumber ref={refProgressCartNumber} />
          <View style={{flex: 1}}>
            <ScrollView
              horizontal
              ref={refScrollView}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <View style={styles.contentBox}>
                <View style={styles.totalBox}>
                  <Text style={styles.total}>Total: $ sum price from server</Text>
                </View>
                <ScrollView>{_renderItem()}</ScrollView>
                <View style={styles.btnNext}>
                  <Button mod="black" width={sizes.wScreen - 30} onPress={_onNext(1)}>
                    Next
                  </Button>
                </View>
              </View>
              <View style={styles.contentBox}>
                <Text style={styles.total}>Customer Information</Text>
                <ScrollView style={{minHeight: sizes.hScreen * 0.3}}>
                  <CustomerInfoCart />
                </ScrollView>
                <View style={styles.btnNextGroup}>
                  <View style={[styles.btnNext, {marginHorizontal: 5}]}>
                    <Button mod="black" width={(sizes.wScreen - 40) / 2} onPress={_onNext(0)}>
                      Back
                    </Button>
                  </View>
                  <View style={[styles.btnNext, {marginHorizontal: 5}]}>
                    <Button mod="black" width={(sizes.wScreen - 40) / 2} onPress={_onNext(2)}>
                      Next
                    </Button>
                  </View>
                </View>
              </View>
              <View style={styles.contentBox}>
                <View style={styles.btnNext}>
                  <Button width={sizes.wScreen - 30}>pay on delivery</Button>
                </View>
                <View style={styles.btnNext}>
                  <Button mod="black" width={sizes.wScreen - 30}>
                    Paypal
                  </Button>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default CheckoutScreen;

const hItem = 100;
const wItem = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingVertical: 5,
  },
  contentBox: {
    width: sizes.wScreen,
    paddingHorizontal: 5,
  },
  header: {
    height: constants.hHeader,
    backgroundColor: colors.bgScreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: constants.hHeader,
    width: constants.hHeader,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  itemBox: {
    backgroundColor: colors.white,
    marginBottom: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.otomanopeeOneRegular,
    fontSize: sizes.h4,
    textTransform: 'uppercase',
  },

  itemContent: {
    flex: 1,
    paddingVertical: 10,
  },
  txt: {
    fontSize: sizes.h55,
    fontFamily: fonts.montserrat.regular,
  },
  txtName: {
    marginHorizontal: 3,
    fontFamily: fonts.montserrat.semiBold,
  },
  totalBox: {
    marginBottom: 10,
  },
  total: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: sizes.h4,
  },
  btnNext: {
    marginTop: 10,
    alignItems: 'center',
  },
  btnNextGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
