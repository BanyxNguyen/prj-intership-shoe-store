import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {OptionType} from '../../models';
import {colors, fonts, sizes} from '../../support/constants';
import {Container, Text} from '../../support/styledComponents';
import Icons from '../Icons';

interface Props {
  onBack?: () => void;
}
interface State {
  title: string;
  items: OptionType[];
}

export class ItemsMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      title: '',
      items: [],
    };
  }

  public RenderItemsMenu = (items: OptionType[]) => {
    this.setState({items});
  };

  render() {
    const {items} = this.state;
    const {onBack} = this.props;
    return (
      <Container style={styles.container}>
        <View style={styles.topBox}>
          <TouchableOpacity activeOpacity={0.85} style={styles.btnClose} onPress={onBack}>
            <Icons size={26} color={colors.black} name="arrow-left" lib="Feather" />
          </TouchableOpacity>
          <Text style={styles.title}>REFINE RESULTS</Text>
        </View>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{paddingTop: 15, paddingBottom: 95}}>
            {items.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.85}
                  key={index.toString()}
                  style={styles.menuItem}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Container>
    );
  }
}

export default ItemsMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 10,
  },
  topBox: {
    height: 40,
    marginBottom: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: sizes.h5,
    textAlign: 'center',
    fontFamily: fonts.montserrat.semiBold,
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderColor: colors.black_10,
  },
  btnClose: {
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
});
