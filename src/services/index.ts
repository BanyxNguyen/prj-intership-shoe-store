import axios from 'axios';
// import Config from 'react-native-config';
import {Config} from '../../appConfig';

import {AccountService} from './accountService';
import {ProductService} from './productService';

import {AccountGateway} from './gateways/accountGateways';
import {ProductGateway} from './gateways/productGateways';

// console.log('API_URL', Config.API_URL);

const restConnector = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

const accountGateway = new AccountGateway(restConnector);
const productGateway = new ProductGateway(restConnector);

export const accountService = new AccountService(accountGateway);
export const productService = new ProductService(productGateway);
