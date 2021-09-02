export const patchPostMessageFunction = (urlBase, OrderId, token) => {
  paypal
    .Buttons({
      createOrder: function () {
        window.ReactNativeWebView.postMessage('create');

        return fetch(`${urlBase}/api/Payment/CreateOrderPayPal?OrderId=${OrderId}`, {
          headers: {Authorization: token},
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            return data.id;
          })
          .catch(err => {});
      },
      onApprove: function (data) {
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      },
    })
    .render('body');
};
