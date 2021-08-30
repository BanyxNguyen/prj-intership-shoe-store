import {createSlice, Dispatch} from '@reduxjs/toolkit';
import {AppThunk} from '../store';
import {CustomerInfoCart, ModelFilterProduct, Product} from '../../models';
import {RootState} from './index';
import {productService} from '../../services';
import _ from 'lodash';

export interface ProductReduxType extends Product {
  Amount: number;
  IsSelected?: boolean;
}

interface InitStateType {
  wishlist: Product[];
  cart: ProductReduxType[];
  products: Product[];
  customerInfoCart: CustomerInfoCart;
}

const initialState: InitStateType = {
  wishlist: [],
  cart: [],
  products: [],
  customerInfoCart: {},
};

const Products = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action) {
      return action.payload;
    },
  },
});

export const {setProduct} = Products.actions;

// Cart
export const addItemCart =
  (data: Product): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    let {product} = getState();
    const index = _.findIndex(product.cart, i => i.Id == data.Id);
    let temp = [];
    if (index < 0) {
      temp = _.concat(product.cart, {Amount: 1, ...data});
    } else {
      temp = product.cart.map(item => {
        if (item.Id == data.Id) return {...item, amount: item.Amount + 1};
        return item;
      });
    }
    dispatch(setProduct({...product, cart: temp}));
  };

export const changeSizeProductFromCart =
  (data: Product): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const temp = product.cart.map(item => {
      const t = {...item};
      if (item.Id == data.Id && item.SelectedSize != data.SelectedSize) {
        t.SelectedSize = data.SelectedSize;
      }
      return t;
    });
    dispatch(setProduct({...product, cart: temp}));
  };

export const changeAmountItemCart =
  (productId: string, amountChange: number): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const {cart} = product;
    const index = _.findIndex(cart, i => i.Id == productId);
    if (index > -1 && cart[index].Amount + amountChange > 0) {
      let temp = cart.map(item => {
        const amount = item.Amount + amountChange;
        if (item.Id == productId) {
          return {...item, amount};
        }
        return item;
      });
      dispatch(setProduct({...product, cart: temp}));
    }
  };

export const triggerSelectedItemCart =
  (productId: string): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const {cart} = product;
    const index = _.findIndex(cart, i => i.Id == productId);
    if (index > -1) {
      let temp = cart.map(item => {
        if (item.Id == productId) {
          return {...item, isSelected: !item.IsSelected};
        }
        return item;
      });
      dispatch(setProduct({...product, cart: temp}));
    }
  };

export const selectedAllItemCart =
  (status: boolean): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const {cart} = product;
    let temp = cart.map(item => {
      return {...item, isSelected: status};
    });
    dispatch(setProduct({...product, cart: temp}));
  };

export const removeItemCart =
  (data: Product): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const cart = [...product.cart];
    const index = _.findIndex(cart, data);
    if (index > -1) {
      _.remove(cart, i => i.Id == data.Id);
      dispatch(setProduct({...product, cart}));
    }
  };

export const clearCart = (): AppThunk => async (dispatch: Dispatch, getState) => {
  const {product} = getState();
  if (!_.isEmpty(product.cart)) dispatch(setProduct({...product, cart: []}));
};

// products
export const fetchProducts =
  (filter: ModelFilterProduct): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    try {
      const {product} = getState();
      const products = await productService.getProducts(filter);
      if (!_.isEmpty(products)) dispatch(setProduct({...product, products}));
    } catch (error) {
      console.log(error);
    }
  };

// Wishlist
export const loadWishlist = (): AppThunk => async (dispatch: Dispatch, getState) => {
  const {product} = getState();
  const wishlist = await productService.loadWishlist();
  dispatch(setProduct({...product, wishlist}));
};

export const updateWishlish = (): AppThunk => async (dispatch: Dispatch, getState) => {
  const {product} = getState();
  const temp: Product[] = [];
  for (let i = 0; i < product.wishlist.length; i++) {
    const elm = product.wishlist[i];
    const index = _.findIndex(product.products, j => j.Id == elm.Id);
    temp.push({...product.products[index]});
  }
  productService.saveWishlist(temp);
  dispatch(setProduct({...product, wishlist: temp}));
};

export const triggerProductToWishlist =
  (data: Product): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    let temp: Product[] = [];
    if (_.findIndex(product.wishlist, data) < 0) {
      temp = _.concat(product.wishlist, data);
    } else {
      temp = product.wishlist.map(i => i);
      _.remove(temp, i => i.Id == data.Id);
      console.log(temp);
    }
    productService.saveWishlist(temp);
    dispatch(setProduct({...product, wishlist: temp}));
  };

export const changeSizeProductFromWishlish =
  (data: Product): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {product} = getState();
    const temp = product.wishlist.map(item => {
      const t = {...item};
      if (item.Id == data.Id && item.SelectedSize != data.SelectedSize) {
        t.SelectedSize = data.SelectedSize;
      }
      return t;
    });
    productService.saveWishlist(temp);
    dispatch(setProduct({...product, wishlist: temp}));
  };

export const productSelectors = {
  select: (state: RootState): InitStateType => state.product,
};

export default Products.reducer;
