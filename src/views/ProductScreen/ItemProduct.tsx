import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Product} from '../../models';
import {DETAILSCREEN, StackNavigationProp} from '../../navigators/config';
import {colors, fonts, shadows, sizes} from '../../support/constants';

interface Props {
  data: Product;
  size: {
    width: number;
    height: number;
  };
  ratioSizeImage: number;
}

const ItemProduct: FC<Props> = props => {
  const stackNav = useNavigation<StackNavigationProp>();
  const {data, size, ratioSizeImage} = props;
  const sizeImg = {width: size.width, height: size.height * ratioSizeImage};

  const _toDetail = () => {
    stackNav.navigate(DETAILSCREEN, {data: props.data});
  };

  return (
    <View style={[styles.container, size]}>
      <TouchableOpacity activeOpacity={0.85} style={[styles.item, shadows.s1]} onPress={_toDetail}>
        <View style={[styles.imageItemBox, sizeImg]}>
          <FastImage
            style={[styles.imageItemBox, sizeImg]}
            source={{
              uri: data.images[0],
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>${data.price}</Text>
          </View>
        </View>
        <View style={styles.itemContent}>
          <View style={{flex: 1}}>
            <Text style={styles.titleItem}>{data.name}</Text>
          </View>
          <Text style={styles.txtBrand}>{data.brand}</Text>
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
});
