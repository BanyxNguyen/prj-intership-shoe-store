import {Product} from '../models';
import {ProductGateway} from './gateways/productGateways';

export class ProductService {
  private productGateway: ProductGateway;

  constructor(productGateway: ProductGateway) {
    this.productGateway = productGateway;
  }

  async gets(filter: any = {}) {
    const data: any = await this.productGateway.gets();
    return data;
  }

  async loadWishlist() {
    return this.productGateway.loadWishlist();
  }

  async saveWishlist(products: Product[] = []) {
    await this.productGateway.saveWishlist(products);
  }
}
