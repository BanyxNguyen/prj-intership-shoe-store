import React, {Component} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import _ from 'lodash';
import {TextInput as Input} from 'react-native-paper';

import {ValidationInput} from '../models';
import {checkValidation} from '../utilities';
import {Text} from '../support/styledComponents';
import {fonts, sizes} from '../support/constants';

interface Props {
  label?: string;
  value?: string;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  validation?: ValidationInput[];
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
}

interface State {
  isError: boolean;
  txtError: string;
  secure: boolean;
}

class MyTextInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isError: false,
      txtError: '',
      secure: _.get(props, 'secureTextEntry', false),
    };
  }

  clear = () => {
    const {onChangeText} = this.props;
    onChangeText && onChangeText('');
    this.setState({
      ...this.state,
      isError: false,
      txtError: '',
    });
  };

  validation = () => {
    const {validation, value} = this.props;
    const temp = {isError: false, txtError: ''};
    const result = checkValidation(value || '', validation);
    if (!_.isEmpty(result)) {
      temp.isError = true;
      temp.txtError = result;
    }
    this.setState({...this.state, ...temp});
    return temp.isError;
  };

  private _onChangeText = (text: string) => {
    const {validation, onChangeText} = this.props;
    let temp: any = {};
    onChangeText && onChangeText(text);
    const result = checkValidation(text, validation);
    if (_.isEmpty(result)) {
      temp = {isError: false, txtError: '', ...temp};
    }
    this.setState({...this.state, ...temp});
  };

  private _onBlur = () => {
    const {onBlur} = this.props;
    onBlur && onBlur();
    this.validation();
  };

  private _onFocus = () => {
    if (_.isEmpty(this.props.value)) this.clear();
  };

  private _onPressTriggerShowValue = () => {
    const {secure} = this.state;
    this.setState({...this.state, secure: !secure});
  };

  private _getIconPassword = () => {
    const {secureTextEntry, value} = this.props;
    if (!secureTextEntry || !value) return undefined;
    let right = this.state.secure ? 'eye-off' : 'eye';
    return (
      <Input.Icon
        forceTextInputFocus={false}
        onPress={this._onPressTriggerShowValue}
        name={right}
      />
    );
  };

  // componentDidMount() {
  //   this.setState({
  //     ...this.state,
  //     secure: _.get(this.props, 'secureTextEntry', false),
  //   });
  // }

  render() {
    const {txtError, isError, secure} = this.state;
    const {label, value, style} = this.props;
    let right = this._getIconPassword();

    return (
      <View style={[styles.container, style]}>
        <View style={styles.labelBox}>
          <Text style={styles.label}>{txtError}</Text>
        </View>
        <Input
          error={isError}
          mode="outlined"
          value={value}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onChangeText={this._onChangeText}
          autoCapitalize={'none'}
          right={right}
          theme={{
            colors: {
              primary: '#202020',
              error: '#c62828',
            },
          }}
          {...{label, value, secureTextEntry: secure}}
        />
      </View>
    );
  }
}

export default MyTextInput;

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
