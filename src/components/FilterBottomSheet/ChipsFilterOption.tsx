import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {OptionMenu, OptionItemMenuType} from '../../models';
import {colors, fonts, sizes} from '../../support/constants';
import Icons from '../Icons';

export interface IOptionType extends OptionItemMenuType {
  keyFather: string;
}

interface Props {
  onChangeItem?: (item: IOptionType) => void;
  filterOptions: OptionMenu;
}

interface State {
  optionTypes: IOptionType[];
}

class ChipsFilterOption extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {optionTypes: this._convertToArr(props.filterOptions)};
  }

  private _convertToArr = (filterOptions: OptionMenu) => {
    if (_.isEmpty(filterOptions)) return [];

    let arr: IOptionType[] = [];

    for (const key in filterOptions) {
      const arrTemp = _.get(filterOptions, key, []).map((item: OptionItemMenuType) => {
        const temp: IOptionType = {keyFather: key, ...item};
        return temp;
      });
      arr = _.concat(arr, arrTemp);
    }
    return arr;
  };

  private _onPressDeleteItem = (item: IOptionType) => () => {
    const {onChangeItem} = this.props;
    onChangeItem && onChangeItem(item);
  };

  private _renderChips = () => {
    return this.state.optionTypes.map((item, index) => {
      return (
        <View style={styles.chip} key={index.toString()}>
          <Text style={styles.chipTxt}>{item.value}</Text>
          <TouchableOpacity activeOpacity={0.85} onPress={this._onPressDeleteItem(item)}>
            <Icons size={26} color={colors.black_75} name="close-outline" lib="Ionicons" />
          </TouchableOpacity>
        </View>
      );
    });
  };

  ReRenderChips = () => {
    const {filterOptions} = this.props;
    this.setState({optionTypes: this._convertToArr(filterOptions)});
  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderChips()}
      </View>
    );
  }
}

export default ChipsFilterOption;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    marginBottom: 10,
    flexDirection: 'row',
  },
  chip: {
    marginLeft: 2,
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 2,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.black_50,
  },
  chipTxt: {
    marginLeft: 3,
    fontSize: sizes.h7,
    fontFamily: fonts.montserrat.light,
  },
});
