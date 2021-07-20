import React, {FC} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, fonts, sizes} from '../support/constants';
import {globalStyles} from '../support/globalStyles';

import {Container, Text, Title} from '../support/styledComponents';

const HomeScreen: FC = () => {
  return (
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnMenu: {
    position: 'absolute',
    top: 10,
    left: 10,
    // backgroundColor: 'red',
    padding: 5,
    zIndex: 5,
  },
  boxItemSlider: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  newText: {
    textAlign: 'center',
    backgroundColor: colors.bgScreen,
    paddingHorizontal: 5,
  },
  newLine: {
    height: 1.5,
    width: sizes.wScreen - 100,
    backgroundColor: colors.shark,
  },
  productList: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  productImage: {
    width: 75,
    height: 90,
  },
  productDetail:{
    paddingHorizontal: 10,
    paddingVertical: 15
  }
});
