import axios from 'axios';
import Config from 'react-native-config';

import {AccountService} from './accountService';

import {AccountGateway} from '../gateways/accountGateways';
import {ProductGateway} from '../gateways/productGateways';
import {ProductService} from './productService';

const restConnector = axios.create({baseURL: Config.API_URL});

const accountGateway = new AccountGateway(restConnector);
const productGateway = new ProductGateway(restConnector);

export const accountService = new AccountService(accountGateway);
export const productService = new ProductService(productGateway);
