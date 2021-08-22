import React, {Component, FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Product} from '../models';
import {Button} from '../components';
import {StackNavigationProp} from '../navigators/config';
import {Container, Text} from '../support/styledComponents';
import {colors, fonts, shadows, sizes} from '../support/constants';
import FastImage from 'react-native-fast-image';
import Icons from '../components/Icons';

const driveLink = 'https://drive.google.com/uc?export=view&id=';
const defaultProduct = {
  //https://www.dsw.com/en/us/product/adidas-daily-3-training-shoe---mens/508057?activeColor=400
  name: `DAILY 3 TRAINING SHOE - MEN'S`,
  brand: 'Adidas',
  price: 54.99,
  type: ['school', 'kid', 'men'],
  size: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
  color: ['#285199'],
  description: `Workout in some vibrant style in the Daily 3 training shoe by Adidas. Made of washed canvas 
  upper for breathable feel, this low-top sneaker features OrthoLite® sockliner footbed for plush cushioning 
  with every step.
  \n\nItem # 508057
  \nUPC # 194830771060`,
  images: [
    `${driveLink}13eg0v9-5-d7lmXi3vzgNHqCV_uboCsRy`,
    `${driveLink}112uxP52_xPiXuT719eLjw1r7HNv1o9iZ`,
    `${driveLink}17kgCJv1H0kfvMSew6PBauNBlWI0xjEPf`,
    `${driveLink}1d0i_HxUgNCTSk87PTf1c8LD6qFHc2u6F`,
    `${driveLink}1_m70asBfmWdp6LhgvPGtcpJjqFxgF7On`,
    `${driveLink}1yei05ASpKfrSe39qA_ysX3ZXv_qgN12Z`,
    `${driveLink}18-mk9AigNOdpfi89xvsyEYeEePSHcXdm`,
  ],
};

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
  const [product, setProduct] = useState(defaultProduct);
  const {name, images, brand, description, color} = product;

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
    return color.map((item, index) => {
      return <View style={[styles.circle, {backgroundColor: item}]} key={index.toString()} />;
    });
  };

  useEffect(() => {
    _initData();
  }, []);

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
            <Text style={styles.bigTitle}>{name}</Text>
            <Text style={styles.smallTitle}>{brand}</Text>
          </View>
          <View style={styles.circles}>{_renderColorsLabel()}</View>
          <Text>{description}</Text>
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
    zIndex: 10
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
