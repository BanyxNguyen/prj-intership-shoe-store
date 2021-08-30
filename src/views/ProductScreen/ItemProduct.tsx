import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {Config} from '../../../appConfig';
import Icons from '../../components/Icons';
import {Product} from '../../models';
import {DETAILSCREEN, StackNavigationProp} from '../../navigators/config';
import {RootState} from '../../redux/slices';
import {triggerProductToWishlist} from '../../redux/slices/productSlice';
import {colors, fonts, shadows, sizes} from '../../support/constants';
import {parseImageStringToArr} from '../../utilities';

interface Props {
  data: Product;
  size: {
    width: number;
    height: number;
  };
  ratioSizeImage: number;
}

const ItemProduct: FC<Props> = props => {
  const wishlist = useSelector((state: RootState) => state.product.wishlist);
  const stackNav = useNavigation<StackNavigationProp>();
  const dispatch = useDispatch();
  const {data, size, ratioSizeImage} = props;
  const sizeImg = {width: size.width, height: size.height * ratioSizeImage};

  const _toDetail = () => {
    stackNav.navigate(DETAILSCREEN, {data: props.data});
  };

  const _triggerWishlish = () => {
    dispatch(triggerProductToWishlist(props.data));
  };

  const _checkFavorite = (id: string) => {
    return _.findIndex(wishlist, i => i.Id == id) > -1;
  };

  const _iconFavorite = () => {
    let st = {color: colors.black, name: 'heart-outline'};
    if (_checkFavorite(data.Id)) st = {color: colors.blueyGrey, name: 'heart'};
    return <Icons size={24} {...st} lib="MaterialCommunityIcons" />;
  };

  const images = parseImageStringToArr(data.HinhAnh);

  return (
    <View style={[styles.container, size]}>
      <TouchableOpacity activeOpacity={0.85} style={[styles.item, shadows.s1]} onPress={_toDetail}>
        <View style={[styles.imageItemBox, sizeImg]}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.btnFavorite}
            onPress={_triggerWishlish}>
            {_iconFavorite()}
          </TouchableOpacity>
          {!_.isEmpty(images) ? (
            <FastImage
              style={[styles.imageItemBox, sizeImg]}
              source={{
                uri: images[0],
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View style={[styles.imageItemBox, sizeImg]} />
          )}

          <View style={styles.priceBox}>
            <Text style={styles.priceText}>${data.Gia}</Text>
          </View>
        </View>
        <View style={styles.itemContent}>
          <View style={{flex: 1}}>
            <Text style={styles.titleItem}>{data.Ten}</Text>
          </View>
          <Text style={styles.txtBrand}>{data.ThuongHieu}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemProduct;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  item: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    overflow: 'hidden',
  },
  imageItemBox: {},
  priceBox: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    left: 10,
    bottom: -20,
  },
  priceText: {
    height: 25,
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    backgroundColor: colors.whiteSmoke,
    color: colors.txtBlack,
    fontFamily: fonts.montserrat.light,
  },
  itemContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 23,
    paddingBottom: 15,
  },
  titleItem: {
    fontFamily: fonts.montserrat.semiBold,
    fontSize: sizes.h6,
    // textAlign: 'justify',
    textTransform: 'uppercase',
  },
  txtBrand: {
    color: colors.blueyGrey,
  },
  btnFavorite: {
    position: 'absolute',
    right: 5,
    top: 2,
    padding: 5,
    zIndex: 10,
  },
});
