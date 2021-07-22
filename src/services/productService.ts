import {ProductGateway} from '../gateways/productGateways';

export class ProductService {
  private productGateway: ProductGateway;

  constructor(productGateway: ProductGateway) {
    this.productGateway = productGateway;
  }

  async gets(filter: any = {}) {
    const data: any = await this.productGateway.gets();
    return data;
  }
}
