import React, {useState} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

import {Snackbar} from 'react-native-paper';

export interface SnackbarConfig {
  action?: {
    label: string;
    onPress: () => void;
  };
  duration?: number;
  style?: StyleProp<ViewStyle>;
  text: string;
}

type NotifySnackbarFunc = (config: SnackbarConfig) => void;

export let NotifySnackbar: NotifySnackbarFunc = () => {};

const MyNotify = () => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<SnackbarConfig>();

  // const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  NotifySnackbar = (config: SnackbarConfig) => {
    setVisible(false);
    setConfig(config);
    setVisible(true);
  };

  return (
    <>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        {...{action: config?.action, duration: config?.duration || 700, style: config?.style}}>
        {config?.text}
      </Snackbar>
    </>
  );
};

export default MyNotify;

const styles = StyleSheet.create({});
