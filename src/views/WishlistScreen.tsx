import React, {FC, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';

import FastImage from 'react-native-fast-image';

import {Product} from '../models';
import Icons from '../components/Icons';
import {TempData} from '../utilities/data';
import {Container, Text} from '../support/styledComponents';
import {colors, fonts, shadows, sizes} from '../support/constants';
import {DETAILSCREEN, StackNavigationProp} from '../navigators/config';
import {useDispatch, useSelector} from 'react-redux';
import {addItemCart} from '../redux/slices/productSlice';
import SeeMoreBottomSheet from '../components/SeeMoreBottomSheet';
import {RootState} from '../redux/slices';
import {
  changeSizeProductFromWishlish,
  triggerProductToWishlist,
} from '../redux/slices/productSlice';
import _ from 'lodash';

interface WishItemProps {
  data: Product;
  onMore?: (product: Product) => void;
}

const WishItem: FC<WishItemProps> = props => {
  const dispatch = useDispatch();
  const stackNav = useNavigation<StackNavigationProp>();

  const {name, price, images, selectedSize} = props.data;

  const _toDetail = () => {
    stackNav.navigate(DETAILSCREEN, {data: props.data});
  };

  const _addCart = () => {
    dispatch(addItemCart(props.data));
  };

  const _onMore = () => {
    const {onMore} = props;
    onMore && onMore(props.data);
  };

  return (
    <TouchableOpacity activeOpacity={0.85} style={[styles.itemBox, shadows.s1]} onPress={_toDetail}>
      <FastImage
        style={{height: hItem, width: wItem}}
        source={{
          uri: images[0],
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.itemContent}>
        <Text style={styles.txtPrice}>${price}</Text>
        <Text numberOfLines={1} style={styles.txtName}>
          {name}
        </Text>
        {selectedSize && <Text style={styles.txtSize}>Size: {selectedSize}</Text>}
        <TouchableOpacity style={styles.btnAdd} onPress={_addCart}>
          <Text>ADD TO BAG </Text>
          <Icons
            size={24}
            color={colors.black}
            name="briefcase-plus-outline"
            lib="MaterialCommunityIcons"
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.85} style={styles.btnMore} onPress={_onMore}>
          <Icons size={24} color={colors.black} name="dots-vertical" lib="MaterialCommunityIcons" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const WishlistScreen: FC = () => {
  const wishlist = useSelector((state: RootState) => state.product.wishlist);
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const refBTS = useRef<SeeMoreBottomSheet>(null);

  const _onMore = (product: Product) => {
    refBTS?.current?.ShowMore(product);
  };

  const _onDelete = (data: Product) => {
    dispatch(triggerProductToWishlist(data));
  };

  const _onSubmitBTS = (data: Product) => {
    const check = _.findIndex(products, i => {
      return i.id == data.id && i.selectedSize != data.selectedSize;
    });
    check > -1 && dispatch(changeSizeProductFromWishlish(data));
  };

  const _renderProducts = () => {
    return products.map((item, index) => {
      return <WishItem data={item} key={index.toString()} onMore={_onMore} />;
    });
  };

  useEffect(() => {
    setProducts(wishlist);
  }, [wishlist]);

  return (
    <Container style={styles.container}>
      <View>{/* TODO number product + share and filter */}</View>
      <SeeMoreBottomSheet ref={refBTS} onSubmit={_onSubmitBTS} onDelete={_onDelete} />
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.contentScrollView}>
          {_renderProducts()}
        </ScrollView>
      </View>
    </Container>
  );
};

export default WishlistScreen;

const hItem = 100;
const wItem = 133;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentScrollView: {
    paddingTop: 10,
    paddingBottom: 25,
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
  btnAdd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 4,
    width: 180,
    paddingVertical: 3,
    marginTop: 5,
  },
  btnMore: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  txtPrice: {
    fontFamily: fonts.montserrat.regular,
    fontSize: sizes.h5,
  },
  txtName: {
    marginHorizontal: 3,
    fontFamily: fonts.montserrat.semiBold,
  },
  txtSize: {},
});
