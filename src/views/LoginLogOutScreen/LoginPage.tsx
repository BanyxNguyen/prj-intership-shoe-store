import React, {FC, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Button, TextInput} from '../../components';
import {LoginCredentials, ValidationInput} from '../../models';
import {colors, sizes} from '../../support/constants';
import {Text, Title} from '../../support/styledComponents';

interface Props {
  toRegister: () => void;
  submit: (data: LoginCredentials) => void;
}
const valUsername: ValidationInput[] = [
  {
    name: 'noEmpty',
  },
  {
    name: 'email',
  },
];

const valPassword: ValidationInput[] = [
  {
    name: 'noEmpty',
  },
];

const LoginPage: FC<Props> = ({toRegister, submit}) => {
  const refTxtUsername = useRef<TextInput>(null);
  const refTxtPassword = useRef<TextInput>(null);
  const refBtn = useRef<Button>(null);

  const signIn: LoginCredentials = {
    email: '',
    password: '',
  };

  const _onChangeText = (name: 'email' | 'password') => (text: string) => {
    signIn[name] = text;
  };

  const _submit = () => {
    const isErrTxtUsername = refTxtUsername.current?.validation();
    const isErrPassword = refTxtPassword.current?.validation();
    if (!isErrTxtUsername && !isErrPassword) {
      submit(signIn);
    } else {
      setTimeout(() => {
        refBtn.current?.done();
      }, 1000);
    }
  };

  LoginPage.prototype.reset = () => {
    console.log('fuck 123');
    
  }

  return (
    <>
      <View style={styles.header}>
        <Title>Login to continue</Title>
      </View>
      <View style={styles.main}>
        <View style={styles.inputBox}>
          <TextInput
            label="Email/Username"
            style={styles.input}
            validation={valUsername}
            onChangeText={_onChangeText('email')}
            ref={refTxtUsername}
          />
          <TextInput
            label="Password"
            secureTextEntry={true}
            style={styles.input}
            validation={valPassword}
            onChangeText={_onChangeText('password')}
            ref={refTxtPassword}
          />
        </View>

        <View style={styles.input}>
          <Button width={widthBtn} mod="black" onPress={_submit} ref={refBtn}>
            LOG IN
          </Button>
          <View style={[styles.registerBox, styles.input]}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={toRegister}>
              <Text style={styles.txtRegister}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default LoginPage;

const widthBtn = sizes.wScreen - 30;

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
    paddingTop: 25,
  },
  inputBox: {
    marginBottom: 10,
  },
  input: {
    // margin: sizes.s1,
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
