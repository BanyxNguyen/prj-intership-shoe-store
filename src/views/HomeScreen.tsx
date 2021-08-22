import axios from 'axios';
import React, {FC, PureComponent, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ListRenderItem,
  FlatList,
  NativeSyntheticEvent,
  Animated,
  NativeScrollEvent,
  StatusBar,
  NativeModules,
} from 'react-native';

import {productService} from '../services';
import {globalStyles} from '../support/globalStyles';
import {StackNavigationProp} from '../navigators/config';
import {colors, constants, fonts, shadows, sizes} from '../support/constants';
import {Container, Text, Title} from '../support/styledComponents';
import Icons from '../components/Icons';
import FastImage from 'react-native-fast-image';
import {ProductTrend} from '../models';
import {TempData} from '../utilities/data';

const {hHeader, hFooter, statusBar} = constants;

const hItem = sizes.hScreen - hHeader - hFooter - statusBar;
// console.log(sizes.hScreen, hItem);

const HomeScreen: FC = () => {
  const stackNav = useNavigation<StackNavigationProp>();

  const _data = TempData.trends;

  const _renderItem = (item: ProductTrend, index: any) => {
    const test = ['red', 'blue', 'violet'];
    return (
      <View style={[styles.itemDrop]} key={index.toString()}>
        <FastImage
          style={{height: hItem, width: sizes.wScreen}}
          source={{
            uri: item.image,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={[StyleSheet.absoluteFill, styles.itemContent]}>
          <View style={styles.label}>
            <Text style={[styles.labelTxtType, styles.labelTxt]}>{item.type}</Text>
          </View>
          <View style={styles.bottomBox}>
            <View style={styles.label}>
              <Text style={[styles.labelTxtName, styles.labelTxt, shadows.s1]}>{item.name}</Text>
            </View>
            <View style={styles.label}>
              <Text style={[styles.labelTxtNew, styles.labelTxt, shadows.s1]}>JUST DROPPED</Text>
            </View>
            <View>
              <View style={styles.btnBoxLine}>
                <View style={styles.btnDetailLine} />
              </View>
              <View style={[styles.btnBox, StyleSheet.absoluteFill]}>
                <View style={styles.btnDetailContent}>
                  <Text style={styles.btnDetailText}>SEE MORE</Text>
                  <View style={[globalStyles.gsFlexCenter]}>
                    <Icons size={24} color={colors.black} name="arrow-right-l" lib="Fontisto" />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        // console.log('fuck 1');
        // // let res = await productService.gets();
        // var ins1 = axios.create({
        //   baseURL: 'http://192.168.1.80',
        //   headers: {},
        // });
        // let res = await ins1
        //   .get('/api/Product/GetProducts')
        //   // .catch(x => console.log(x.response));
        // console.log('fuck 2');
        // console.log('data: ', res.data);
        // TODO add real api
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  return (
    <Container style={styles.container}>
      <CustomScrollView HeightItem={hItem}>{_data.map(_renderItem)}</CustomScrollView>
    </Container>
  );
};

interface CustomScrollViewProps {
  HeightItem: number;
}

class CustomScrollView extends PureComponent<CustomScrollViewProps> {
  refScrollView = React.createRef<ScrollView>();
  ScrollValue: Animated.ValueXY;
  constructor(props: CustomScrollViewProps) {
    super(props);
    this.ScrollValue = new Animated.ValueXY();
  }
  onScrollEvent = ({
    nativeEvent: {
      contentOffset: {y: CurrentY},
      velocity,
    },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    let index = Math.floor(CurrentY / this.props.HeightItem);
    const offset = CurrentY % this.props.HeightItem;

    if ((velocity?.y ?? 0) < 0) {
      index = offset > 100 ? index + 1 : index;
    } else {
      index = this.props.HeightItem - offset > 100 ? index : index + 1;
    }

    this.refScrollView?.current?.scrollTo({
      y: index * this.props.HeightItem,
      animated: true,
    });
  };
  render() {
    return (
      <ScrollView
        ref={this.refScrollView}
        showsVerticalScrollIndicator={false}
        decelerationRate={0}
        overScrollMode="always"
        onScrollEndDrag={this.onScrollEvent}>
        {this.props.children}
      </ScrollView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: hItem,
    width: sizes.wScreen,
  },
  itemDrop: {
    height: hItem,
    width: sizes.wScreen,
  },
  itemContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  labelTxt: {
    padding: 5,
    textTransform: 'uppercase',
  },
  labelTxtType: {
    color: colors.whiteGray,
    backgroundColor: colors.black,
    fontFamily: fonts.montserrat.bold,
  },
  labelTxtName: {
    color: colors.txtBlack,
    backgroundColor: colors.whiteGray,
    fontFamily: fonts.montserrat.semiBoldItalic,
    fontSize: sizes.h5,
    marginBottom: 3,
  },
  labelTxtNew: {
    color: colors.txtBlack,
    backgroundColor: colors.whiteGray,
    fontFamily: fonts.montserrat.mediumItalic,
    fontSize: sizes.h8,
    marginBottom: 20,
  },
  bottomBox: {
    marginBottom: 15,
    paddingHorizontal: 45,
  },
  btnBox: {
    height: 50,
    paddingRight: 5,
    paddingBottom: 5,
  },
  btnDetailContent: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.whiteGray,
  },
  btnDetailText: {
    fontSize: sizes.h6,
    textTransform: 'uppercase',
    fontFamily: fonts.montserrat.medium,
  },
  btnBoxLine: {
    height: 50,
    paddingTop: 5,
    paddingLeft: 5,
  },
  btnDetailLine: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.whiteGray,
  },
});
