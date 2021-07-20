import React, {FC} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import {colors, fonts} from '../support/constants';

interface Props {
  label?: string;
  value?: string;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
}

const TextInput: FC<Props> = props => {
  const {label, value, secureTextEntry, style} = props;
  return (
    <View style={style}>
      <Input
        theme={{
          colors: {
            primary: '#202020',
          },
        }}
        mode="outlined"
        {...{label, value, secureTextEntry}}
      />
    </View>
  );
};

export default TextInput;

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1.5,
//     borderColor: colors.black,
//   },
// });
