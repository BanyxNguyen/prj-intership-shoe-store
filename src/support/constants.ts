import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const sizes = {
  wScreen: width,
  hScreen: height,
  //
  bigHeader: 50,
  //
  h0: 38,
  h1: 34,
  h2: 28,
  h3: 24,
  h4: 22,
  h5: 18,
  h6: 14,
  h7: 12,
  h8: 10,
  h9: 8,
  // size common
  s0: 0,
  s1: 5,
  s2: 10,
  s3: 15,
  s4: 20,
  s5: 25,
};

export const colors = {
  bgScreen: '#fafafa',
  transparent: 'transparent',
  // white
  white: '#ffffff',
  white25: 'rgba(255, 255, 255, 0.25)',
  white50: 'rgba(255, 255, 255, 0.5)',
  white75: 'rgba(255, 255, 255, 0.75)',
  whiteSmoke: '#f5f5f5',
  whiteGray: '#f9f9f9',
  // black
  black: '#202020',
  shark: '#262628',
  paleGrey: '#f0f0f6',
  grayLight: '#fafafa',
  cloudyBlue: '#b9b9c8',
  blueyGrey: '#9696aa',
  black_75: 'rgba(0, 0, 0, 0.75)',
  black_50: 'rgba(0, 0, 0, 0.5)',
  black_25: 'rgba(0, 0, 0, 0.25)',
  //violet
  violet: '#973aa4',
  // orange
  orange: '#ff952e',
  // red
  red: '#f42b2b',
  // green
  green: '#68cf00',
  darkLimeGreen25: 'rgba(104, 207, 0, 0.25)',
  darkLimeGreen50: 'rgba(104, 207, 0, 0.5)',
  darkLimeGreen75: 'rgba(104, 207, 0, 0.75)',
};

export const fonts = {
  roboto: {
    bold: 'Roboto-Bold',
    regular: 'Roboto-Regular',
  },
  otomanopeeOneRegular: 'OtomanopeeOne-Regular',
};

export const shadows = {
  s24: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
};
