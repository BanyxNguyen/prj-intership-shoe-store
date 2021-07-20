import {StyleSheet} from 'react-native';
import {colors, sizes} from './constants';
export const globalStyles = StyleSheet.create({
  gsContainer:{
    
  },
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
  // bg
  gsBgWhite: {
    backgroundColor: colors.white,
  },
});
