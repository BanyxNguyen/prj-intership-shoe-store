import React, {Component, createRef} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Chip} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors, constants, fonts, sizes} from '../support/constants';
import {Container} from '../support/styledComponents';
import Icons from './Icons';

const TEMP = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Props {}

class FilterBottomSheet extends Component<Props> {
  refRBSheet;
  constructor(props: Props) {
    super(props);
    this.refRBSheet = createRef<RBSheet>();
    this.state = {
      heightSheet: 100,
    };
  }

  _open = () => {
    if (this.refRBSheet && this.refRBSheet.current) {
      this.refRBSheet.current.open();
    }
  };

  _close = () => {
    if (this.refRBSheet && this.refRBSheet.current) {
      this.refRBSheet.current.close();
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.85} onPress={this._open}>
          {this.props.children}
        </TouchableOpacity>
        <RBSheet
          ref={this.refRBSheet}
          height={hBottomSheet}
          closeOnDragDown={false}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: colors.black_25,
            },
            draggableIcon: {
              flex: 1,
              backgroundColor: colors.black,
            },
          }}>
          <Container style={styles.container}>
            <View style={styles.topBox}>
              <View style={{flex: 1}}>
                <Text style={styles.title}>REFINE RESULTS</Text>
                <Text style={styles.amountResult}>520 products</Text>
              </View>
              <TouchableOpacity activeOpacity={0.85} style={styles.btnClose} onPress={this._close}>
                <Icons size={36} color={colors.black} name="close-outline" lib="Ionicons" />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <ScrollView>
                <View>
                  <View>
                    <Chip icon="information" onPress={() => console.log('Pressed')}>
                      Example Chip
                    </Chip>
                  </View>
                  <TouchableOpacity>
                    <Text>CLEAR ALL</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {TEMP.map((item, index) => {
                    return (
                      <View
                        key={index.toString()}
                        style={{height: 60, borderColor: colors.blueyGrey, borderBottomWidth: 1.5}}>
                        <Text>{item}</Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </Container>
        </RBSheet>
      </View>
    );
  }
}

export default FilterBottomSheet;

const hBottomSheet = sizes.hScreen - constants.statusBar - constants.hHeader * 1.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 15,
  },
  topBox: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: sizes.h5,
    fontFamily: fonts.montserrat.semiBold,
  },
  amountResult: {
    color: colors.blueyGrey,
  },
  btnClose: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    marginRight: -5,
  },
});
