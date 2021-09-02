import {StyleSheet} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import {InfoOrder} from '../../models';
import {selectors} from '../../redux/slices';
import {MyTextInput} from '../../components';
import {valNoEmpty, valPhoneNumber} from '../../utilities/variable';
import {checkAndGetInfoOrder, saveInfoOrder} from '../../redux/slices/accountsSlice';

export interface OnChangeOtherParams {
  key: keyof InfoOrder;
  value: string;
}

interface Props {}

const infoOrderDefault: InfoOrder = {
  TenNguoiNhan: '',
  DiaChiNguoiNhan: '',
  SoDienThoai: '',
};

const CustomerInfoCart: FC<Props> = props => {
  const refTxtName = useRef<MyTextInput>(null);
  const refTxtPhone = useRef<MyTextInput>(null);
  const refTxtAddress = useRef<MyTextInput>(null);
  const {infoOrderHistory} = useSelector(selectors.account.select);
  const [infoOrder, setInfoOrder] = useState(infoOrderDefault);
  const dispatch = useDispatch();

  const _onChangeText = (key: keyof InfoOrder) => (value: string) => {
    setInfoOrder({...infoOrder, [key]: value});
  };

  const _save = () => {
    dispatch(saveInfoOrder(infoOrder));
  };

  useEffect(() => {
    setInfoOrder(infoOrderHistory);
  }, [infoOrderHistory]);

  useEffect(() => {
    dispatch(checkAndGetInfoOrder());
  }, []);

  return (
    <>
      <MyTextInput
        label="Name"
        style={styles.input}
        validation={valNoEmpty}
        value={infoOrder.TenNguoiNhan}
        onBlur={_save}
        onChangeText={_onChangeText('TenNguoiNhan')}
        ref={refTxtName}
      />
      <MyTextInput
        label="Phone number"
        style={styles.input}
        validation={valPhoneNumber}
        value={infoOrder.SoDienThoai}
        onBlur={_save}
        onChangeText={_onChangeText('SoDienThoai')}
        ref={refTxtPhone}
      />
      <MyTextInput
        label="Address"
        style={styles.input}
        validation={valNoEmpty}
        value={infoOrder.DiaChiNguoiNhan}
        onBlur={_save}
        onChangeText={_onChangeText('DiaChiNguoiNhan')}
        ref={refTxtAddress}
      />
    </>
  );
};

export default CustomerInfoCart;

const styles = StyleSheet.create({
  input: {},
});
