import React, {FC, useRef, useState} from 'react';
import {
  View,
  Platform,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackActions, useNavigation} from '@react-navigation/native';

import {Button, MyTextInput} from '../../components';
import {colors, sizes} from '../../support/constants';
import {Container, Header, Text, Title} from '../../support/styledComponents';
import {LOGINSCREEN, StackNavigationProp} from '../../navigators/config';
import {EnumRegister, Register} from '../../models';
import _ from 'lodash';
import {valNoEmpty, valPassword, valUsername} from './variable';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../redux/slices/accountsSlice';

interface Props {
  toLogin: () => void;
  submit?: (data: Register) => void;
}

const widthBtn = sizes.wScreen - 30;

const signUpDefault: Register = {
  UserName: '',
  PassWord: '',
  FirstName: '',
  LastName: '',
  Gender: 0,
};

const RegisterPage: FC<Props> = ({toLogin, submit}) => {
  const refTxtUsername = useRef<MyTextInput>(null);
  const refTxtPassword = useRef<MyTextInput>(null);
  const refTxtFirstName = useRef<MyTextInput>(null);
  const refTxtLastName = useRef<MyTextInput>(null);
  const [register, setRegister] = useState(signUpDefault);
  const refBtn = useRef<Button>(null);

  const _onChangeText = (name: EnumRegister) => (text: string) => {
    setRegister({...register, [name]: text});
  };

  const _submit = () => {
    const isErrTxtUsername = refTxtUsername.current?.validation();
    const isErrPassword = refTxtPassword.current?.validation();
    const isErrFirstName = refTxtFirstName.current?.validation();
    const isErrLastName = refTxtLastName.current?.validation();
    if (!isErrTxtUsername && !isErrPassword && !isErrFirstName && !isErrLastName) {
      submit && submit(register);
    } else {
      setTimeout(() => {
        refBtn.current?.done();
      }, 1000);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Title>Create account to continue</Title>
      </View>
      <View style={styles.main}>
        <MyTextInput
          label="Username"
          style={styles.input}
          validation={valUsername}
          ref={refTxtUsername}
          value={register.UserName}
          onChangeText={_onChangeText('UserName')}
        />
        <MyTextInput
          label="Password"
          secureTextEntry={true}
          style={styles.input}
          validation={valPassword}
          ref={refTxtPassword}
          value={register.PassWord}
          onChangeText={_onChangeText('PassWord')}
        />
        <MyTextInput
          label="First name"
          style={styles.input}
          validation={valNoEmpty}
          ref={refTxtFirstName}
          value={register.FirstName}
          onChangeText={_onChangeText('FirstName')}
        />
        <MyTextInput
          label="Last name"
          style={styles.input}
          validation={valNoEmpty}
          ref={refTxtLastName}
          value={register.LastName}
          onChangeText={_onChangeText('LastName')}
        />
        <TextInput />
        <View style={styles.input}>
          <Button width={widthBtn} mod="black" onPress={_submit}>
            Create Account
          </Button>
          <View style={[styles.registerBox, styles.input]}>
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
  input: {},
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
