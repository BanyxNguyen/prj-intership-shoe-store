import React, {useState} from 'react';
import {
  View,
  Alert,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {colors, shadows, sizes} from '../../support/constants';

const TextInputControl = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const _toggleModal = (status: boolean) => () => {
    setModalVisible(status);
  };

  return (
    <>
      <Modal
        presentationStyle="overFullScreen"
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.content}>
          <View style={[styles.modalView, shadows.s5]}>
            <TouchableOpacity
              style={styles.btnClose}
              onPress={_toggleModal(!modalVisible)}>
              <Icon name="arrow-back" size={34} color="#202020" />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Search Shoes"
              placeholderTextColor="#494949"
            />
            <TouchableOpacity
              style={styles.btnClose}
              onPress={_toggleModal(!modalVisible)}>
              <Icon name="check" size={34} color="#202020" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.shadow}
            onPress={_toggleModal(false)}
          />
        </View>
      </Modal>
      <TouchableOpacity style={styles.btnSearch} onPress={_toggleModal(true)}>
        <Icon name="search" size={38} color="#202020" />
      </TouchableOpacity>
    </>
  );
};

export default TextInputControl;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  modalView: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: sizes.h5,
    color: colors.black,
    paddingHorizontal: 10,
  },
  btnSearch: {
    marginLeft: 5,
  },
  btnClose: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    flex: 1,
    backgroundColor: colors.black_25,
  },
});
