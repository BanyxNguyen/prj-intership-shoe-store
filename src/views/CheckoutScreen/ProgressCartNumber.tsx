import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, constants, fonts} from '../../support/constants';
import {Text} from '../../support/styledComponents';

export type PageIndexType = 0 | 1 | 2;
interface PCProps {}
interface PCState {
  indexProgress: PageIndexType;
}

class ProgressCartNumber extends Component<PCProps, PCState> {
  private arrRender = [1, 2, 3];
  constructor(props: PCProps) {
    super(props);
    this.state = {
      indexProgress: 0,
    };
  }

  SetProgress = (indexProgress: PageIndexType) => {
    this.setState({indexProgress});
  };

  render() {
    return (
      <View style={styles.progressBox}>
        <View style={styles.line} />
        <View style={[styles.progressContent, StyleSheet.absoluteFill]}>
          {this.arrRender.map((item, index) => {
            let st = {box: {}, txt: {}};
            if (index <= this.state.indexProgress)
              st = {box: styles.cirActive, txt: styles.txtActive};
            return (
              <View style={styles.cir} key={index.toString()}>
                <View style={[styles.contentCir, st.box]}>
                  <Text style={[styles.txtCir, st.txt]}>{item}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default ProgressCartNumber;

const widthCirBox = constants.hHeader * 2;
const sizeCir = constants.hHeader - 20;

const styles = StyleSheet.create({
  progressBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: constants.hHeader,
    marginBottom: 10,
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  line: {
    position: 'absolute',
    width: widthCirBox * 2,
    borderColor: colors.black_75,
    borderBottomWidth: 1.5,
    zIndex: -1,
  },
  cir: {
    width: widthCirBox,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCir: {
    height: sizeCir,
    width: sizeCir,
    borderRadius: sizeCir / 2,
    borderWidth: 1.5,
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgScreen,
  },
  cirActive: {
    backgroundColor: colors.black,
  },
  txtCir: {
    fontFamily: fonts.montserrat.semiBold,
  },
  txtActive: {
    color: colors.white,
  },
});
