import axios from 'axios';
import React, {FC, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {productService} from '../services';
import {globalStyles} from '../support/globalStyles';
import {StackNavigationProp} from '../navigators/config';
import {colors, fonts, sizes} from '../support/constants';
import {Container, Text, Title} from '../support/styledComponents';

const HomeScreen: FC = () => {
  const stackNav = useNavigation<StackNavigationProp>();

  const _detail = () => {
    stackNav.navigate('DETAILSCREEN', {});
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        // console.log('fuck 1');
        // // let res = await productService.gets();
        // var ins1 = axios.create({
        //   baseURL: 'http://192.168.1.80',
        //   headers: {},
        // });
        // let res = await ins1
        //   .get('/api/Product/GetProducts')
        //   // .catch(x => console.log(x.response));
        // console.log('fuck 2');
        // console.log('data: ', res.data);
        // TODO add real api
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Container style={styles.container}>
        <TouchableOpacity style={styles.btnMenu}>
          <Image
            style={{width: 50, height: 50, tintColor: '#fff'}}
            source={{uri: 'asset:/images/menu-icon.png'}}
          />
        </TouchableOpacity>
        <View>
          <Image
            style={{width: sizes.wScreen, height: sizes.hScreen * 0.56}}
            source={{uri: 'asset:/images/shoes-3.png'}}
          />
          <View style={[StyleSheet.absoluteFill, styles.boxItemSlider]}>
            <Text style={styles.bigTitle}>Nike One 2020</Text>
            <Text style={styles.smallTitle}>Running shoe store</Text>
          </View>
        </View>
        <View style={styles.new}>
          <View style={[StyleSheet.absoluteFill, globalStyles.gsFlexCenter]}>
            <View style={styles.newLine} />
          </View>
          <Title style={styles.newText}>New Trend</Title>
        </View>
        <View style={styles.productList}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={_detail}>
            <Image
              style={styles.productImage}
              source={{uri: 'asset:/images/p-shoe-1.jpg'}}
            />
            <View style={styles.productDetail}>
              <Text style={styles.bigTitle}>Nike One 2020</Text>
              <Text style={styles.smallTitle}>Running shoe store</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.productImage}
              source={{uri: 'asset:/images/p-shoe-1.jpg'}}
            />
            <View style={styles.productDetail}>
              <Text style={styles.bigTitle}>Nike One 2020</Text>
              <Text style={styles.smallTitle}>Running shoe store</Text>
            </View>
          </View>
        </View>
      </Container>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnMenu: {
    top: 10,
    left: 10,
    zIndex: 5,
    padding: 5,
    position: 'absolute',
  },
  boxItemSlider: {
    flex: 1,
    paddingBottom: 5,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  bigTitle: {
    fontSize: sizes.h2,
    fontFamily: fonts.roboto.bold,
  },
  smallTitle: {
    fontSize: sizes.h5,
    color: colors.blueyGrey,
  },
  new: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newText: {
    textAlign: 'center',
    paddingHorizontal: 5,
    backgroundColor: colors.bgScreen,
  },
  newLine: {
    height: 1.5,
    width: sizes.wScreen - 100,
    backgroundColor: colors.shark,
  },
  productList: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  productImage: {
    width: 75,
    height: 90,
  },
  productDetail: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});
