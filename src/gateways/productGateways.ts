import {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Product} from '../models';
import {SlowFetch} from '../utilities';

export class ProductGateway {
  private localStorageConnector: typeof AsyncStorage;
  private restConnector: AxiosInstance;

  constructor(restConnector: AxiosInstance) {
    this.restConnector = restConnector;
    this.localStorageConnector = AsyncStorage;
  }

  async gets(filter: any = {}): Promise<Product[]> {
    try {
      const {data}: any = await SlowFetch(
        this.restConnector.get('/Products/GetProducts', filter),
      );
      return data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return [];
      }
      throw error;
    }
  }
}
