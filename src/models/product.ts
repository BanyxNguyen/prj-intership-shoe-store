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

export interface ProductCartCheckout extends Product {
  StockAmount?: number;
  RealPrice?: number;
  Amount: number;
  IsSelected?: boolean;
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
}

export interface ExternalProductCart extends ExternalProduct {
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

// check out
export interface CartCheckout {
  Id: string;
  Amount: number;
  Price: number;
  Size: number;
}

/**
 * @Prepay credit card
 * @PostPaid ship
 */
export enum EPaymentType {
  Prepay,
  PostPaid,
}

export interface InfoOrder {
  TenNguoiNhan: string;
  DiaChiNguoiNhan: string;
  SoDienThoai: string;
}

export interface OrderProduct extends InfoOrder {
  PaymentType: EPaymentType;
  NgayLap: Date | string;
  CartList: CartCheckout[];
}
