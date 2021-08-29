import React, {Component, FC, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle, TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {colors, fonts} from '../support/constants';
import {Text} from '../support/styledComponents';

interface Props {
  styles?: StyleProp<ViewStyle>;
  mod?: 'black';
  width?: number;
  onPress?: () => void;
}
interface State {
  isLoading: boolean;
}

class Button extends Component<Props, State> {
  isClear: any;
  isPress: boolean = true;

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  done() {
    clearTimeout(this.isClear);
    this.setState({isLoading: false});
    this.isPress = true;
  }

  private _onPress = () => {
    const {onPress} = this.props;
    if (!this.state.isLoading) this.setState({isLoading: true});
    if (this.isPress) {
      onPress && onPress();
      this.isPress = false;
    }
    clearTimeout(this.isClear);
    this.isClear = setTimeout(() => {
      this.done()
    }, 1000);
  };

  render() {
    const {isLoading} = this.state;
    const {children, styles: style, mod, width} = this.props;
    const btn = mod == 'black' ? styles.btnBgBlack : styles.btnOutlineBlack;
    const txt = mod == 'black' ? styles.txtWhite : styles.txtBlack;
    const _width = width ? width : 160;
    return (
      <TouchableOpacity
        onPress={this._onPress}
        activeOpacity={0.8}
        style={[style, styles.btn, btn, {width: _width}]}>
        <Text style={[styles.txt, txt]}>{children}</Text>
        {isLoading && <ActivityIndicator size="small" color={colors.white} />}
      </TouchableOpacity>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1.5,
    borderRadius: 5,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    marginRight: 10,
  },
  txtBlack: {},
  txtWhite: {
    color: colors.white,
  },
});
