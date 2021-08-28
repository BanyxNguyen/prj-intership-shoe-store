import React, {FC, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';

import FastImage from 'react-native-fast-image';

import {Product} from '../models';
import Icons from '../components/Icons';
import {TempData} from '../utilities/data';
import {Container, Text} from '../support/styledComponents';
import {colors, fonts, shadows, sizes} from '../support/constants';
import {CHECKOUTSCREEN, DETAILSCREEN, StackNavigationProp} from '../navigators/config';
import {Checkbox} from 'react-native-paper';
import {RootState} from '../redux/slices';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeAmountItemCart,
  changeSizeProductFromCart,
  ProductReduxType,
  removeItemCart,
  selectedAllItemCart,
  triggerSelectedItemCart,
} from '../redux/slices/productSlice';
import SeeMoreBottomSheet from '../components/SeeMoreBottomSheet';
import _ from 'lodash';

interface CartItemProps {
  data: ProductReduxType;
  onMore?: (product: Product) => void;
  onChangeAmount?: (productId: string, amount: number) => void;
  onTriggerSelect?: (productId: string) => void;
}

const CartItem: FC<CartItemProps> = props => {
  // const stackNav = useNavigation<StackNavigationProp>();
  const {data, onMore, onChangeAmount, onTriggerSelect} = props;
  const {name, price, images, amount, selectedSize, isSelected} = data;

  // const _toDetail = () => {
  //   stackNav.navigate(DETAILSCREEN, {data: props.data});
  // };

  const _onMore = () => {
    onMore && onMore(data);
  };

  const _changeAmount = (amount: number) => () => {
    if (data.amount + amount > 0 && onChangeAmount) onChangeAmount(data.id, amount);
  };

  const _onTriggerSelect = () => {
    onTriggerSelect && onTriggerSelect(data.id);
  };

  return (
    <TouchableOpacity activeOpacity={0.85} style={[styles.itemBox, shadows.s1]}>
      {/* <MyCheckBox checked={isSelected || false} onPress={}/> */}
      <Checkbox
        color={colors.black}
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={_onTriggerSelect}
      />
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
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.txt}>
          Price: ${price}
        </Text>
        <Text numberOfLines={1} style={styles.txt}>
          Size: {selectedSize}
        </Text>

        <View style={styles.amountBox}>
          <TouchableOpacity activeOpacity={0.85} onPress={_changeAmount(-1)}>
            <Icons
              size={30}
              color={colors.black_75}
              name="minus-circle-outline"
              lib="MaterialCommunityIcons"
            />
          </TouchableOpacity>
          <Text style={styles.txtAmount}>{amount}</Text>
          <TouchableOpacity activeOpacity={0.85} onPress={_changeAmount(1)}>
            <Icons
              size={30}
              color={colors.black_75}
              name="plus-circle-outline"
              lib="MaterialCommunityIcons"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.85} style={styles.btnMore} onPress={_onMore}>
          <Icons size={24} color={colors.black} name="dots-vertical" lib="MaterialCommunityIcons" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const CartScreen: FC = () => {
  const stackNav = useNavigation<StackNavigationProp>();
  const {cart} = useSelector((state: RootState) => state.product);
  const [productCart, setProductCart] = useState<ProductReduxType[]>([]);
  const refBTS = useRef<SeeMoreBottomSheet>(null);
  const dispatch = useDispatch();

  const _getTotal = () => {
    let amount = 0;
    for (const item of productCart) {
      if (item.isSelected) amount += item.price * item.amount;
    }
    return Math.ceil(amount * 100) / 100;
  };

  const _getStatusCheckAll = () => {
    for (let i = 0; i < productCart.length; i++) {
      if (!productCart[i].isSelected) return false;
    }
    return true;
  };

  const _onMore = (data: Product) => {
    refBTS?.current?.ShowMore(data);
  };

  const _onChangeAmount = (productId: string, amount: number) => {
    dispatch(changeAmountItemCart(productId, amount));
  };

  const _onDelete = (data: Product) => {
    dispatch(removeItemCart(data));
  };

  const _onTriggerSelect = (id: string) => {
    dispatch(triggerSelectedItemCart(id));
  };

  const _onSubmitBTS = (data: Product) => {
    const check = _.findIndex(productCart, i => {
      return i.id == data.id && i.selectedSize != data.selectedSize;
    });
    check > -1 && dispatch(changeSizeProductFromCart(data));
  };

  const _onSelectedAll = () => {
    const status = _getStatusCheckAll();
    dispatch(selectedAllItemCart(!status));
  };

  const _onCheckout = () => {
    stackNav.navigate(CHECKOUTSCREEN, {});
  };

  useEffect(() => {
    setProductCart(cart);
  }, [cart]);

  const _renderProducts = () => {
    return productCart.map((item, index) => {
      return (
        <CartItem
          data={item}
          key={index.toString()}
          onMore={_onMore}
          onChangeAmount={_onChangeAmount}
          onTriggerSelect={_onTriggerSelect}
        />
      );
    });
  };

  return (
    <Container style={styles.container}>
      <View>{/* TODO number product + share and filter */}</View>
      <SeeMoreBottomSheet ref={refBTS} onSubmit={_onSubmitBTS} onDelete={_onDelete} />
      <View style={{flex: 1}}>
        {!_.isEmpty(productCart) && (
          <View style={styles.checkAllBox}>
            <Checkbox
              color={colors.black}
              status={_getStatusCheckAll() ? 'checked' : 'unchecked'}
              onPress={_onSelectedAll}
            />
            <Text>Select all</Text>
          </View>
        )}
        <ScrollView contentContainerStyle={styles.contentScrollView}>
          {_renderProducts()}
        </ScrollView>
      </View>
      <View style={styles.cartControl}>
        <Text style={styles.price}>Total: ${_getTotal()}</Text>
        <TouchableOpacity
          style={[styles.btn, shadows.s5]}
          activeOpacity={0.85}
          onPress={_onCheckout}>
          <Text style={styles.txtBtn}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default CartScreen;

const hItem = 100;
const wItem = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentScrollView: {
    paddingTop: 10,
    paddingBottom: 90,
  },
  checkAllBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
  itemContent: {
    flex: 1,
    paddingVertical: 10,
  },
  txt: {
    fontFamily: fonts.montserrat.regular,
    fontSize: sizes.h55,
  },
  txtName: {
    marginHorizontal: 3,
    fontFamily: fonts.montserrat.semiBold,
  },
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  txtAmount: {
    marginHorizontal: 10,
    fontFamily: fonts.montserrat.semiBold,
  },
  btnMore: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  cartControl: {
    height: 65,
    alignItems: 'center',
    flexDirection: 'row',
    width: sizes.wScreen,
    paddingHorizontal: 45,
    justifyContent: 'space-between',
    backgroundColor: colors.white85,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  price: {
    flex: 1,
    fontSize: sizes.h4,
    textAlign: 'center',
    fontFamily: fonts.roboto.bold,
  },
  btn: {
    height: 45,
    width: sizes.wScreen * 0.3,
    backgroundColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  txtBtn: {
    fontFamily: fonts.montserrat.semiBold,
    color: colors.white,
  },
});
