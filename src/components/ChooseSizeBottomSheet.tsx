import React, {Component, createRef, RefObject} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors} from '../support/constants';
import {Container} from '../support/styledComponents';

interface Props {}

class ChooseSizeBottomSheet extends Component<Props> {
  refRBSheet;

  constructor(props: Props) {
    super(props);
    this.refRBSheet = createRef<RBSheet>();
  }
  render() {
    return (
      <>
        <TouchableOpacity onPress={() => this.refRBSheet?.current?.open()}>
          <Text>OPEN BOTTOM SHEET</Text>
        </TouchableOpacity>
        <RBSheet
          ref={this.refRBSheet}
          height={300}
          openDuration={250}
          customStyles={{
            wrapper: {
              backgroundColor: colors.black_50,
            },
          }}>
          <View>
            <View>
              <TouchableOpacity activeOpacity={0.85}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85}>
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
            <Text>123</Text>
          </View>
        </RBSheet>
      </>
    );
  }
}

export default ChooseSizeBottomSheet;

const styles = StyleSheet.create({});
