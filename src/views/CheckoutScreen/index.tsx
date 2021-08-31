import React, {FC, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

import {Button} from '../../components';
import Icons from '../../components/Icons';
import {selectors} from '../../redux/slices';
import {productService} from '../../services';
import {LoadingScreen} from '../../InitGeneral';
import CustomerInfoCart from './CustomerInfoCart';
import {parseImageStringToArr} from '../../utilities';
import {clearCart} from '../../redux/slices/productSlice';
import {Container, Text} from '../../support/styledComponents';
import {StackNavigationProp, TABDROPS} from '../../navigators/config';
import ProgressCartNumber, {PageIndexType} from './ProgressCartNumber';
import {colors, constants, fonts, shadows, sizes} from '../../support/constants';
import {CartCheckout, EPaymentType, OrderProduct, ProductCartCheckout} from '../../models';

const CheckoutScreen: FC = () => {
  const {cart} = useSelector(selectors.product.select);
  const {infoOrderHistory} = useSelector(selectors.account.select);
  const [productCart, setProductCart] = useState<ProductCartCheckout[]>([]);
  const stackNav = useNavigation<StackNavigationProp>();
  const refScrollView = useRef<ScrollView>(null);
  const refProgressCartNumber = useRef<ProgressCartNumber>(null);
  const dispatch = useDispatch();

  const _getTotal = () => {
    let total = 0;
    productCart.map(i => {
      if (i.StockAmount && i.StockAmount > 0) {
        const price = _.get(i, 'RealPrice', 0);
        total += price * i.Amount;
      }
    });
    return total;
  };

  const _submitOther = async (paymentType: EPaymentType) => {
    try {
      LoadingScreen.start();
      const cartCheckout: CartCheckout[] = productCart
        .filter(i => {
          return i.StockAmount && i.StockAmount > 0;
        })
        .map(i => ({
          Id: i.Id,
          Amount: i.Amount,
          Price: i.RealPrice as number,
          Size: i.SelectedSize as number,
        }));
      console.log('cartCheckout', cartCheckout);

      if (cartCheckout.length <= 0) {
        Alert.alert(`Can't make order!!!`);
        return;
      }

      const temp: OrderProduct = {
        ...infoOrderHistory,
        PaymentType: paymentType,
        NgayLap: new Date(),
        CartList: cartCheckout,
      };
      const result = await productService.createOrderProduct(temp);
      console.log('result order: ', result);
      Alert.alert('Other product success!!!');
      stackNav.navigate(TABDROPS, {});
      dispatch(clearCart());
      if (paymentType == EPaymentType.Prepay) {
        //TODO paypal
      }
      return result;
    } catch (error) {
      console.log('error submit order: ', error.response);
    }
    LoadingScreen.stop();
  };

  const _submitOtherPostPaid = () => {
    // TODO check account login
    // if (_.isEmpty(profile)) return;
    _submitOther(EPaymentType.PostPaid);
  };

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
    const funcAsync = async () => {
      const _cart = cart.filter(i => i.IsSelected);
      try {
        const result = await productService.getExternalProductInfo(_cart);
        setProductCart(result);
      } catch (error) {
        console.log('_cart:', error.response);
        setProductCart([]);
      }
    };
    funcAsync();
  }, [cart]);

  const _renderItemFunc = (data: ProductCartCheckout[]) => {
    return data.map((item, index) => {
      const {HinhAnh, Ten, SelectedSize, Gia} = item;
      const images = parseImageStringToArr(HinhAnh);
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
              Price: ${item.RealPrice || 0}
            </Text>
            <Text numberOfLines={1} style={styles.txt}>
              Size: {SelectedSize} - Amount: {item.Amount}
            </Text>
            <Text numberOfLines={1} style={styles.txt}>
              Status:{' '}
              {item.StockAmount && item.StockAmount > 0 ? (
                <Text style={styles.txtGreen}>Stocking</Text>
              ) : (
                <Text style={styles.txtRed}>Out of stock</Text>
              )}
            </Text>
          </View>
        </View>
      );
    });
  };

  const _renderItem = () => {
    const stocking: ProductCartCheckout[] = [];
    const outOfStock: ProductCartCheckout[] = [];

    for (let i = 0; i < productCart.length; i++) {
      const elm = productCart[i];
      if (elm.StockAmount != undefined) {
        if (elm.StockAmount > 0) {
          stocking.push(elm);
        } else {
          outOfStock.push(elm);
        }
      }
    }

    return (
      <View>
        {outOfStock.length > 0 && <Text style={styles.titleSmall}>Your cart</Text>}
        {_renderItemFunc(stocking)}
        {outOfStock.length > 0 && (
          <View>
            <Text style={styles.titleSmall}>Product is out of stock</Text>
            {_renderItemFunc(outOfStock)}
          </View>
        )}
      </View>
    );
  };

  if (_.isEmpty(cart)) {
    <Container style={[styles.container, styles.errorBox]}>
      <Text style={styles.errTxt}>Network Error. Please connected internet.</Text>
    </Container>;
  }

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
                  <Text style={styles.total}>Total: ${_getTotal()}</Text>
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
                <View style={{flex: 1}}>
                  <View style={styles.btnNext}>
                    <Button width={sizes.wScreen - 30} onPress={_submitOtherPostPaid}>
                      pay on delivery
                    </Button>
                  </View>
                  <View style={styles.btnNext}>
                    <Button mod="black" width={sizes.wScreen - 30}>
                      Paypal
                    </Button>
                  </View>
                </View>
                <Button mod="black" width={sizes.wScreen - 30} onPress={_onNext(1)}>
                  Back
                </Button>
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
  titleSmall: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: sizes.h55,
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
  errorBox: {},
  errTxt: {
    fontSize: sizes.h4,
    textAlign: 'center',
  },
  txtGreen: {
    fontSize: sizes.h55,
    fontFamily: fonts.montserrat.regular,
    color: colors.green,
  },
  txtRed: {
    fontSize: sizes.h55,
    fontFamily: fonts.montserrat.regular,
    color: colors.red,
  },
  opacityItem: {
    opacity: 0.25,
  },
});
