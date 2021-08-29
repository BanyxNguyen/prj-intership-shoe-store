import {AxiosInstance} from 'axios';
import {AsyncStorageStatic} from 'react-native';
import {Account, Login, Register} from '../../models';
import {SlowFetch} from '../../utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

const accessTokenSaveName = 'authentication_accessToken';

export class AccountGateway {
  private localStorageConnector: typeof AsyncStorage;
  private restConnector: AxiosInstance;

  constructor(restConnector: AxiosInstance) {
    this.restConnector = restConnector;
    this.localStorageConnector = AsyncStorage;
  }

  async login(loginForm: Login): Promise<string> {
    try {
      return SlowFetch(this.restConnector.post('/Token/Login', loginForm));
    } catch (error) {
      console.log('login error', error);
      throw error;
    }
  }

  async register(registerForm: Register): Promise<string> {
    try {
      return SlowFetch(this.restConnector.post('/Token/Register', registerForm));
    } catch (error) {
      console.log('register error', error);
      throw error;
    }
  }

  async logout() {
    // TODO-IMPORTANT: Remove hard code and use rest connector to connect to back-end API
  }

  async getProfile(): Promise<Account | null> {
    try {
      const token: string = await this._loadAccessToken();
      if (_.isEmpty(token)) return null;

      this.useAccessToken(token);
      return this.restConnector.get('/Token/GetProfile');
    } catch (error) {
      console.log('getProfile error', error);
      throw error;
    }
  }

  useAccessToken(token: string = '') {
    this.restConnector.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  async useAndSaveAccessToken(token: string = ''): Promise<void> {
    this.useAccessToken(token);
    await this.localStorageConnector.setItem(accessTokenSaveName, token);
  }

  async _loadAccessToken() {
    const accessToken = await this.localStorageConnector.getItem(accessTokenSaveName);
    return accessToken || '';
  }
}
