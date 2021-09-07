import _ from 'lodash';

import {
  ExternalProduct,
  ModelFilterProduct,
  OrderProduct,
  Product,
  ProductCartCheckout,
} from '../models';
import {ProductGateway} from './gateways/productGateways';

export class ProductService {
  private productGateway: ProductGateway;

  constructor(productGateway: ProductGateway) {
    this.productGateway = productGateway;
  }

  getProducts(filter: ModelFilterProduct) {
    return this.productGateway.getProducts(filter);
  }

  async getExternalProductInfo(product: Product[]) {
    const params: ExternalProduct[] = product
      .map(i => ({
        Id: i.Id,
        Size: i.SelectedSize || 0,
      }))
      .filter(i => i.Size != 0);
    const externalResult = await this.productGateway.getExternalProductInfo(params);
    const temp: any = product
      .map(i => {
        const index = _.findIndex(externalResult, j => j.Id == i.Id);
        if (index > -1) {
          return {
            ...i,
            RealPrice: externalResult[index].Price,
            StockAmount: externalResult[index].Amount,
          };
        }
      })
      .filter(i => !_.isEmpty(i));
    return temp as ProductCartCheckout[];
  }
  //cart
  createOrderProduct(data: OrderProduct) {
    return this.productGateway.createOrderProduct(data);
  }

  // order
  getOrders() {
    return this.productGateway.getOrders();
  }

  getOrderById(id: string) {
    return this.productGateway.getOrderById(id);
  }

  // wishlish
  loadWishlist() {
    return this.productGateway.loadWishlist();
  }

  async saveWishlist(products: Product[] = []) {
    await this.productGateway.saveWishlist(products);
  }
}
