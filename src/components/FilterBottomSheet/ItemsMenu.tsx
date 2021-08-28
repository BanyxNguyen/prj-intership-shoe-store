import _, {concat} from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FilterOptions, FilterOptionsKey, OptionType} from '../../models';
import {colors, fonts, sizes} from '../../support/constants';
import {Container, Text} from '../../support/styledComponents';
import {triggerArray} from '../../utilities';
import Icons from '../Icons';

interface Props {
  onBack?: () => void;
  filterOptions: FilterOptions;
}

interface State {
  father: OptionType;
  items: OptionType[];
  itemsActive: OptionType[];
}

interface ParamRenderFunc {
  father: OptionType;
  items: OptionType[];
}

export class ItemsMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      father: {key: '', value: ''},
      items: [],
      itemsActive: [],
    };
  }

  public RenderItemsMenu = (data: ParamRenderFunc) => {
    const {items, father} = data;
    const {filterOptions} = this.props;
    const itemsActive = _.get(filterOptions, father.key, []);
    this.setState({items, itemsActive, father});
  };

  private _onPress = (item: OptionType) => () => {
    const {itemsActive} = this.state;
    const key = this.state.father.key as FilterOptionsKey;
    const temp = triggerArray(itemsActive, item);
    this.props.filterOptions[key] = temp;
    this.setState({itemsActive: temp});
  };

  render() {
    const {items, itemsActive, father} = this.state;
    const {onBack} = this.props;
    return (
      <Container style={styles.container}>
        <View style={styles.topBox}>
          <TouchableOpacity activeOpacity={0.85} style={styles.btnClose} onPress={onBack}>
            <Icons size={26} color={colors.black} name="arrow-left" lib="Feather" />
          </TouchableOpacity>
          <Text style={styles.title}>{father.value}</Text>
        </View>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{paddingTop: 15, paddingBottom: 95}}>
            {items.map((item, index) => {
              let st = {};
              const isActive = _.findIndex(itemsActive, item) > -1;
              if (isActive) st = styles.active;
              return (
                <TouchableOpacity
                  activeOpacity={0.85}
                  key={index.toString()}
                  onPress={this._onPress(item)}
                  style={[styles.menuItem, st]}>
                  <Text style={styles.txtItem}>{item.value}</Text>
                  {isActive && (
                    <Icons
                      size={26}
                      color={colors.black}
                      name="ios-checkmark-sharp"
                      lib="Ionicons"
                    />
                  )}
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
    textTransform: 'uppercase',
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderColor: colors.black_10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtItem: {
    paddingVertical: 10,
  },
  active: {
    // backgroundColor: 'red',
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
