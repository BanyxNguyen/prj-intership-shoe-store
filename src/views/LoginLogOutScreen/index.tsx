import {useNavigation, useRoute} from '@react-navigation/native';
import React, {LegacyRef, MutableRefObject, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {colors, sizes} from '../../support/constants';
import {Container, Header} from '../../support/styledComponents';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import _ from 'lodash';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackNavigationProp} from '../../navigators/config';
import {globalStyles} from '../../support/globalStyles';
import Icons from '../../components/Icons';

type Page = 0 | 1;

const LoginLogOutScreen = () => {
  const route = useRoute();
  const stackNav = useNavigation<StackNavigationProp>();
  const refScrollView: MutableRefObject<ScrollView | null> = useRef(null);

  const _goBack = () => {
    stackNav.goBack();
  };

  const _scrollTo = (page: Page) => () => {
    const x = sizes.wScreen * page;
    refScrollView.current?.scrollTo({x, y: 0, animated: true});
  };

  useEffect(() => {
    const page = _.get(route.params, 'page', 0);
    const x = sizes.wScreen * page;
    refScrollView.current?.scrollTo({x, y: 0, animated: false});
  }, []);

  return (
    <Container style={globalStyles.gsFullScreen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.headerBox}>
            <TouchableOpacity style={styles.angleLeft} activeOpacity={0.85} onPress={_goBack}>
              <Icon name="angle-left" size={40} color="#000" />
            </TouchableOpacity>
            <Header style={styles.header}>SHOE STORE</Header>
          </View>
          <ScrollView
            ref={refScrollView}
            horizontal={true}
            // scrollEnabled={false}
            pagingEnabled={true}>
            <View
              style={{
                width: sizes.wScreen,
                height: sizes.hScreen,
              }}>
              <LoginPage toRegister={_scrollTo(1)} />
            </View>
            <View
              style={{
                width: sizes.wScreen,
                height: sizes.hScreen,
              }}>
              <RegisterPage toLogin={_scrollTo(0)} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default LoginLogOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: sizes.h2,
  },
  angleLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: 12,
    paddingHorizontal: 10,
  },
});
