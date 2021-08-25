import React, {FC} from 'react';
import {
  View,
  Platform,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackActions, useNavigation} from '@react-navigation/native';

import {Button, TextInput} from '../../components';
import {colors, sizes} from '../../support/constants';
import {Container, Header, Text, Title} from '../../support/styledComponents';
import {LOGINSCREEN, StackNavigationProp} from '../../navigators/config';
import { SignUp } from '../../models';

interface Props {
  toLogin: () => void;
  submit: (data: SignUp) => void;
}

const widthBtn = sizes.wScreen - 30;

const RegisterPage: FC<Props> = ({toLogin}) => {
  const stackNav = useNavigation<StackNavigationProp>();

  const _goBack = () => {
    stackNav.goBack();
  };

  return (
    <>
      <View style={styles.header}>
        <Title>Create account to continue</Title>
      </View>
      <View style={styles.main}>
        <TextInput label="Email" style={styles.pv1} />
        <TextInput label="Password" secureTextEntry={true} style={styles.pv1} />
        <TextInput label="Username" secureTextEntry={true} style={styles.pv1} />
        <View style={styles.pv1}>
          <Button width={widthBtn} mod="black">
            Create Account
          </Button>
          <View style={[styles.registerBox, styles.pv1]}>
            <Text>Do you already have an account?</Text>
            <TouchableOpacity onPress={toLogin}>
              <Text style={styles.txtRegister}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  angleLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: 18,
    paddingHorizontal: 10,
  },
  main: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  pv1: {
    paddingVertical: sizes.s1,
  },
  registerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 4,
  },
  txtRegister: {
    color: colors.red,
    marginLeft: sizes.s1,
  },
});
