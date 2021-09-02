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
import {useDispatch, useSelector} from 'react-redux';
import Icons from '../components/Icons';
import {Account, EnumAccount, Register} from '../models';
import {StackNavigationProp} from '../navigators/config';
import {selectors} from '../redux/slices';
import {colors, constants, driveLink, fonts, shadows, sizes} from '../support/constants';
import {Container, Text} from '../support/styledComponents';
import moment from 'moment';
import {Button, MyTextInput} from '../components';
import {valNoEmpty} from '../utilities/variable';
import {globalStyles} from '../support/globalStyles';
import {ScrollView, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {editProfile, logout} from '../redux/slices/accountsSlice';

const ProfileScreen: FC = () => {
  const stackNav = useNavigation<StackNavigationProp>();
  const [profile, setProfile] = useState<Account | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const {profile: account} = useSelector(selectors.account.select);
  const dispatch = useDispatch();

  const _goBack = () => {
    stackNav.goBack();
  };

  const _getBirthday = () => {
    if (profile?.Birthday) {
      return moment(profile?.Birthday).subtract(10, 'days').calendar();
    }
    return '';
  };

  const _triggerEdit = (status: boolean) => () => {
    setIsEdit(status);
  };

  const _logout = () => {
    dispatch(logout(_goBack));
  };

  const _onSubmitProfile = (data: Account) => {
    console.log(data);
    dispatch(
      editProfile(data, status => {
        if (status) _triggerEdit(true);
      }),
    );
  };

  useEffect(() => {
    setProfile(account);
  }, [account]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={50}>
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
              onPress={_triggerEdit(true)}>
              <Icons size={26} color={colors.black} name="edit" lib="AntDesign" />
            </TouchableOpacity>
          ) : (
            <View style={styles.btn} />
          )}
        </View>
        <ScrollView>
          <Container style={globalStyles.gsFullScreen}>
            <View style={styles.content}>
              {/* <View style={styles.avtBox}>
                <FastImage
                  style={[styles.avt]}
                  source={{
                    uri: driveLink + '1_zA_ExZD3FR0Z7cvPOLwIiICPn2F3-TP',
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View> */}
              {!isEdit ? (
                <View style={styles.info}>
                  <Text style={[styles.txt, styles.name]}>
                    Full name: {profile?.FirstName} {profile?.LastName}
                  </Text>
                  <Text style={[styles.txt, styles.birthday]}>Birthday: {_getBirthday()}</Text>
                  <Text style={[styles.txt, styles.birthday]}>Address: {profile?.Address}</Text>
                  <Button
                    mod="black"
                    width={sizes.wScreen - 30}
                    onPress={_logout}
                    styles={{marginTop: 20}}>
                    LOGOUT
                  </Button>
                </View>
              ) : (
                <EditProfile onCancel={_triggerEdit(false)} onSubmit={_onSubmitProfile} />
              )}
            </View>
          </Container>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  const [date, setDate] = useState(new Date());
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const {profile: account} = useSelector(selectors.account.select);

  const _onChangeText = (key: EnumAccount) => (text: string) => {
    const temp: Account = {...profile, [key]: text};
    setProfile(temp);
  };

  const _onChangeDatePicker = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setIsShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setProfile({...profile, Birthday: new Date(currentDate)});
  };

  const _onCancel = () => {
    const {onCancel} = props;
    onCancel && onCancel();
  };

  const _onSubmit = () => {
    const {onSubmit} = props;
    onSubmit && onSubmit(profile);
  };

  const _triggerDatePicker = (status: boolean) => () => {
    setIsShowDatePicker(status);
  };

  const _parseDate = (date: Date | string) => {
    return moment(date).format('MM-DD-YYYY');
  };

  useEffect(() => {
    setProfile(account);
  }, [account]);

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
        <MyTextInput
          label="Address"
          style={styles.input}
          validation={valNoEmpty}
          ref={refTxtLastName}
          value={profile?.Address}
          onChangeText={_onChangeText('Address')}
        />
        {profile && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.btnBirthday}
            onPress={_triggerDatePicker(true)}>
            <View style={styles.txtBtnBirthdayBox}>
              <Text style={styles.txtBtnBirthday}>Birthday</Text>
            </View>
            <Text>{_parseDate(profile.Birthday)}</Text>
            <Icons size={30} color={colors.black} name="edit" lib="AntDesign" />
          </TouchableOpacity>
        )}
        {isShowDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={_onChangeDatePicker}
          />
        )}
      </View>
      <View style={styles.groupBtn}>
        <Button styles={styles.btn} width={btnWith} onPress={_onCancel}>
          Cancel
        </Button>
        <Button styles={styles.btn} mod="black" width={btnWith} onPress={_onSubmit}>
          Save
        </Button>
      </View>
    </View>
  );
};

const sizeImg = 200;
const btnWith = (sizes.wScreen - 40) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {},
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
    flex: 1,
    padding: 15,
  },
  avtBox: {
    alignItems: 'center',
  },
  avt: {
    width: sizeImg,
    height: sizeImg,
    borderRadius: sizeImg / 2,
  },
  info: {
    flex: 1,
    marginTop: 10,
  },
  editBox: {
    flex: 1,
  },
  txt: {
    // textAlign: 'center',
    marginBottom: 10,
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
    justifyContent: 'center',
    marginTop: 25,
  },
  btn: {
    marginHorizontal: 5,
  },
  input: {},
  btnBirthday: {
    height: 55,
    marginTop: 18,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 13,
    borderColor: colors.black,
    justifyContent: 'space-between',
  },
  txtBtnBirthdayBox: {
    left: 8,
    top: -10,
    position: 'absolute',
    paddingHorizontal: 3,
    backgroundColor: colors.bgScreen,
  },
  txtBtnBirthday: {
    fontSize: 12,
    fontFamily: 'unset',
    color: colors.blueyGrey,
  },
});
