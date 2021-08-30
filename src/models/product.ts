export interface Product {
  Id: string;
  Ten: string;
  MoTa: string;
  HinhAnh: string;
  Mau: string;
  IdLoaiSP: string;
  LoaiSP: string;
  IdThuongHieu: string;
  ThuongHieu: string;
  KichThuocs: number[];
  Gia?: number;
  SelectedSize?: number;
}

export interface ProductTrend {
  name: string;
  image: string;
  type: string;
}

export interface OptionItemMenuType {
  key: string;
  value: string;
}

export interface OptionTypeMenu extends OptionItemMenuType {
  isOnly?: boolean;
}
export interface OptionMenu {
  [key: string]: OptionItemMenuType[];
}

//Model Price Product
export interface ExternalProduct {
  Id: string;
  Size: number;
  // AmountStock: number;
}

export interface ExternalProductCart extends ExternalProduct{
  Amount: number;
  Price: number;
}


//Model filter
export enum ELogic {
  And,
  Or,
}

export interface PropFilterSingle<TModel> {
  Logic?: ELogic;
  IsExactly?: boolean;
  FieldName: keyof TModel;
  Value: string | string[];
}

export interface PropFilterScope<TModel> {
  Logic: ELogic;
  Scopes: PropFilter<TModel>[];
}

type PropFilter<TModel> = PropFilterSingle<TModel> | PropFilterScope<TModel>;

export interface ModelFilter<TModel> {
  Page: number;
  Amount: number;
  PropFilters: PropFilter<TModel>[];
}
export type PropFilterProduct = PropFilter<Product>;
export type ModelFilterProduct = ModelFilter<Product>;
