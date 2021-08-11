export interface Product {
  name: string;
  price: number;
  brand: string;
  description: string;
  type: string[];
  size: string[];
  color: string[];
  images: string[];
}

export interface ProductTrend {
  name: string;
  image: string;
  type: string;
}

export interface ProductOptions {
  /**
   * 0 is female, 1 is male
   */
  gender?: 0 | 1;
  types?: string[];
  colors?: string[];
  sizes?: string[];
}
