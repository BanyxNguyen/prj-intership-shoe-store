import _ from 'lodash';
import React, {Component, FC, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import {ValidationInput} from '../models';
import {colors, fonts, sizes} from '../support/constants';
import {Text} from '../support/styledComponents';
import {checkValidation} from '../utilities';

interface Props {
  label?: string;
  value?: string;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  validation?: ValidationInput[];
  onChangeText?: (text: string) => void;
}

interface State {
  isError: boolean;
  txtError: string;
  text: string;
}

const defaultInput = {
  isError: false,
  txtError: '',
  text: '',
};

class TextInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = defaultInput;
  }

  clear = () => {
    this.setState(defaultInput);
  };

  validation = () => {
    const {text} = this.state;
    const {validation} = this.props;
    const temp = {isError: false, txtError: ''};
    const result = checkValidation(text, validation);
    if (!_.isEmpty(result)) {
      temp.isError = true;
      temp.txtError = result;
    }
    this.setState(temp);
    return temp.isError;
  };

  private _onChangeText = (text: string) => {
    const {validation, onChangeText} = this.props;
    let temp: any = {text};
    onChangeText && onChangeText(text);
    const result = checkValidation(text, validation);
    if (_.isEmpty(result)) {
      temp = {isError: false, txtError: '', ...temp};
    }
    this.setState(temp);
  };

  private _onBlur = () => {
    this.validation();
  };

  private _onFocus = () => {
    if (_.isEmpty(this.state.text)) this.clear();
  };

  render() {
    const {text, txtError, isError} = this.state;
    const {label, value, secureTextEntry, style, validation, onChangeText} = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.labelBox}>
          <Text style={styles.label}>{txtError}</Text>
        </View>
        <Input
          error={isError}
          mode="outlined"
          value={text}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onChangeText={this._onChangeText}
          autoCapitalize={'none'}
          theme={{
            colors: {
              primary: '#202020',
              error: '#c62828',
            },
          }}
          {...{label, value, secureTextEntry}}
        />
      </View>
    );
  }
}

export default TextInput;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 5,
  },
  labelBox: {
    position: 'absolute',
    right: 5,
    top: 0,
  },
  label: {
    fontSize: sizes.h7,
    color: '#c62828',
    fontFamily: fonts.montserrat.semiBold,
  },
});
