import _ from 'lodash';
import React, {FC, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Product} from '../models';
import {colors, shadows, sizes} from '../support/constants';

export let ShowModalFilter: (products: Product[]) => void = () => {};

const ShowAndFilterModal: FC = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProduct] = useState<Product[]>([]);
  const {children} = props;

  const _toggleModal = (check: boolean) => () => {
    setModalVisible(check);
  };

  const _showModalForFilter = (products: Product[]) => {
    setProduct(products);
    setModalVisible(true);
  };

  ShowModalFilter = _showModalForFilter;

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
        {/* Content modal */}
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.shadow}
            onPress={_toggleModal(false)}
          />
          <View style={[styles.content, shadows.s24]}>
            {!_.isEmpty(products) ? (
              products.map((item, index) => {
                return (
                  <TouchableOpacity key={index.toString()}>
                    <Text>
                      {item.name} - {item.price}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View>
                <Text>fuck</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
      <TouchableOpacity activeOpacity={0.9} onPress={_toggleModal(true)}>
        {children}
      </TouchableOpacity>
    </>
  );
};

export default ShowAndFilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  shadow: {
    flex: 1,
    backgroundColor: colors.black_10,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: sizes.hScreen * 0.85,
    width: sizes.wScreen,
    backgroundColor: colors.bgScreen,
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
