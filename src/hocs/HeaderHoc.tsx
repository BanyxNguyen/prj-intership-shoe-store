import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import React, {ComponentType, FC, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icons from '../components/Icons';
import {InitTabBarNavigation} from '../navigators';
import {
  LOGINLOGOUTSCREEN,
  PROFILESCREEN,
  StackNavigationProp,
  TABDROPS,
} from '../navigators/config';
import {accountService} from '../services';
import {colors, constants, fonts, shadows, sizes} from '../support/constants';
import {Container, Text} from '../support/styledComponents';

export let ChangeTitleHeader: (name: string) => () => void;

interface WithProps {}

const HeaderHoc = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const hocComponent: FC<P & WithProps> = _props => {
    const stackNav = useNavigation<StackNavigationProp>();
    const {...props} = _props;
    const [title, setTitle] = useState(InitTabBarNavigation);
    const [isSearchIcon, setIsSearchIcon] = useState(false);

    const _changeTitle = (name: string) => {
      setTitle(name);
    };

    ChangeTitleHeader = (name: string) => () => {
      _changeTitle(name);
    };

    const _toProfile = async () => {
      const user = await accountService.getLoginUser();
      if (!_.isEmpty(user)) {
        stackNav.navigate(LOGINLOGOUTSCREEN, {page: 0});
      } else {
        stackNav.navigate(PROFILESCREEN, {});
      }
    };

    return (
      <Container style={{flex: 1}}>
        <View style={[styles.header, shadows.s1]}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.groupIcon}>
            <View style={styles.icon}>
              {isSearchIcon && (
                <Icons size={30} color={colors.black} name="search" lib="EvilIcons" />
              )}
            </View>
            <TouchableOpacity style={styles.icon} activeOpacity={0.85} onPress={_toProfile}>
              <Icons size={34} color={colors.black} name="user" lib="Feather" />
            </TouchableOpacity>
          </View>
        </View>
        <WrappedComponent {...(props as P)} />
      </Container>
    );
  };
  return hocComponent;
};

export default HeaderHoc;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.bgScreen,
    height: constants.hHeader,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 5,
  },
  title: {
    fontFamily: fonts.otomanopeeOneRegular,
    fontSize: sizes.h4,
    textTransform: 'uppercase',
  },
  groupIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 50,
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
