import _ from 'lodash';
import {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SlowFetch} from '../../utilities';
import {Account, InfoOrder, Login, Register} from '../../models';
import {TokenAccessory} from '../TokenAccessory';

const accessTokenSaveName = 'authentication_accessToken';
const infoOrderSaveName = 'history_info_order';

export class AccountGateway {
  private localStorageConnector: typeof AsyncStorage;
  private restConnector: AxiosInstance;

  constructor(restConnector: AxiosInstance) {
    this.restConnector = restConnector;
    this.localStorageConnector = AsyncStorage;
  }

  async login(loginForm: Login): Promise<string> {
    try {
      const {data}: any = await SlowFetch(this.restConnector.post('/api/Token/Login', loginForm));
      return data;
    } catch (error) {
      console.log('login error', error);
      throw error;
    }
  }

  async register(registerForm: Register): Promise<string> {
    try {
      const {data}: any = await SlowFetch(
        this.restConnector.post('/api/Token/Register', registerForm),
      );
      return data;
    } catch (error) {
      console.log('register error', error);
      throw error;
    }
  }

  async update(newProfileForm: Account): Promise<string> {
    try {
      const {data}: any = await SlowFetch(
        this.restConnector.post('/api/Token/UpdateProfile', newProfileForm),
      );
      return data;
    } catch (error) {
      console.log('register error', error);
      throw error;
    }
  }

  async logout() {
    await this.localStorageConnector.removeItem(accessTokenSaveName);
  }

  async getProfile(): Promise<Account | null> {
    try {
      const token: string = await this._loadAccessToken();
      if (_.isEmpty(token)) return null;
      this.useAccessToken(token);
      const {data}: any = await this.restConnector.get('/api/Token/GetProfile');
      delete data.PassWord;
      return data;
    } catch (error) {
      console.log('getProfile error', error);
      throw error;
    }
  }

  useAccessToken(token: string = '') {
    console.log('token: ', token);
    this.restConnector.defaults.headers.common.Authorization = `Bearer ${token}`;
    TokenAccessory.bearerToken = `Bearer ${token}`;
  }

  async useAndSaveAccessToken(token: string = ''): Promise<void> {
    this.useAccessToken(token);
    await this.localStorageConnector.setItem(accessTokenSaveName, token);
  }

  async _loadAccessToken() {
    const accessToken = await this.localStorageConnector.getItem(accessTokenSaveName);
    return accessToken || '';
  }

  // info order

  async getInfoOrder(): Promise<InfoOrder | null> {
    const infoOrder: string = await this._loadInfoOrder();
    if (_.isEmpty(infoOrder)) return null;
    return JSON.parse(infoOrder);
  }

  async saveInfoOrder(infoOrder = '') {
    await this.localStorageConnector.setItem(infoOrderSaveName, infoOrder);
  }

  async _loadInfoOrder() {
    const infoOrder = await this.localStorageConnector.getItem(infoOrderSaveName);
    return infoOrder || '';
  }
}
