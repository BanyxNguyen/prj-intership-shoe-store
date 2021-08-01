import {NavigationContainerRef} from '@react-navigation/native';
import _ from 'lodash';
import React, {createRef, useRef} from 'react';

export const navigationRef: React.RefObject<NavigationContainerRef> =
  useRef(null);

// export const navigate = (name, params) => {
//   const current: any = _.get(navigationRef, 'current', null);
//   current?.navigate(name, params);
// };
