import React, {Component} from 'react';
import {StyleSheet, Modal, TouchableOpacity, Text} from 'react-native';
import WebView, {WebViewMessageEvent, WebViewNavigation} from 'react-native-webview';
import {patchPostMessageFunction} from './html/ScriptWebview';
import {OrderApproved, PayPalButtonProps} from './types';
interface PayPalButtonState {
  isShow: boolean;
  OrderId: string;
}
export default class PayPalButton extends Component<PayPalButtonProps, PayPalButtonState> {
  refWebview = React.createRef<WebView>();
  constructor(props: PayPalButtonProps) {
    super(props);
    this.state = {
      isShow: false,
      OrderId: '',
    };
  }
  async handleMessage(event: WebViewMessageEvent) {
    const message = event.nativeEvent.data;
    if (message == 'create') {
    } else {
      let data = JSON.parse(message) as OrderApproved;
      await this.props.onApproved(data);
      this.Close();
    }
  }
  Close = () => {
    this.setState({isShow: false});
  };
  Show = (OrderId: string) => {
    this.setState({isShow: true, OrderId});
  };

  renderWebView = () => {
    const patchPostMessageJsCode =
      '(' +
      String(patchPostMessageFunction) +
      ')' +
      `('${this.props.urlBase}','${this.state.OrderId}','${this.props.token}')`;


      console.log(patchPostMessageJsCode);
      
    return (
      <WebView
        style={styles.WebView}
        source={{uri: `${this.props.urlBase}/HtmlPage`}}
        onError={() => {}}
        ref={this.refWebview}
        thirdPartyCookiesEnabled={true}
        injectedJavaScript={patchPostMessageJsCode}
        onMessage={this.handleMessage.bind(this)}
        javaScriptEnabled={true}
      />
    );
  };

  render() {
    const {ButtonType} = this.props;
    return (
      <>
        <ButtonType onPress={this.Show} />
        <Modal animationType={'fade'} visible={this.state.isShow}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderWidth: 1,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              margin: 2,
            }}
            onPress={this.Close}>
            <Text>X</Text>
          </TouchableOpacity>
          {this.state.isShow && this.renderWebView()}
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  WebView: {
    flex: 1,
  },
});
