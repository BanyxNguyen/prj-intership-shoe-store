import {useNavigation, useRoute} from '@react-navigation/native';
import React, {FC, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {sizes} from '../../support/constants';
import {Container, Header} from '../../support/styledComponents';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import _ from 'lodash';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackNavigationProp} from '../../navigators/config';
import {globalStyles} from '../../support/globalStyles';
import {Login, Register} from '../../models';
import {accountService} from '../../services';
import {loginUser, registerUser} from '../../redux/slices/accountsSlice';
import {useDispatch} from 'react-redux';

type Page = 0 | 1;

const LoginLogOutScreen: FC = () => {
  const route = useRoute();
  const stackNav = useNavigation<StackNavigationProp>();
  const refScrollView = useRef<ScrollView>(null);
  const dispatch = useDispatch();

  const _goBack = () => {
    stackNav.goBack();
  };

  const _scrollTo = (page: Page) => () => {
    const x = sizes.wScreen * page;
    refScrollView.current?.scrollTo({x, y: 0, animated: true});
  };

  const _callback = (result: boolean) => {
    if (result) _goBack();
  };

  const _submitLogin = async (data: Login) => {
    dispatch(loginUser(data, _callback));
  };

  const _submitSignUp = async (data: Register) => {
    console.log(data);

    dispatch(registerUser(data, _callback));
  };

  useEffect(() => {
    const page = _.get(route.params, 'page', 0);
    const x = sizes.wScreen * page;
    refScrollView.current?.scrollTo({x, y: 0, animated: false});
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.gsFullScreen}
      keyboardVerticalOffset={50}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container style={{flex: 1}}>
            <View style={styles.headerBox}>
              <TouchableOpacity style={styles.angleLeft} activeOpacity={0.85} onPress={_goBack}>
                <Icon name="angle-left" size={40} color="#000" />
              </TouchableOpacity>
              <Header style={styles.header}>SHOE STORE</Header>
            </View>
            <View style={{flex: 1}}>
              <ScrollView
                ref={refScrollView}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View style={styles.contentItem}>
                  <LoginPage toRegister={_scrollTo(1)} submit={_submitLogin} />
                </View>
                <View style={styles.contentItem}>
                  <RegisterPage toLogin={_scrollTo(0)} submit={_submitSignUp} />
                </View>
              </ScrollView>
            </View>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
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
  contentItem: {
    width: sizes.wScreen,

    // minHeight: sizes.hScreen,
  },
});
