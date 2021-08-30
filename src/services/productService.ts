import {ELogic, ExternalProduct, ModelFilterProduct, Product} from '../models';
import {ProductGateway} from './gateways/productGateways';

export class ProductService {
  private productGateway: ProductGateway;

  constructor(productGateway: ProductGateway) {
    this.productGateway = productGateway;
  }

  getProducts(filter: ModelFilterProduct) {
    return this.productGateway.getProducts(filter);
  }

  getExternalProductInfo(params: ExternalProduct[]) {
    return this.productGateway.getExternalProductInfo(params)
  }

  loadWishlist() {
    return this.productGateway.loadWishlist();
  }

  async saveWishlist(products: Product[] = []) {
    await this.productGateway.saveWishlist(products);
  }
}
