import React, {FC} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colors, fonts, sizes} from '../support/constants';
import {Container} from '../support/styledComponents';

const DetailScreen: FC = () => {
  return (
    <Container>
      <View>
        <Image
          style={{width: sizes.wScreen, height: sizes.hScreen * 0.52}}
          source={{uri: 'asset:/images/shoes-3.png'}}
        />
        <View style={[StyleSheet.absoluteFill, styles.boxTitle]}>
          <Text style={styles.bigTitle}>Nike One 2020</Text>
          <Text style={styles.smallTitle}>Running shoe store</Text>
        </View>
      </View>
      
    </Container>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  boxTitle: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 5,
    marginBottom: -15
  },
  bigTitle: {
    fontSize: sizes.h2,
    fontFamily: fonts.roboto.bold,
  },
  smallTitle: {
    fontSize: sizes.h5,
    color: colors.blueyGrey,
  },
});
