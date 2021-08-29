import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import Icons, {TypeLibraryIcons} from '../components/Icons';
import {RootState} from '../redux/slices';
import {colors, fonts} from '../support/constants';
import {Text} from '../support/styledComponents';

export interface TabIconParams {
  name: string;
  lib: TypeLibraryIcons;
  size: number;
}

export interface IconCartProps extends TabIconParams {
  color: string;
}

export const IconCart: FC<{data: IconCartProps}> = props => {
  const {cart} = useSelector((state: RootState) => state.product);
  const [amountCart, setAmountCart] = useState(0);

  useEffect(() => {
    setAmountCart(cart.length);
  }, [cart]);

  return (
    <View style={styles.container}>
      <View>
        {amountCart > 0 && (
          <View style={styles.badgeBox}>
            <Text style={styles.txtBadge}>{amountCart}</Text>
          </View>
        )}
        <Icons {...props.data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeBox: {
    position: 'absolute',
    top: -2,
    right: -5,
    zIndex: 3,
    minWidth: 16,
    backgroundColor: colors.red,
    borderRadius: 5,
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
  txtBadge: {
    fontSize: 9,
    color: colors.white,
    fontFamily: fonts.roboto.bold,
    textAlign: 'center',
  },
});
