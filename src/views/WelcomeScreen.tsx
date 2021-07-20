import React, {FC} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Button} from '../components';

import {sizes, colors} from '../support/constants';
import {globalStyles} from '../support/globalStyles';
import {StackNavigationProp} from '../navigators/config';

const {gsFullScreen, gsFlex, gsClWhite, gsFlexCenter, gsBgWhite} = globalStyles;
const widthBtn = (sizes.wScreen - 40) / 2;

const WelcomeScreen: FC = () => {
  const stackNav = useNavigation<StackNavigationProp>();

  const _onLogin = () => {
    stackNav.navigate('LOGINLOGOUTSCREEN', {page: 0});
  };

  const _onRegister = () => {
    stackNav.navigate('LOGINLOGOUTSCREEN', {page: 1});
  };

  return (
    <View style={gsFullScreen}>
      <Image style={gsFlex} source={{uri: 'asset:/images/bg-welcome.jpg'}} />
      <View style={StyleSheet.absoluteFill}>
        <View style={{flex: 1}}>
          <View style={styles.main}>
            <Text style={[styles.logoName, gsClWhite]}>ShoeStore</Text>
          </View>
          <View style={[styles.groupBottom, gsFlexCenter, gsBgWhite]}>
            <Button width={widthBtn} onPress={_onLogin} styles={styles.btn}>
              LOG IN
            </Button>
            <Button
              width={widthBtn}
              mod="black"
              styles={styles.btn}
              onPress={_onRegister}>
              REGISTER
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoName: {
    fontSize: 35,
    fontFamily: 'OtomanopeeOne-Regular',
  },
  groupBottom: {
    height: 85,
    flexDirection: 'row',
  },
  btn: {
    marginHorizontal: 5,
  },
});
