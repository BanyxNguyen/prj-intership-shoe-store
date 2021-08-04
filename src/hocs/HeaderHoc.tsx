import React, {ComponentType, FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icons from '../components/Icons';
import {InitTabBarNavigation} from '../navigators';
import {TABDROPS} from '../navigators/config';
import {colors, fonts, shadows, sizes} from '../support/constants';
import {Container, Text} from '../support/styledComponents';

export let ChangeTitleHeader: (name: string) => () => void;

interface WithProps {}

const HeaderHoc = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const hocComponent: FC<P & WithProps> = _props => {
    const {...props} = _props;
    const [title, setTitle] = useState(InitTabBarNavigation);
    const [isSearchIcon, setIsSearchIcon] = useState(false);

    const _changeTitle = (name: string) => {
      setTitle(name);
    };

    ChangeTitleHeader = (name: string) => () => {
      _changeTitle(name);
    };

    return (
      <Container style={{flex: 1}}>
        <View style={[styles.header, shadows.s1]}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.groupIcon}>
            <View style={styles.icon}>
              {isSearchIcon && (
                <Icons
                  size={30}
                  color={colors.black}
                  name="search"
                  lib="EvilIcons"
                />
              )}
            </View>
            <View style={styles.icon}>
              <Icons size={34} color={colors.black} name="user" lib="Feather" />
            </View>
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
    height: 50,
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
