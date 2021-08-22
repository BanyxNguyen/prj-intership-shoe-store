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

export interface OptionType {
  name: string;
  value: string;
}

export interface ProductOptions {
  sort?: OptionType[];
  gender?: OptionType[];
  types?: OptionType[];
  colors?: OptionType[];
  sizes?: OptionType[];
  brand?: OptionType[];
  category?: OptionType[];
}
//Model filter
export enum ELogic {
    And, Or
}
export interface PropFilter {
    Logic: ELogic | null;
    IsExactly: boolean | null;
    FieldName: string;
    Value: string;
    Scopes: PropFilter[];
}

export interface ModelFilter{
    Page: number;
    Amount: number;
    PropFilters: PropFilter[];
}