import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts} from '../support/constants';
import {Text} from '../support/styledComponents';

interface Props {
  styles?: StyleProp<ViewStyle>;
  mod?: 'black';
  width?: number;
  onPress?: () => void;
}

const Button: FC<Props> = props => {
  const {children, styles: style, mod, width, onPress} = props;
  const btn = mod == 'black' ? styles.btnBgBlack : styles.btnOutlineBlack;
  const txt = mod == 'black' ? styles.txtWhite : styles.txtBlack;
  const _width = width ? width : 160;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[style, styles.btn, btn, {width: _width}]}>
      <Text style={[styles.txt, txt]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1.5,
    borderRadius: 10,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOutlineBlack: {
    borderColor: colors.black,
  },
  btnBgBlack: {
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
  txt: {
    textTransform: 'uppercase',
    fontFamily: fonts.roboto.bold,
    fontSize: 18,
  },
  txtBlack: {},
  txtWhite: {
    color: colors.white,
  },
});
