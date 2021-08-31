import _ from 'lodash';
import {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ModelFilterProduct,
  ExternalProduct,
  Product,
  ExternalProductCart,
  OrderProduct,
} from '../../models';
import {SlowFetch} from '../../utilities';

const PRODUCT_WISHLISH = 'product_wishlist';

export class ProductGateway {
  private localStorageConnector: typeof AsyncStorage;
  private restConnector: AxiosInstance;

  constructor(restConnector: AxiosInstance) {
    this.restConnector = restConnector;
    this.localStorageConnector = AsyncStorage;
  }

  async getProducts(filter: ModelFilterProduct): Promise<Product[]> {
    try {
      const {data: products}: any = await this.restConnector.post(
        '/api/SanPham/GetSanPhams',
        filter,
      );
      const temps: ExternalProduct[] = products.map((item: any) => ({
        Id: item.Id,
        Size: item.KichThuocs[0],
      }));
      const {data: resultExternal} = await this.restConnector.post(
        '/api/Order/GetOrderProduct',
        temps,
      );

      const data: Product[] = products.map((item: Product) => {
        const index = _.findIndex(resultExternal, (i: any) => i.Id == item.Id);
        return {
          ...item,
          Gia: _.get(resultExternal, `[${index}].Price`, null),
        };
      });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getExternalProductInfo(params: ExternalProduct[]): Promise<ExternalProductCart[]> {
    try {
      const {data}: any = await this.restConnector.post('/api/Order/GetOrderProduct', params);
      return data;
    } catch (error) {
      console.log('getExternalProductInfo :', error);
      throw error;
    }
  }
  //cart
  async createOrderProduct(params: OrderProduct): Promise<any> {
    try {
      const {data}: any = await SlowFetch(
        this.restConnector.post('/api/Order/CreateOrder', params),
      );
      return data;
    } catch (error) {
      console.log('getExternalProductInfo :', error);
      throw error;
    }
  }

  // wishlish
  async loadWishlist(): Promise<Product[]> {
    const result = await this.localStorageConnector.getItem(PRODUCT_WISHLISH);
    if (!result || result === '') return [];
    const wishlist = JSON.parse(result);
    return wishlist;

    // await this.localStorageConnector.removeItem(PRODUCT_WISHLISH);
    // return [];
  }

  async saveWishlist(products: Product[]): Promise<void> {
    let str = JSON.stringify(products);
    await this.localStorageConnector.setItem(PRODUCT_WISHLISH, str);
  }
}
