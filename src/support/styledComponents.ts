import {FunctionComponent} from 'react';
import {TextProps, TextStyle, ViewProps, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {colors, fonts, sizes} from './constants';

type IText = FunctionComponent<TextProps>;
type IView = FunctionComponent<ViewProps>;

export const Header: IText = styled.Text`
  font-family: ${(p: TextStyle) => p.fontFamily || fonts.otomanopeeOneRegular};
  font-size: ${(p: TextStyle) => p.fontSize || `${sizes.h1 + 5}px`};
  text-align: ${(p: TextStyle) => p.textAlign || 'left'};
  color: ${(p: TextStyle) => (p.color ? p.color.toString() : colors.shark)};
  font-weight: ${(p: TextStyle) => p.fontWeight || '500'};
  text-transform: ${(p: TextStyle) => p.textTransform || 'none'};
  padding: ${(p: TextStyle) => p.padding || `${sizes.s3}px 1px`};
`;

export const Container: IView = styled.View`
  flex: ${(p: ViewStyle) => p.flex || 1};
  background-color: ${(p: TextStyle) =>
    p.backgroundColor ? p.backgroundColor.toString() : colors.bgScreen};
`;

export const Text: IText = styled.Text`
  font-family: ${(p: TextStyle) => p.fontFamily || fonts.roboto.regular};
  font-size: ${(p: TextStyle) => p.fontSize || `${sizes.h5}px`};
  text-align: ${(p: TextStyle) => p.textAlign || 'left'};
  color: ${(p: TextStyle) => (p.color ? p.color.toString() : colors.shark)};
  font-weight: ${(p: TextStyle) => p.fontWeight || '300'};
  text-transform: ${(p: TextStyle) => p.textTransform || 'none'};
`;

export const Title: IText = styled.Text`
  font-family: ${(p: TextStyle) => p.fontFamily || fonts.roboto.bold};
  font-size: ${(p: TextStyle) => p.fontSize || `${sizes.h5}px`};
  text-align: ${(p: TextStyle) => p.textAlign || 'left'};
  color: ${(p: TextStyle) => (p.color ? p.color.toString() : colors.shark)};
  font-weight: ${(p: TextStyle) => p.fontWeight || 'normal'};
  text-transform: ${(p: TextStyle) => p.textTransform || 'none'};
`;
