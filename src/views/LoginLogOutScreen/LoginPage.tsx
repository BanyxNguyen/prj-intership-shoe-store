import React, {FC, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Button, MyTextInput} from '../../components';
import {EnumLogin, Login, ValidationInput} from '../../models';
import {colors, sizes} from '../../support/constants';
import {Text, Title} from '../../support/styledComponents';
import {valPassword, valUsername} from './variable';

interface Props {
  toRegister: () => void;
  submit?: (data: Login) => void;
}

const loginDefault = {
  UserName: '',
  PassWord: '',
};

const LoginPage: FC<Props> = ({toRegister, submit}) => {
  const refTxtUsername = useRef<MyTextInput>(null);
  const refTxtPassword = useRef<MyTextInput>(null);
  const refBtn = useRef<Button>(null);
  const [login, setLogin] = useState<Login>(loginDefault);

  const _onChangeText = (name: EnumLogin) => (text: string) => {
    setLogin({...login, [name]: text});
  };

  const _submit = () => {
    const isErrTxtUsername = refTxtUsername.current?.validation();
    const isErrPassword = refTxtPassword.current?.validation();
    if (!isErrTxtUsername && !isErrPassword) {
      submit && submit(login);
    } else {
      setTimeout(() => {
        refBtn.current?.done();
      }, 1000);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Title>Login to continue</Title>
      </View>
      <View style={styles.main}>
        <View style={styles.inputBox}>
          <MyTextInput
            label="Email/Username"
            style={styles.input}
            validation={valUsername}
            onChangeText={_onChangeText('UserName')}
            value={login.UserName}
            ref={refTxtUsername}
          />
          <MyTextInput
            label="Password"
            secureTextEntry={true}
            style={styles.input}
            validation={valPassword}
            onChangeText={_onChangeText('PassWord')}
            value={login.PassWord}
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
