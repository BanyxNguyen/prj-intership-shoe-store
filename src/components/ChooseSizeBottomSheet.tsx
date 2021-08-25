import React, {Component, createRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors, fonts, sizes} from '../support/constants';

interface Props {}

class ChooseSizeBottomSheet extends Component<Props> {
  refRBSheet;
  refScrollView;

  constructor(props: Props) {
    super(props);
    this.refRBSheet = createRef<RBSheet>();
    this.refScrollView = createRef<ScrollView>();
  }

  render() {
    return (
      <>
        <TouchableOpacity onPress={() => this.refRBSheet?.current?.open()}>
          <Text>OPEN BOTTOM SHEET</Text>
        </TouchableOpacity>
        <RBSheet
          ref={this.refRBSheet}
          height={hSheet}
          openDuration={250}
          customStyles={{
            wrapper: {
              backgroundColor: colors.black_50,
            },
          }}>
          <View style={styles.container}>
            <ScrollView horizontal ref={this.refScrollView}>
              <View style={styles.itemBox}>
                <TouchableOpacity>
                  <Text>123</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemBox}>
                <View style={styles.headerBox}>
                  <TouchableOpacity activeOpacity={0.85} style={styles.btn}>
                    <Text style={[styles.txt, styles.txtCancel]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.85} style={styles.btn}>
                    <Text style={[styles.txt, styles.txtDone]}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </RBSheet>
      </>
    );
  }
}

export default ChooseSizeBottomSheet;

const hSheet = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemBox: {
    height: hSheet,
    width: sizes.wScreen,
    padding: 5,
  },
  headerBox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    borderBottomColor: colors.blueyGrey,
  },
  btn: {
    paddingVertical: 10,
  },
  txt: {
    fontFamily: fonts.montserrat.semiBold,
  },
  txtCancel: {
    color: colors.red,
  },
  txtDone: {
    color: colors.blue,
  },
});
