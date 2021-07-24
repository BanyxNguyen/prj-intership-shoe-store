import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Button} from '../components';
import {StackNavigationProp} from '../navigators/config';
import {Container, Text} from '../support/styledComponents';
import {colors, fonts, shadows, sizes} from '../support/constants';

const DetailScreen: FC = () => {
  const stackNav = useNavigation<StackNavigationProp>();

  const _goBack = () => {
    stackNav.goBack();
  };

  return (
    <Container>
      <TouchableOpacity
        style={styles.angleLeft}
        activeOpacity={0.3}
        onPress={_goBack}>
        <Icon name="angle-left" size={40} color="#fff" />
      </TouchableOpacity>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Image
          style={{width: sizes.wScreen, height: sizes.hScreen * 0.6}}
          source={{uri: 'asset:/images/shoe-test-1.jpg'}}
        />
        <View style={styles.content}>
          <View style={styles.boxTitle}>
            <Text style={styles.bigTitle}>Nike One 2020</Text>
            <Text style={styles.smallTitle}>Running shoe store</Text>
          </View>
          <View style={styles.circles}>
            <View style={[styles.circle, {backgroundColor: 'blueviolet'}]} />
            <View style={[styles.circle, {backgroundColor: '#005a9a'}]} />
            <View style={[styles.circle, {backgroundColor: 'black'}]} />
          </View>
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum id,
            voluptates excepturi, quisquam aut modi ex cum nesciunt eos officia
            doloremque, repellat quasi fuga iusto quis saepe illum autem culpa.
            {'\n'}Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Rerum id, voluptates excepturi, quisquam aut modi ex cum nesciunt
            eos officia doloremque, repellat quasi fuga iusto quis saepe illum
            autem culpa.
            {'\n'}Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Rerum id, voluptates excepturi, quisquam aut modi ex cum nesciunt
            eos officia doloremque, repellat quasi fuga iusto quis saepe illum
            autem culpa.
          </Text>
        </View>
      </ScrollView>
      <View style={[styles.cartControl, shadows.s24]}>
        <Text style={styles.price}>$120</Text>
        <Button>Add to cart</Button>
      </View>
    </Container>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  boxTitle: {
    paddingVertical: 5,
  },
  bigTitle: {
    fontSize: sizes.h2,
    fontFamily: fonts.roboto.bold,
  },
  smallTitle: {
    fontSize: sizes.h5,
    color: colors.blueyGrey,
  },
  content: {
    marginTop: -25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.bgScreen,
  },
  circles: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginHorizontal: 2.5,
  },
  cartControl: {
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    width: sizes.wScreen,
    paddingHorizontal: 45,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'space-between',
    backgroundColor: colors.whiteGray,
  },
  price: {
    flex: 1,
    fontSize: sizes.h3,
    textAlign: 'center',
    fontFamily: fonts.roboto.bold,
  },
  angleLeft: {
    top: 0,
    left: 0,
    zIndex: 5,
    marginTop: 18,
    position: 'absolute',
    paddingHorizontal: 10,
  },
});
