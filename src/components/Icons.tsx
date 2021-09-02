import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type TypeLibraryIcons =
  | 'Feather'
  | 'Octicons'
  | 'Fontisto'
  | 'Ionicons'
  | 'AntDesign'
  | 'EvilIcons'
  | 'Foundation'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons';

interface Props {
  name: string;
  size: number;
  lib: TypeLibraryIcons;
  color: string;
}

const IconLib = {
  Feather,
  Octicons,
  Fontisto,
  Ionicons,
  AntDesign,
  EvilIcons,
  Foundation,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
};

const Icons: FC<Props> = props => {
  const {lib, name, size, color} = props;
  const TrueIcon = IconLib[lib];
  return <TrueIcon {...{name, size, color}} />;
};

export default Icons;
