import {StyleSheet} from 'react-native';
import {colors, fonts, sizes} from './constants';
export const globalStyles = StyleSheet.create({
  gsContainer: {},
  gsFlex: {
    flex: 1,
  },
  gsFullScreen: {
    width: sizes.wScreen,
    height: sizes.hScreen,
  },
  gsFlexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // text
  gsClBlack: {
    color: colors.black,
  },
  gsClWhite: {
    color: colors.white,
  },
  gsTextBold: {
    fontFamily: fonts.roboto.bold,
  },
  // bg
  gsBgWhite: {
    backgroundColor: colors.whiteGray,
  },
});
