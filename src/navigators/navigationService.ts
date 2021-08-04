import {NavigationContainerRef} from '@react-navigation/native';
import _ from 'lodash';
import React, {createRef, useRef} from 'react';
import {ScreenName} from './config';

export const navigationRef: React.RefObject<NavigationContainerRef> =
  useRef(null);

export const navigate = (name: ScreenName, params?: object) => {
  const current: any = _.get(navigationRef, 'current', null);
  current?.navigate(name, params);
};

export const goBack = () => {
  const current: any = _.get(navigationRef, 'current', null);
  current?.goBack();
};
