import {AxiosInstance} from 'axios';
import {AsyncStorageStatic} from 'react-native';
import {LoginCredentials, ResultAccount} from '../../models';
import {SlowFetch} from '../../utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AccountGateway {
  private localStorageConnector: typeof AsyncStorage;
  private restConnector: AxiosInstance;

  constructor(restConnector: AxiosInstance) {
    this.restConnector = restConnector;
    this.localStorageConnector = AsyncStorage;
  }

  async login(loginForm: LoginCredentials): Promise<{token: string}> {
    try {
      const {data}: any = await SlowFetch(this.restConnector.post('/accounts/login', loginForm));
      return data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return {token: ''};
      }
      throw error;
    }
  }

  async logout() {
    // TODO-IMPORTANT: Remove hard code and use rest connector to connect to back-end API
  }

  async getLoginUser(): Promise<ResultAccount | null> {
    try {
      const accessToken: string | null = await this._loadAccessToken();
      if (!accessToken || accessToken === '') {
        return null;
      }
      this.restConnector.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const {data} = await this.restConnector.get('/accounts/me');
      return data;
    } catch (e) {
      // if (e.response && e.response.status === 401) {
      //   return null;
      // }
      // throw e;
      return null;
    }
  }

  async useAndSaveAccessToken(token: string | null): Promise<void> {
    this.restConnector.defaults.headers.common.Authorization = `Bearer ${token}`;
    await this.localStorageConnector.setItem('authentication.accessToken', token || '');
  }

  async _loadAccessToken() {
    const accessToken = await this.localStorageConnector.getItem('authentication.accessToken');
    return accessToken;
  }
}
