import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import _ from 'lodash';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Product} from '../models';
import {StackNavigationProp} from '../navigators/config';
import {Container, Text} from '../support/styledComponents';
import {colors, fonts, shadows, sizes} from '../support/constants';
import FastImage from 'react-native-fast-image';
import Icons from '../components/Icons';
import {parseColorStringToArr} from '../utilities';

interface SliderImagesProps {
  data: string[];
}

const SliderImages: FC<SliderImagesProps> = props => {
  const {data} = props;
  const [indexActive, setIndex] = useState(0);

  const _onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!event) return;
    const xOffset = event.nativeEvent.contentOffset.x + 10;
    const index = Math.floor(xOffset / sizes.wScreen);
    if (index != indexActive) {
      setIndex(index);
    }
  };

  const _renderImagesSlider = () => {
    return data.map((item, index) => {
      return (
        <View key={index.toString()}>
          <FastImage
            style={{height: hImage, width: wImage}}
            source={{
              uri: item,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      );
    });
  };

  const _renderDots = () => {
    return data.map((item, index) => {
      const st = index == indexActive ? styles.dotActive : {};
      return <View style={[styles.dot, st]} key={index.toString()} />;
    });
  };

  return (
    <View>
      <ScrollView horizontal pagingEnabled onMomentumScrollEnd={_onScrollEndDrag}>
        {_renderImagesSlider()}
      </ScrollView>
      <View style={styles.dots}>{_renderDots()}</View>
    </View>
  );
};

const DetailScreen: FC = () => {
  const route = useRoute();
  const stackNav = useNavigation<StackNavigationProp>();
  const [product, setProduct] = useState({} as Product);

  const _goBack = () => {
    stackNav.goBack();
  };

  const _initData = () => {
    const data: Product = _.get(route.params, 'data', null);
    if (!_.isEmpty(data)) {
      setProduct(data);
    }
  };

  const _renderColorsLabel = () => {
    const cls = parseColorStringToArr(product.Mau);
    return cls.map((item, index) => {
      return <View style={[styles.circle, {backgroundColor: item}]} key={index.toString()} />;
    });
  };

  useEffect(() => {
    _initData();
  }, []);

  const images: string[] = JSON.parse(product.HinhAnh);

  return (
    <Container style={styles.container}>
      <TouchableOpacity activeOpacity={0.85} style={styles.btnBack} onPress={_goBack}>
        <Icons size={26} color={colors.black} name="arrow-left" lib="Feather" />
      </TouchableOpacity>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <SliderImages data={images} />
        <View style={styles.content}>
          <View style={styles.boxTitle}>
            <Text style={styles.bigTitle}>{product.Ten}</Text>
            <Text style={styles.smallTitle}>{product.ThuongHieu}</Text>
          </View>
          <View style={styles.circles}>{_renderColorsLabel()}</View>
          <Text>{product.MoTa}</Text>
        </View>
      </ScrollView>
      <View style={[styles.cartControl, shadows.s24]}>
        <Text style={styles.price}>$120</Text>
        <TouchableOpacity style={[styles.btn, shadows.s5]} activeOpacity={0.85}>
          <Text style={styles.txtBtn}>ADD TO CART</Text>
          <Icons size={30} color={colors.white} name="add-shopping-cart" lib="MaterialIcons" />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default DetailScreen;

const wImage = sizes.wScreen;
const hImage = sizes.hScreen * 0.45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnBack: {
    height: 50,
    width: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  boxTitle: {
    paddingVertical: 5,
  },
  bigTitle: {
    fontSize: sizes.h2,
    fontFamily: fonts.roboto.bold,
  },
  smallTitle: {
    fontSize: sizes.h5,
    color: colors.blueyGrey,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.bgScreen,
  },
  circles: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginHorizontal: 2.5,
  },
  cartControl: {
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    width: sizes.wScreen,
    paddingHorizontal: 45,
    justifyContent: 'space-between',
    backgroundColor: colors.whiteGray,
  },
  price: {
    flex: 1,
    fontSize: sizes.h3,
    textAlign: 'center',
    fontFamily: fonts.roboto.bold,
  },
  btn: {
    height: 45,
    width: sizes.wScreen * 0.4,
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
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: sizes.wScreen,
  },
  dot: {
    height: 5,
    width: 15,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.black,
  },
  dotActive: {
    backgroundColor: colors.black,
  },
});
