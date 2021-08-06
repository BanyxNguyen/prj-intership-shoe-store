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
