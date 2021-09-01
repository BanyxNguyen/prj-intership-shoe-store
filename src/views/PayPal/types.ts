import {ComponentType} from 'react';

export interface OrderApproved {
  orderID: string;
  payerID: string;
  paymentID: any;
  billingToken: any;
  facilitatorAccessToken: string;
}
export interface PayPalButtonProps {
  onApproved: (data: OrderApproved) => Promise<void>;
  urlBase: string;
  ButtonType: ComponentType<any>;
  token: string;
}
