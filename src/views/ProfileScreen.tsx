import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import Icons from '../components/Icons';
import {Account} from '../models';
import {StackNavigationProp} from '../navigators/config';
import {selectors} from '../redux/slices';
import {colors, constants, driveLink, fonts, shadows, sizes} from '../support/constants';
import {Container, Text} from '../support/styledComponents';
import moment from 'moment';
import {Button} from '../components';

const ProfileScreen: FC = () => {
  const stackNav = useNavigation<StackNavigationProp>();
  const [profile, setProfile] = useState<Account | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const account = useSelector(selectors.account.select);

  const _goBack = () => {
    stackNav.goBack();
  };

  const _getBirthday = () => {
    if (profile?.Birthday) {
      return moment(profile?.Birthday).subtract(10, 'days').calendar();
    }
    return '';
  };

  const _triggerEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    setProfile(account);
  }, [profile]);

  return (
    <Container style={styles.container}>
      <View style={[styles.header, shadows.s2]}>
        <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={_goBack}>
          <Icons size={26} color={colors.black} name="arrow-left" lib="Feather" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        {!isEdit ? (
          <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={_triggerEdit}>
            <Icons size={26} color={colors.black} name="edit" lib="AntDesign" />
          </TouchableOpacity>
        ) : (
          <View style={styles.btn} />
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.avtBox}>
          <FastImage
            style={[styles.avt]}
            source={{
              uri: driveLink + '1_zA_ExZD3FR0Z7cvPOLwIiICPn2F3-TP',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        {!isEdit ? (
          <View style={styles.info}>
            <Text style={styles.name}>
              {profile?.FirstName} {profile?.LastName}
            </Text>
            <Text style={styles.birthday}>{_getBirthday()}</Text>
            <Text style={styles.birthday}>{profile?.Address}</Text>
          </View>
        ) : (
          <View style={styles.info}>
            <Text style={styles.birthday}>Edit Profile</Text>
            <Button mod="black" onPress={_triggerEdit}>Save</Button>
          </View>
        )}
      </View>
    </Container>
  );
};

export default ProfileScreen;

const sizeImg = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: constants.hHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.bgScreen,
  },
  title: {
    fontFamily: fonts.otomanopeeOneRegular,
    fontSize: sizes.h4,
    textTransform: 'uppercase',
  },
  btn: {
    height: constants.hHeader,
    width: constants.hHeader,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 15,
    flex: 1,
    alignItems: 'center',
  },
  avtBox: {
    width: sizeImg,
    height: sizeImg,
    borderRadius: sizeImg / 2,
    overflow: 'hidden',
  },
  avt: {
    width: sizeImg,
    height: sizeImg,
  },
  info: {
    marginTop: 15,
    alignItems: 'center',
  },
  name: {
    fontSize: sizes.h5,
    fontFamily: fonts.montserrat.semiBold,
  },
  birthday: {
    marginTop: 10,
  },
});
