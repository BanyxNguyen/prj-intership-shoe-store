import React, {FC, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MyTextInput} from '../../components';
import {ValidationInput} from '../../models';

const valName: ValidationInput[] = [
  {
    name: 'noEmpty',
  },
];

const valPhone: ValidationInput[] = [
  {
    name: 'noEmpty',
  },
  {
    name: 'regex',
    value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
    notify: 'Value is not phone number',
  },
];

const valAddress: ValidationInput[] = [
  {
    name: 'noEmpty',
  },
];

const CustomerInfoCart: FC = () => {
  const refTxtName = useRef<MyTextInput>(null);
  const refTxtPhone = useRef<MyTextInput>(null);
  const refTxtAddress = useRef<MyTextInput>(null);

  const _onChangeText = (name: 'name' | 'phone' | 'address') => (text: string) => {};

  return (
    <>
      <MyTextInput
        label="Name"
        style={styles.input}
        validation={valName}
        onChangeText={_onChangeText('name')}
        ref={refTxtName}
      />
      <MyTextInput
        label="Phone number"
        style={styles.input}
        validation={valPhone}
        onChangeText={_onChangeText('phone')}
        ref={refTxtPhone}
      />
      <MyTextInput
        label="Address"
        style={styles.input}
        validation={valAddress}
        onChangeText={_onChangeText('address')}
        ref={refTxtAddress}
      />
    </>
  );
};

export default CustomerInfoCart;

const styles = StyleSheet.create({
  input: {},
});
