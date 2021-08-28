export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  description: string;
  types: string[];
  sizes: string[];
  colors: string[];
  images: string[];
  selectedSize?: string;
}

export interface ProductTrend {
  name: string;
  image: string;
  type: string;
}

export interface OptionType {
  key: string;
  value: string;
}

export interface FilterOptions {
  sort?: OptionType[];
  gender?: OptionType[];
  types?: OptionType[];
  colors?: OptionType[];
  sizes?: OptionType[];
  brands?: OptionType[];
  categories?: OptionType[];
}

export type FilterOptionsKey = keyof FilterOptions;

//Model filter
export enum ELogic {
  And,
  Or,
}
export interface PropFilter {
  Logic: ELogic | null;
  IsExactly: boolean | null;
  FieldName: string;
  Value: string;
  Scopes: PropFilter[];
}

export interface ModelFilter {
  Page: number;
  Amount: number;
  PropFilters: PropFilter[];
}
