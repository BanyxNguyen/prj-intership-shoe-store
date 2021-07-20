import React, {FC} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Button, TextInput} from '../../components';
import {colors, sizes} from '../../support/constants';
import {Text, Title} from '../../support/styledComponents';

interface Props {
  toRegister: () => void;
}

const widthBtn = sizes.wScreen - 30;

const LoginPage: FC<Props> = ({toRegister}) => {
  return (
    <>
      <View style={styles.header}>
        <Title>Login to continue</Title>
      </View>
      <View style={styles.main}>
        <TextInput label="Email/Username" style={styles.pv1} />
        <TextInput label="Password" secureTextEntry={true} style={styles.pv1} />
        <View style={styles.pv1}>
          <Button width={widthBtn} mod="black">
            LOG IN
          </Button>
          <View style={[styles.registerBox, styles.pv1]}>
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
