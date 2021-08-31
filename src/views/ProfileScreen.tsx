import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import Icons from '../components/Icons';
import {Account, EnumAccount} from '../models';
import {StackNavigationProp} from '../navigators/config';
import {selectors} from '../redux/slices';
import {colors, constants, driveLink, fonts, shadows, sizes} from '../support/constants';
import {Container, Text} from '../support/styledComponents';
import moment from 'moment';
import {Button, MyTextInput} from '../components';
import {valNoEmpty} from '../utilities/variable';
import {globalStyles} from '../support/globalStyles';
import {ScrollView, TouchableWithoutFeedback} from 'react-native-gesture-handler';

const ProfileScreen: FC = () => {
  const stackNav = useNavigation<StackNavigationProp>();
  const [profile, setProfile] = useState<Account | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const {profile: account} = useSelector(selectors.account.select);

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={globalStyles.gsFullScreen}
        keyboardVerticalOffset={50}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.header, shadows.s2]}>
              <TouchableOpacity activeOpacity={0.8} style={styles.btnHeader} onPress={_goBack}>
                <Icons size={26} color={colors.black} name="arrow-left" lib="Feather" />
              </TouchableOpacity>
              <Text style={styles.title}>Profile</Text>
              {!isEdit ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnHeader}
                  onPress={_triggerEdit}>
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
                <EditProfile />
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ProfileScreen;

interface Props {
  onSubmit?: (data: Account) => void;
  onCancel?: () => void;
}

const EditProfile: FC<Props> = props => {
  const refTxtFirstName = useRef<MyTextInput>(null);
  const refTxtLastName = useRef<MyTextInput>(null);
  const [profile, setProfile] = useState<Account>({} as Account);

  const _onChangeText = (key: EnumAccount) => (text: string) => {
    const temp: Account = {...profile, [key]: text};
    setProfile(temp);
  };

  const _onCancel = () => {
    const {onCancel} = props;
    onCancel && onCancel();
  };

  const _onSubmit = () => {
    const {onSubmit} = props;
    onSubmit && onSubmit(profile);
  };

  return (
    <View style={[styles.info, styles.editBox]}>
      <Text style={styles.birthday}>Edit Profile</Text>
      <View>
        <MyTextInput
          label="First name"
          style={styles.input}
          validation={valNoEmpty}
          ref={refTxtFirstName}
          value={profile?.FirstName}
          onChangeText={_onChangeText('FirstName')}
        />
        <MyTextInput
          label="Last name"
          style={styles.input}
          validation={valNoEmpty}
          ref={refTxtLastName}
          value={profile?.LastName}
          onChangeText={_onChangeText('LastName')}
        />
      </View>
      <View style={styles.groupBtn}>
        <MyTextInput label="L" />
        <Button styles={styles.btn} onPress={_onCancel}>
          Cancel
        </Button>
        <Button styles={styles.btn} mod="black" onPress={_onSubmit}>
          Save
        </Button>
      </View>
    </View>
  );
};

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
  btnHeader: {
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
  editBox: {
    flex: 1,
  },
  name: {
    fontSize: sizes.h5,
    fontFamily: fonts.montserrat.semiBold,
  },
  birthday: {
    marginTop: 10,
  },
  groupBtn: {
    flexDirection: 'row',
  },
  btn: {
    marginHorizontal: 5,
  },
  input: {},
});
